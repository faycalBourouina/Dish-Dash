from model import db, User, Recipe, Favorite, Ingredient, RecipeIngredient, connect_to_db
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

def get_user_by_id(user_id):
    """Return user by id"""

    if MODE == 'TEST_MODE':
        user = User.query.filter(User.id == user_id).first()
        if user:
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
       
        # Get the mock API data for the recipes ingredients
        recipes_ingredients = mock_data['recipes_ingredients']['response']

        # Find the recipe data with the matching recipe_id
        recipe = next((recipe for recipe in recipes_ingredients if recipe['recipe_id'] == recipe_id), None)

        if recipe:
            # Extract the ingredient names from the recipe data
            ingredients = [ingredient['name'] for ingredient in recipe['ingredients']]
            return ingredients
        else:
            return {'error': 'Recipe not found'} 

    # Use real data in production mode
    else:
        request = f'{uri_recipes}/{recipe_id}/ingredientWidget.json?apiKey={SPOONACULAR_API_KEY}'
        response = requests.get(request).json()

    return response

def add_favorite_to_recipes(recipe):
    """Add favorite recipe to the recipes table"""
    recipe_id = recipe['id']
    recipe_title = recipe['title']

    recipe_ingredients = []

    if MODE == 'TEST_MODE':

        # If recipe already exists, increment kisses
        existing_recipe = Recipe.query.filter(Recipe.id == recipe_id).first()
        if existing_recipe:
            existing_recipe.kisses += 1
            recipe = existing_recipe
        else:
            # If recipe does not exist, create a recipe object
            recipe = Recipe(id=recipe_id, title=recipe_title)

            # Then get the recipe ingredients to create ingredient objects
            ingredients = get_recipe_ingredients(recipe_id)
                        
            for ingredient in ingredients:
                # Check if the ingredien name, recipe_id combination already exists in the ingredients table
                existing_recipe_ingredient = RecipeIngredient.query.filter(RecipeIngredient.ingredient_name == ingredient, RecipeIngredient.recipe_id == recipe_id).first()
                if existing_recipe_ingredient:
                    break
                # If not, create a new ingredient object to be added to the ingredients table
                else:
                    recipe_ingredient = RecipeIngredient(ingredient_name=ingredient, recipe_id=recipe_id)
                    recipe_ingredients.append(recipe_ingredient)

        # Retun the recipe object and the recipe ingredients objects
        return (recipe, recipe_ingredients)

    # Use real data in production mode to be implemented


def add_favorite(user, recipe):
    """Add recipe to user's favorites"""

    if MODE == 'TEST_MODE':

        existing_favorite = Favorite.query.filter(Favorite.user_id == user.id, Favorite.recipe_id == recipe.id).first()
        if existing_favorite:
            return 
        else:
            favorite = Favorite(user=user, recipe=recipe)
            return favorite
    # Use real data in production mode to be implemented

def remove_favorite(user_id, recipe_id):
    """Remove recipe from user's favorites"""

    if MODE == 'TEST_MODE':

        existing_favorite = Favorite.query.filter(Favorite.user_id == user_id, Favorite.recipe_id == recipe_id).first()
        if existing_favorite:
            return existing_favorite
        else:
            return 
    # Use real data in production mode to be implemented

def get_favorites(user_id):
    """Return user's favorites"""

    if MODE == 'TEST_MODE':
        favorites = Favorite.query.filter(Favorite.user_id == user_id).all()
        return favorites

    # Use real data in production mode to be implemented

if __name__ == "__main__":
    from server import app