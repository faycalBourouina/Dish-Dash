from model import db, User, Recipe, Favorite, Ingredient, RecipeIngredient, connect_to_db
from utils import sqlalchemy_obj_to_dict

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

# URI for API requests
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

    # Check if user already exists
    existing_user = User.query.filter(User.email == email).first()
    if existing_user:
        return None
    else:
        user = User(email=email, password=password, created_at=datetime.now())
        return user 


def authenticate(email, password):
    """Login user"""
    
    # Check if user exists and password is correct
    user = User.query.filter(User.email == email).first()
    if user and user.password == password:
        return user
    else:
        return None
    
def get_user_by_id(user_id):
    """Return user by id"""

    user = User.query.filter(User.id == user_id).first()
    if user:
        return user
    else:
        return None


def get_trending_recipes():
    """Return trending recipes"""

    trending_recipes = []
    recipes_obj = Recipe.query.order_by(Recipe.kisses.desc()).limit(3).all()
    for recipe_obj in recipes_obj:
        recipe_dict = sqlalchemy_obj_to_dict(recipe_obj)
        trending_recipes.append(recipe_dict)

    return trending_recipes

def get_custom_recipes(user_id):
    """Return custom recipes for user if logged in """

    custom_recipes = []
    
    return custom_recipes

def get_random_recipes():
    """Return random recipes"""
    random_recipes = []

    # Limit number of recipes to
    params = { 
        'apiKey': SPOONACULAR_API_KEY,
        'number': 3
    }

    # Get random recipes from the api
    random_recipes = requests.get(f'{uri_recipes}/random', params=params).json()['recipes']

    return random_recipes

def get_landing_page_recipes(user_id):
    """Return trending and custom recipes"""
    
    landing_recipes = []
    trending_recipes = get_trending_recipes()
    custom_recipes = get_custom_recipes(user_id)
    random_recipes = get_random_recipes()

    landing_recipes.extend(trending_recipes)
    landing_recipes.extend(custom_recipes)
    landing_recipes.extend(random_recipes)

    return landing_recipes
 
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

        # Make API request
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
            recipe_id = recipe_id
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

        # Use mock data in test mode
        if MODE == 'TEST_MODE':
            # Use mock data in test mode
            response = mock_data['ingredients_groceries']['response']
            return response
        
        # Use real data in production mode
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
    


def get_walmart_items(recipe_id, ingredients):
    """Get Walmart items from recipe groceries"""

    # Get mapped ingredient to groceries items from spoonacular api
    #groceries = map_ingredients_groceries(recipe_id)

    # Or use the ingredients names passed from the front end
    groceries = json.loads(ingredients)

    products = []

    if groceries:

        # Use mock data in test mode
        if MODE == 'TEST_MODE':
            # Use mock data in test mode
            response = mock_data['walmart_items']['response']

            # Loop through the response and extract needed information
            for item_name, item_data in response.items():
                product_info = {}

                product_info["name"] = item_name
                product_info["price"] = item_data["offers"]["primary"]["price"]
                product_info["shipping"] = item_data["fulfillment"].get("shipping", False)
                product_info.update(item_data["product"])

                products.append(product_info)
        
        # Use real data in production mode
        else:
            # Set up the request parameters
            params = {
                'api_key': BLUECART_API_KEY,
                'type': 'search',
                'sort_by': 'best_match',
                'category_id': '976759',
                #'delivery_type': 'available_in_store'
            }

            for item in groceries:

                product_info = {}

                product_info["name"] = item["name"]

                # Update the search term in the params to orginalName if we are using the ingredients from spoonacular api
                #params['search_term'] = item["originalName"]

                # Update the search term in the params to name if we are using ingredients from the front end
                params['search_term'] = item["original_name"]

                # Make the HTTP GET request to BlueCart API
                results = requests.get('https://api.bluecartapi.com/request', params=params).json()

                if "search_results" in results and results["search_results"]:
                    # Add the first search result to the walmart_items dictionary
                    item_info = results["search_results"][0]

                    product_info["shipping"] = item_info["fulfillment"].get("shipping", False)
                    product_info["price"] = item_info["offers"]["primary"]["price"]
                    product_info.update(item_info["product"])

                products.append(product_info)
        
        return products
    
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
    recipe_title = recipe['name']
    recipe_image = recipe['image']
    recipe_instructions = recipe['instructions']
    recipe_ingredients_list = recipe['ingredients']

    recipe = {}
    recipe_ingredients = []
    recipes_ingredients = []


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


def add_favorite(user, recipe):
    """Add recipe to user's favorites"""

    existing_favorite = Favorite.query.filter(Favorite.user_id == user.id, Favorite.recipe_id == recipe.id).first()
    if existing_favorite:
        return None
    else:
        favorite = Favorite(user=user, recipe=recipe)
        return favorite
    # Use real data in production mode to be implemented

def remove_favorite(user_id, recipe_id):
    """Remove recipe from user's favorites"""

    existing_favorite = Favorite.query.filter(Favorite.user_id == user_id, Favorite.recipe_id == recipe_id).first()
    if existing_favorite:
        return existing_favorite
    else:
        return None

def get_favorites(user_id):
    """Return user's favorites"""
    
    # Query to fetch user favorites
    user_favorites = Favorite.query.filter(Favorite.user_id == user_id).all()

    # Get the recipe IDs from the user favorites
    recipe_ids = [favorite.recipe_id for favorite in user_favorites]

    # Fetch the recipes from the recipes table based on the recipe IDs
    favorites = Recipe.query.filter(Recipe.id.in_(recipe_ids)).all()
                    
    return favorites


if __name__ == "__main__":
    from server import app