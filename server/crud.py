from model import db, User, Recipe, Favorite, Ingredient, RecipeIngredient, connect_to_db
from utils import is_valid_upc
from datetime import datetime

import requests

from dotenv import load_dotenv
import os
import json

# Load the API key from the .env file
load_dotenv()

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
BLUECART_API_KEY = os.getenv("BLUECART_API_KEY")
MODE = os.getenv("MODE")

# The base uri for the spoonacular recipes API
uri_recipes = f'https://api.spoonacular.com/recipes'
uri_walmart_items = 'https://api.bluecartapi.com/request'
# mock API data for testing
with open('data/mock_api.json') as f:
    mock_data = json.load(f)

# mock user data for testing
with open('data/mock_db.json') as f:
    mock_users = json.load(f)



def create_user(email, password):
    """Create a new user"""

    if MODE == 'TEST_MODE':
        
        # Check if user already exists
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

        # Check if user exists and password is correct
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
        recipe = next((recipe for recipe in mock_data['recipe_by_id']['response'] if recipe['id'] == recipe_id), None)
        if recipe:
            return {
                'id': recipe['id'],
                'title': recipe['name'],
                'image': recipe['image'],
                'instructions': recipe['instructions'],
                'ingredients': recipe['ingredients']
            }
        else:
            return None

    # Use real data in production mode
    else:
        # Get the recipe information data from the API
        request = f'{uri_recipes}/{recipe_id}/information?includeNutrition=false&apiKey={SPOONACULAR_API_KEY}'
        response = requests.get(request).json()

        # If recipe exists, extract needed recipe information
        if response:
            recipe_id = response['id']
            recipe_name = response['title']
            recipe_image = response['image']
            recipe_instructions = response['instructions']
            recipe_ingredients = []

            # If recipe has ingredients, extract needed ingredients information
            if 'extendedIngredients' in response:
                ingredients = response['extendedIngredients']

                for ingredient in ingredients:
                    ingredient_id = ingredient['id']
                    ingredient_name = ingredient['name']
                    ingredient_original_name = ingredient['original']
        
                    # Append ingredient details to the recipe_ingredients list
                    recipe_ingredients.append({
                        'id': ingredient_id,
                        'name': ingredient_name,
                        'original_name': ingredient_original_name
                })
            
            return {
                'id': recipe_id,
                'name': recipe_name,
                'image': recipe_image,
                'instructions': recipe_instructions,
                'ingredients': recipe_ingredients
            }
        else:
            return None

def get_recipe_ingredients(recipe_id):
    """Return recipe ingredients"""

    # Gettin recipe ingredients 
    recipe_ingredients = get_recipe(recipe_id)['ingredients']

    # If ingerdients exist, return ingredients
    if len(recipe_ingredients) > 0:
        ingredients = [{'id': ingredient['id'], 'name': ingredient['name']} for ingredient in recipe_ingredients]
        return ingredients
    else:
        return None
    
def map_ingredients_groceries(recipe_id):
    """Map recipe ingredients to groceries"""
    
    # Getting recipe ingredients 
    ingredients = get_recipe_ingredients(recipe_id)

    # If ingredients exist, get groceries items
    if ingredients:

        # Get the ingredient names
        ingredient_names = [ingredient['name'] for ingredient in ingredients]

        if MODE == 'TEST_MODE':
            # Use mock data in test mode
            response = mock_data['ingredients_groceries']['response']
            return response
        
        else:
            # Map ingredients to groceries
            url = f'https://api.spoonacular.com/food/ingredients/map?apiKey={SPOONACULAR_API_KEY}'
            headers = {
                "Content-Type": "application/json"
            }
            data = {
                "ingredients": ingredient_names,
            }
            response = requests.post(url, headers=headers, json=data).json()

            return response
    else:

        return None

def get_groceries_products(recipe_id):
    """Get groceries products"""
    groceries = map_ingredients_groceries(recipe_id)
    products = {}

    if groceries:
        for item in groceries:
            original_name = item["originalName"]
            if original_name not in products:
                products[original_name] = []
            
            for product in item["products"]:
                products[original_name].append(product)
    
    return products

def get_walmart_items(recipe_id):
    """Get walmart items"""

    products = get_groceries_products(recipe_id)
    walmart_items = {}
    
    # If products exist, get walmart items
    if products:

        if MODE == 'TEST_MODE':
            # Use mock data in test mode
            response = mock_data['walmart_items']['response']
            walmart_items = response
            print (walmart_items)

        # Use real data in production mode
        else:
            # Set up the request parameters
            params = {
                'api_key': 'C21E95CA536947B2B52A17C8059293AF',
                'type': 'search',
                'sort_by': 'best_seller',
                'category_id': '976759',
                'delivery_type': 'available_in_store'
            }

            for product in products:

                # Update the search term in the params for each iteration
                params['search_term'] = product

                # Make the HTTP GET request to BlueCart API
                results = requests.get('https://api.bluecartapi.com/request', params=params).json()
                
                # Check if "search_results" exists and is not empty
                if "search_results" in results and results["search_results"]:
                    # Add the first search result to the walmart_items dictionary
                    walmart_items[product] = results["search_results"][0]

        return walmart_items
    else:
        return None

