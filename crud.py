from model import db, User, Recipe, Favorite, connect_to_db
from datetime import datetime

import requests

from dotenv import load_dotenv
import os
import json

# Load the API key from the .env file
load_dotenv()

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
MODE = os.getenv("MODE")

# The base uri for the spoonacular recipes API
uri_recipes = f'https://api.spoonacular.com/recipes'

# mock API data for testing
with open('data/mock_api.json') as f:
    mock_data = json.load(f)

# mock user data for testing
with open('data/mock_db.json') as f:
    mock_users = json.load(f)



def create_user(email, password):
    """Create a new user"""

    if MODE == 'TEST_MODE':
        
        existing_user = User.query.filter(User.email == email).first()
        if existing_user:
            return None
        else:
            user = User(email=email, password=password, created_at=datetime.now())
            return user 

    # Use real data in production mode to be implemented      


def authenticate(email, password):
    """Login user"""
    
    if  MODE == 'TEST_MODE':
        user = User.query.filter(User.email == email).first()
        if user and user.password == password:
            return user
        else:
            return None
    
    # Use real data in production mode to be implemented

def get_landing_page_recipes():
    """Return trending and custom recipes"""

    # Use mock data in test mode
    if MODE == 'TEST_MODE':
        response = mock_data['landing_page']['response']
    else:
        request = f'{uri_recipes}/random?number=3&tags=vegan, dessert, italian&apiKey={SPOONACULAR_API_KEY}'
        response = requests.get(request).json()

    return response

def search_recipes(search):
    """Search for recipes"""

    # Use mock data in test mode
    if MODE == 'TEST_MODE':
        response = mock_data['search']['response']
    else:

        query = search.get('query', '')
        diet = search.get('diet', '')
        cuisine = search.get('cuisine', '')
        intolerances = search.get('intolerances', '')
        includeIngredients = search.get('includeIngredients', '')
        type = search.get('type', '')
        maReadyTime = search.get('maxReadyTime', '')
        #fillIngredients	= True

        request = f'{uri_recipes}/complexSearch?&query={query}&diet={diet}&cuisine={cuisine}&apiKey={SPOONACULAR_API_KEY}'
        response = requests.get(request).json()

    return response



def get_recipe(recipe_id):
    """Return recipe"""

    # Use mock data in test mode
    if MODE == 'TEST_MODE':
        if mock_data['recipe_by_id']['response']['id'] == int(recipe_id):
            response = mock_data['recipe_by_id']['response']
        else :
            response = "Recipe not found"

    # Use real data in production mode
    else:
        request = f'{uri_recipes}/{recipe_id}/information?includeNutrition=false&apiKey={SPOONACULAR_API_KEY}'
        response = requests.get(request).json()

    return response


def get_recipe_ingredients(recipe_id):
    """Return recipe ingredients"""

    # Use mock data in test mode
    if MODE == 'TEST_MODE':
        response = mock_data['recipe_ingredients']['response']

    # Use real data in production mode
    else:
        request = f'{uri_recipes}/{recipe_id}/ingredientWidget.json?apiKey={SPOONACULAR_API_KEY}'
        response = requests.get(request).json()

    return response

def add_recipe(recipe):
    """Add liked recipe to database"""
    recipe_id = recipe['id']
    recipe_title = recipe['title']

    if MODE == 'TEST_MODE':
        existing_recipe = Recipe.query.filter(Recipe.id == recipe_id).first()
        if existing_recipe:
            recipe = existing_recipe
        else:
            recipe = Recipe(id=recipe_id, title=recipe_title)
        
        return recipe

    # Use real data in production mode to be implemented


def add_favorite(user, recipe):
    """Add recipe to user's favorites"""

    if MODE == 'TEST_MODE':

        existing_favorite = Favorite.query.filter(Favorite.user_id == user.id, Favorite.recipe_id == recipe.id).first()
        if existing_favorite:
            return 
        else:

            # Check if recipe already exists in favorites
            existing_favorite = Favorite.query.filter(Favorite.recipe_id == recipe.id).first()
            
            if existing_favorite:
                kisses = existing_favorite.kisses + 1
                favorite = Favorite(user=user, recipe=recipe, kisses=kisses)

            else:
                favorite = Favorite(user=user, recipe=recipe, kisses=1)
            
        return favorite
    # Use real data in production mode to be implemented

def get_favorites(user_id):
    """Return user's favorites"""

    if MODE == 'TEST_MODE':
        favorites = Favorite.query.filter(Favorite.user_id == user_id).all()
        return favorites

    # Use real data in production mode to be implemented

if __name__ == "__main__":
    from server import app