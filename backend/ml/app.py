from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from settings import PORT
import numpy as np

import re
import nltk
from nltk.util import pr

stemmer = nltk.SnowballStemmer("english")
from nltk.corpus import stopwords
import string

stopword = set(stopwords.words("english"))
import nltk



app = Flask(__name__)
CORS(app)

app.config.from_pyfile("settings.py")
# Load Movie dataset
df = pd.read_csv("imdb.csv")
ar = pd.read_csv("train.csv")
index = range(0, len(df))
df["index"] = index
df.set_index("index")

# Select columns for similar movies
selected_features = ["Genre", "Series_Title", "Overview", "Director", "Star1"]

ar["labels"] = ar["class"].map(
    {0: "hate speech", 1: "Offensive lang", 2: "no hate and offense"}
)
# replacing the null valuess with null string

ar = ar[["tweet", "labels"]]


def clean(text):
    text = str(text).lower()
    text = re.sub(r"\[.*?\]", "", text)
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub(r"<.*?>+", "", text)
    text = re.sub(r"[%s]" % re.escape(string.punctuation), "", text)
    text = re.sub(r"\n", "", text)
    text = re.sub(r"\w*\d\w*", "", text)
    text = [word for word in text.split() if word not in stopword]
    text = " ".join(text)
    return text


ar["tweet"] = ar["tweet"].apply(clean)

x = np.array(ar["tweet"])
y = np.array(ar["labels"])
ar["labels"] = ar["labels"].fillna(0)
ar["labels"] = ar["labels"]

for feature in selected_features:
    df[feature] = df[feature].fillna("")

# combining all the 5 selected features

combined_features = (
    df["Genre"]
    + " "
    + df["Director"]
    + " "
    + df["Star1"]
    + " "
    + df["Overview"]
    + " "
    + df["Series_Title"]
)

# converting the text data to feature vectors

vectorizer = TfidfVectorizer()

feature_vectors = vectorizer.fit_transform(combined_features)

# Cosine Similarity

similarity = cosine_similarity(feature_vectors)
# Initialize CountVectorizer and transform the text data
cv = CountVectorizer()
x = cv.fit_transform(x)

# Split the data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.33, random_state=42
)

# Initialize and fit the classifier
clf = DecisionTreeClassifier()
clf.fit(x_train, y_train)


def recommend_movies(movie_name):
    # Function to return similar movie to entered movie.
    # list of all titles
    list_of_all_titles = df["Series_Title"].tolist()
    # Find close match
    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)
    if len(find_close_match) == 0:
        return []

    close_match = find_close_match[0]

    index_of_the_movie = df[df.Series_Title == close_match]["index"].values[0]

    similarity_score = list(enumerate(similarity[index_of_the_movie]))

    # Similar movie using cosine similarity
    sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)

    i = 0
    title_from_index = []
    # Adding titles of similar movies in list
    for movie in sorted_similar_movies:
        idx = movie[0]
        if i < 5:
            title_from_index.append(
                [
                    df[df.index == idx]["Series_Title"].values[0],
                    df[df.index == idx]["Poster_Link"].values[0],
                ]
            )

            i += 1

    return title_from_index


def get_abuse_report(text):
    df = cv.transform([text])
    df = clf.predict(df)
    return df[0]


@app.route("/recommendations/<movie_name>", methods=["GET"])
def get_recommendations(movie_name):

    df = recommend_movies(movie_name=movie_name)

    return jsonify(df)


@app.route("/detect/<text>", methods=["GET"])
def get_result(text):
    
    df = get_abuse_report(text=text)
    
    return jsonify(df)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=PORT, debug=True)