def add_recipe_ingredients(recipe):
    """Add recipe ingredients to the ingredients table and the recipes_ingredients association table"""

    recipe_id = recipe.id
    # Then get the recipe ingredients to create ingredient objects
    ingredients = get_recipe_ingredients(recipe_id)

    # recipe_ingredient (singular recipe) is a list of ingredient objects or the specefic recipe
    recipe_ingredients = []      

    # recipes_ingredients (plural recipes) is a list of recipe_ingredient objects of the recipe_ingredients association table
    recipes_ingredients = []                
          

    if len(ingredients) > 0:

        for ingredient_data in ingredients:

            # check if ingredient already exists in the ingredients table
            existing_ingredient = Ingredient.query.filter(Ingredient.id == ingredient_data['id']).first()

            # If ingredien does not exist
            if not existing_ingredient:

                # Create ingredient object
                ingredient = Ingredient(id=ingredient_data['id'], name=ingredient_data['name'])
                
                # Add ingredient to recipe_ingredients list
                recipe_ingredients.append(ingredient)

                # Add ingredient to recipes_ingredients list
                recipe_ingredient = add_recipes_ingredients(recipe, ingredient)
                recipes_ingredients.append(recipe_ingredient)

               
    return {'recipe_ingredients': recipe_ingredients, 'recipes_ingredients': recipes_ingredients}

def add_recipes_ingredients(recipe, ingredient):
    """Add recipes_ingredients to the recipes_ingredients association table"""

    recipe_id = recipe.id
    # Check if recipe id and ingredient id combination already exists in the recipes_ingredients table
    existing_recipe_ingredient = RecipeIngredient.query.filter(RecipeIngredient.recipe_id == recipe_id, RecipeIngredient.ingredient_id == ingredient.id).first()

    if existing_recipe_ingredient:
        return None
    
    # If not, create a new recipe ingredient object to be added to the recipes_ingredients table
    else:
        # Create recipe_ingredient object
        recipe_ingredient = RecipeIngredient(recipe=recipe, ingredient=ingredient)

        return recipe_ingredient

def add_favorite_to_recipes(recipe):
    """Add favorite recipe to the recipes table"""

    recipe_id = recipe['id']
    recipe_title = recipe['title']
    recipe_image = recipe['image']
    recipe_instructions = recipe['instructions']
    recipe_ingredients_list = recipe['ingredients']

    recipe = {}
    recipe_ingredients = []
    recipes_ingredients = []

    if MODE == 'TEST_MODE':

        # If recipe already exists, increment kisses
        existing_recipe = Recipe.query.filter(Recipe.id == recipe_id).first()
        if existing_recipe:
            existing_recipe.kisses += 1
            recipe = existing_recipe
            
        elif not existing_recipe:
            # If recipe does not exist, create a recipe object
            recipe = Recipe(id=recipe_id, title=recipe_title, image=recipe_image, instructions=recipe_instructions, ingredients=recipe_ingredients_list)

            # getting recipe ingredients and recipes_ingredients
            results = add_recipe_ingredients(recipe)

            recipe_ingredients = results['recipe_ingredients']
            recipes_ingredients = results['recipes_ingredients']

        # Retun the recipe, recipe_ingredients, and recipes_ingredients objects
        return {'recipe': recipe, 'ingredients': recipe_ingredients, 'recipes_ingredients': recipes_ingredients}

    # Use real data in production mode to be implemented

def add_favorite(user, recipe):
    """Add recipe to user's favorites"""

    if MODE == 'TEST_MODE':

        existing_favorite = Favorite.query.filter(Favorite.user_id == user.id, Favorite.recipe_id == recipe.id).first()
        if existing_favorite:
            return None
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
            return None
    # Use real data in production mode to be implemented

def get_favorites(user_id):
    """Return user's favorites"""
    if MODE == 'TEST_MODE':
        # Query to fetch user favorites
        user_favorites = Favorite.query.filter(Favorite.user_id == user_id).all()

        # Get the recipe IDs from the user favorites
        recipe_ids = [favorite.recipe_id for favorite in user_favorites]

        # Fetch the recipes from the recipes table based on the recipe IDs
        favorites = Recipe.query.filter(Recipe.id.in_(recipe_ids)).all()
                    
        return favorites

    # Use real data in production mode to be implemented

if __name__ == "__main__":
    from server import app