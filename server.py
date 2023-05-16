"""Server for Dish-Dash app"""
from flask import (Flask, request, session, jsonify)
from flask_cors import CORS

from urllib.parse import parse_qs
import os
from dotenv import load_dotenv
import json

import crud
import model
from utils import  sqlalchemy_obj_to_dict

app = Flask(__name__)

CORS(app)

# Load the API key from the .env file
load_dotenv()

# session secret key
app.secret_key = os.getenv("SESSION_SECRET_KEY")


# Connect to the database
model.connect_to_db(app)

@app.route("/")
def get_landing_page_recipes():
    """Return trending and custom recipes"""

    response = crud.get_landing_page_recipes()

    if response:
        return response, 200
    else:
        return "{Error: 'No recipes found'}", 404


@app.route("/signup", methods=["POST"])
def create_user():
    """Create a new user"""

    password = request.form.get('password')
    email = request.form.get('email')

    new_user = crud.create_user(email, password)

    if new_user:
        model.db.session.add(new_user)
        model.db.session.commit()
        
        # get user object from db and convert to dict
        user_obj = crud.get_user_by_id(new_user.id)
        user_dict = sqlalchemy_obj_to_dict(user_obj)

        user = {'id': user_dict['id'], 'email': user_dict['email']}
        session['user'] = user

        response = jsonify({'user': user})
        
        print("response in create_user: ", response)
        return response, 201
    else:
        return 'User already exists', 409
    
@app.route("/authenticate", methods=["POST"])
def authenticate_user():
    """Authenticate user"""

    password = request.form.get('password')
    email = request.form.get('email')

    user_obj = crud.authenticate(email, password)

    if user_obj:
        
        user_dict = sqlalchemy_obj_to_dict(user_obj)
        user = {'id': user_dict['id'], 'email': user_dict['email']}
        session['user'] = user

        response = jsonify({'user': user})
        
        return response, 200
    else:
        return 'Authentication failed', 401

@app.route("/search")
def search_recipes():
    """Search for recipes"""

    search_dict = request.args.to_dict()
    response = crud.search_recipes(search_dict)

    if response:
        return response, 200
    else:
        return "Error", 404

@app.route("/recipes/<int:recipe_id>")
def get_recipe(recipe_id):
    """Return recipe"""

    response = crud.get_recipe(recipe_id)

    if response:
        return response, 200
    else:   
        return "Error", 404

@app.route("/recipes/<int:recipe_id>/ingredients")
def get_recipe_ingredients(recipe_id):
    """Return recipe ingredients"""
    
    ingredients = crud.get_recipe_ingredients(recipe_id)
    response = jsonify({'ingredients': ingredients})

    if response:
        return response, 200
    else:
        return "Error", 404
    
@app.route("/users/<int:user_id>/favorites")
def get_user_favorites(user_id):
    """Return user favorites"""

    if 'user' in session and session['user']['id'] == user_id:
        
        favorites_list = []

        # get user favorites in sqlalchemy objects
        favorites = crud.get_favorites(user_id)  

        # convert sqlalchemy objects to dictionaries
        for favorite in favorites:
            favorite_dict = sqlalchemy_obj_to_dict(favorite)
            favorites_list.append(favorite_dict)
        
        response = jsonify({'favorites': favorites_list})

        return response, 200
    else:
         return "Authentication required", 401

@app.route("/users/<int:user_id>/favorites/<int:recipe_id>", methods=["PATCH", "DELETE"])
def update_favorite(user_id, recipe_id):
    """Update favorites"""

    if request.method == "PATCH":
        
        if 'user' in session and session['user']['id'] == user_id:

            # get user from database
            user = crud.get_user_by_id(user_id)

            #get recipe from the API
            recipe = crud.get_recipe(recipe_id)
        
            # add favorite recipe to recipes list or update kiss count if already in list 
            results = crud.add_favorite_to_recipes(recipe)
            
            favorite_recipe = results['recipe']
            recipe_ingredients = results['ingredients']
            recipes_ingredients = results['recipes_ingredients']

            model.db.session.add(favorite_recipe)
            model.db.session.add_all(recipe_ingredients)
            model.db.session.add_all(recipes_ingredients)


            new_favortie = crud.add_favorite(user, favorite_recipe)
            model.db.session.add(new_favortie)

            #print("new favorite", new_favortie)


            model.db.session.commit()

            # convert sqlalchemy object to dictionary
            favorite_dict = sqlalchemy_obj_to_dict(new_favortie)

            response = jsonify({'favorite': favorite_dict})

            return response, 201
        
        else:
            return "Authentication required", 401

    elif request.method == "DELETE":

        if 'user' in session and session['user']['id'] == user_id:
            
            # get the favorite to be deleted
            favorite_to_delete = crud.remove_favorite(user_id, recipe_id)

            if favorite_to_delete:
                model.db.session.delete(favorite_to_delete)
                model.db.session.commit()
            
                return f"Recipe with the id {recipe_id} removed from favorites", 204
        
            else:   
                return f"Recipe with the id {recipe_id} not found in favorites", 404
        
        else:
            return "Authentication required", 401


if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True)