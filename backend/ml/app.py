from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS
import numpy as np
import json
app = Flask(__name__)
CORS(app)

# Load Movie dataset
column_names = ['user_id', 'item_id', 'rating', 'timestamp']
df = pd.read_csv('u.data', sep='\t', names=column_names)
movie_titles = pd.read_csv("Movie_Id_Titles.txt")

# Merge datasets
df = pd.merge(df,movie_titles,on='item_id')


# Filter movies and ratings for simplicity
ratings = pd.DataFrame(df.groupby('title')['rating'].mean())
ratings['num of ratings'] = pd.DataFrame(df.groupby('title')['rating'].count())

moviemat = df.pivot_table(index='user_id',columns='title',values='rating')

ratings.sort_values('num of ratings',ascending=False)



def recommend_movies(movie):
    # Function to return similar movie to entered movie.
    starwars_user_ratings = moviemat[movie]
    similar_to_starwars = moviemat.corrwith(starwars_user_ratings)
    corr_starwars = pd.DataFrame(similar_to_starwars,columns=['Correlation'])
    corr_starwars.dropna(inplace=True)
    corr_starwars = corr_starwars.join(ratings['num of ratings'])
  
    # return of similar movies
    return corr_starwars[corr_starwars['num of ratings']>100].sort_values('Correlation',ascending=False).head()
   
    
    
@app.route('/recommendations/<movieName>', methods=['GET'])

def get_recommendations(movieName):
    df = recommend_movies(movie=movieName)
    recommend = df.transpose()
    df = recommend.to_dict()
    df = list(df.keys())
    return jsonify(df)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3500, debug=True)
