from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
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


ar = pd.read_csv("train.csv")


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


def get_abuse_report(text):
    df = cv.transform([text])
    df = clf.predict(df)
    return df[0]


@app.route("/detect/<text>", methods=["GET"])
def get_result(text):

    df = get_abuse_report(text=text)

    return jsonify(df)


if __name__ == "__main__":
    app.run(debug=True)
