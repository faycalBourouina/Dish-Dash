from model import db, User, Recipe, Favorite, Ingredient, RecipeIngredient, connect_to_db
from utils import (sqlalchemy_obj_to_dict, get_tag_combinations_of_2, remove_duplicate_recipes)



from datetime import datetime
import requests
import random
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

def get_food_jokes():
    """Return food jokes"""
    response = requests.get('https://api.spoonacular.com/food/jokes/random', params={'apiKey': SPOONACULAR_API_KEY})
    return response.json()

def create_user(email, password):
    """Create a new user"""

    # Check if user already exists
    existing_user = User.query.filter(User.email == email).first()
    if existing_user:
        return None
    else:
        user = User(email=email, password=password, created_at=datetime.now())

        return user 

def add_tags_to_user(user_id, tags):
    """Add tags to user"""

    user = User.query.filter(User.id == user_id).first()
    user.tags = tags

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


def add_favorite_attribute(recipes, user_id):
    """Add the isFavorite attribute to each recipe """

    # Query to fetch user favorites
    user_favorites = Favorite.query.filter(Favorite.user_id == user_id).all()

    # Get the recipe IDs from the user favorites
    favorite_ids = [favorite.recipe_id for favorite in user_favorites]
    

    for recipe in recipes:
        recipe['isFavorite'] = recipe['id'] in favorite_ids
        print("is Favorite add to recipe: ", recipe['isFavorite'])
    return recipes


def get_trending_recipes(limit):
    """Return trending recipes"""

    # The maximum number of trending recipes to return
    trending_limit = limit if limit else 3
    trending_recipes = []

    recipes_obj = Recipe.query.order_by(Recipe.kisses.desc()).limit(trending_limit).all()
    for recipe_obj in recipes_obj:
        trending_recipe = get_recipe(recipe_obj.id)
        trending_recipes.append(trending_recipe)

    return trending_recipes


def get_similar_recipes(recipe_id, num = 1):
    """Return similar recipes"""

    similar_recipes = []
    
    # Limit number of recipes to
    params = { 
        'apiKey': SPOONACULAR_API_KEY,
        'number': num
        }
    
    # Get similar recipes from the api
    similar_recipes_data = requests.get(f'{uri_recipes}/{recipe_id}/similar', params=params).json()
    
    # Get id of similar recipes
    recipe_ids = [recipe['id'] for recipe in similar_recipes_data]

    # Get the recipe information for each recipe in bulk
    params = {
        'apiKey': SPOONACULAR_API_KEY,
        'ids': ','.join([str(recipe_id) for recipe_id in recipe_ids])
    }


    # Get the recipe information for each recipe id in bulk
    recipe = requests.get(f'{uri_recipes}/informationBulk', params=params).json()
    similar_recipes.extend(recipe)

    return similar_recipes

def get_custom_recipes(user_id, limit):
    """Return custom recipes for user if logged in """
    
    # The maximum number of custom recipes to return
    custom_limit = limit if limit else 3
    custom_recipes = []

    # Get user's favorite recipes
    if user_id:
        recipes = get_favorites(user_id)
        # Get id of the most recent recipes
        recent_recipes_id = [recipe.id for recipe in recipes[:custom_limit]]        
        # Get simolair recipes to the most recent recipes from the api
        for recipe_id in recent_recipes_id:
            similar_recipes = get_similar_recipes(recipe_id)
            custom_recipes.extend(similar_recipes)
    
    return custom_recipes

def get_tagged_recipes(user_id, limit):
    """Return tagged recipes for user if logged in """

    tagged_recipes = []
    tags = User.query.filter(User.id == user_id).first().tags or []

    # If user has more than 2 tags
    if len(tags) > 2:
        # Get two random tags
        tags_combinations = get_tag_combinations_of_2(tags)

        while len(tagged_recipes) < limit:
            # limit is the total number of recipes to return so we need to subtract the number of recipes already returned
            recipes_limit = limit - len(tagged_recipes)

            # Get random recipes for each tag combination
            for tags_combination in tags_combinations:
                
                params = { 
                    'apiKey': SPOONACULAR_API_KEY,
                    'number': recipes_limit,
                    'tags': tags_combination
                }
                # Get random recipes from the api
                recipes = requests.get(f'{uri_recipes}/random', params=params).json()['recipes']
                tagged_recipes.extend(recipes)

                # Break if we reached the limit recipes
                if len(tagged_recipes) >= limit:
                    break
            
    # If user has less than 2 tags
    else:
        params = {
            'apiKey': SPOONACULAR_API_KEY,
            'number': limit,
            'tags': tags
        }

        # Get random recipes from the api
        tagged_recipes = requests.get(f'{uri_recipes}/random', params=params).json()['recipes']

    return tagged_recipes


