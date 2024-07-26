from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from settings import PORT_PY


app = Flask(__name__)
CORS(app)

app.config.from_pyfile("settings.py")
# Load Movie dataset
df = pd.read_csv("imdb.csv")
index = range(0, len(df))
df["index"] = index
df.set_index("index")

# Select columns for similar movies
selected_features = ["Genre", "Series_Title", "Overview", "Director", "Star1"]


# replacing the null valuess with null string

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


@app.route("/recommendations/<movie_name>", methods=["GET"])
def get_recommendations(movie_name):

    df = recommend_movies(movie_name=movie_name)

    return jsonify(df)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=PORT_PY, debug=True)