def get_random_recipes(user_id, limit):
    """Return random recipes"""

    # The maximum number of random recipes to return
    random_limit = limit if limit else 3

    random_recipes = []

    # Get user's tags if logged in
    if user_id:
        tagged_recipes = get_tagged_recipes(user_id, random_limit)
        random_recipes.extend(tagged_recipes)
    else:
        # Limit number of recipes to
        params = { 
            'apiKey': SPOONACULAR_API_KEY,
            'number': random_limit
        }

        # Get random recipes from the api
        random_recipes = requests.get(f'{uri_recipes}/random', params=params).json()['recipes']

    return random_recipes


def get_landing_recipes(user_id):
    """Return trending and custom recipes"""

    # Fetch response data from mock data in If in test mode, and filter recipes with summary
    if MODE == 'TEST_MODE':
        mock_response = mock_data['landing_recipes']['response']
        response = [recipe for recipe in mock_response if 'summary' in recipe]
    else:
        trending_limit = 8
        custom_limit = 8
        random_limit = 8
        
        landing_recipes = []
        trending_recipes = get_trending_recipes(trending_limit)
        custom_recipes = get_custom_recipes(user_id, custom_limit)
        random_recipes = get_random_recipes(user_id, random_limit)

        landing_recipes.extend(trending_recipes)
        landing_recipes.extend(custom_recipes)
        landing_recipes.extend(random_recipes)

        # Remove duplicates based on recipe ID
        landing_recipes = remove_duplicate_recipes(landing_recipes)

        # Add isFavorite attribute to recipes
        landing_recipes = add_favorite_attribute(landing_recipes, user_id)

        response = landing_recipes
    
    return response

def auto_complete_search(query):
    """Autocomplete search"""

    # Ignore auto search in test mode
    if MODE == 'TEST_MODE':
        response = []

    else:
        params = {
            'apiKey': SPOONACULAR_API_KEY,
            'number': 5,
            'query': query
        }

        # Get autocomplete search from the api
        autocomplete_search = requests.get(f'{uri_recipes}/autocomplete', params=params).json()
        response = autocomplete_search

    return response 

 
def search_recipes(search, user_id):
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
        request = f'{uri_recipes}/complexSearch?&query={query}&diet={diet}&cuisine={cuisine}&number=12&apiKey={SPOONACULAR_API_KEY}'
         
        response = requests.get(request).json()

        # Add isFavorite attribute to recipes if user is logged in
        if user_id:
            response = add_favorite_attribute(response['results'], user_id)
            print("response in search_recipes", response)
        
        recipes = []

        # Get full recipe information for each recipe
        for recipe in response:
            print("recipe in search_recipes", recipe)
            recipe = get_recipe(recipe['id'])
            recipes.append(recipe)

        response = recipes

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
                'summary': recipe.get('summary', None),
                'instructions': recipe['instructions'],
                'ingredients': recipe['ingredients'],
                'servings': recipe.get('servings', None),
                'readyInMinutes': recipe.get('readyInMinutes', None),
                'dairyFree': recipe.get('dairyFree', False),
                'glutenFree': recipe.get('glutenFree', False),
                'vegan': recipe.get('vegan', False),
                'vegetarian': recipe.get('vegetarian', False)
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
                'ingredients': recipe_ingredients,
                'summary': response.get('summary', None),
                'servings': response.get('servings', None),
                'readyInMinutes': response.get('readyInMinutes', None),
                'dairyFree': response.get('dairyFree', False),
                'glutenFree': response.get('glutenFree', False),
                'vegan': response.get('vegan', False),
                'vegetarian': response.get('vegetarian', False)
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
    # groceries = map_ingredients_groceries(recipe_id)

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
    recipe_title = recipe['title']
    recipe_image = recipe['image']
    recipe_instructions = recipe['instructions']
    recipe_ingredients_list = recipe['ingredients']
    #recicipe_summary = recipe['summary']
    #recipe_servings = recipe['servings']
    #recipe_ready_in_minutes = recipe['readyInMinutes']
    #recipe_dairyFree = recipe['dairyFree']
    #recipe_glutenFree = recipe['glutenFree']
    #recipe_vegan = recipe['vegan']
    #recipe_vegetarian = recipe['vegetarian']


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
        #recipe = Recipe(id=recipe_id, title=recipe_title, image=recipe_image, instructions=recipe_instructions, ingredients=recipe_ingredients_list, summary=recicipe_summary, servings=recipe_servings, readyInMinutes=recipe_ready_in_minutes, dairyFree=recipe_dairyFree, glutenFree = recipe_glutenFree, vegan=recipe_vegan, vegetarian=recipe_vegetarian)
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