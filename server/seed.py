import json
import os
from random import choice

import model
import server
import crud


os.system("dropdb dish-dash")
os.system('createdb dish-dash')


def seed_test_db():
    """Create a test database with mock data"""

    model.connect_to_db(server.app)
    model.db.create_all()

    with open('data/mock_db.json') as file:
        mock_db_data = json.loads(file.read())

    users_in_db = []
    favorites_in_db = []
    recipes_in_db = []
    ingredients_in_db = []
    recipes_ingredients_in_db = []


    for user in mock_db_data['users']:
        email = user['email']
        password = user['password']
        tags = user['tags']
        new_user = crud.create_user(email, password, tags)
        users_in_db.append(new_user)

    model.db.session.add_all(users_in_db)
    model.db.session.commit()


    for x in range(10):
        # Select a random user form the list of users in the db
        user = choice(users_in_db)

        # Select a random recipe from the mock data
        rand_recipe = choice(mock_db_data['recipes'])

        # Get rand_recipe's details from the API
        recipe_details = rand_recipe = crud.get_recipe(rand_recipe['id'])

        # Get recipe, ingredients, and recipes_ingredients objects
        results =  crud.add_favorite_to_recipes(recipe_details)
        #results =  crud.add_favorite_to_recipes(rand_recipe)

        recipe = results['recipe']
        ingredients = results['ingredients']
        recipes_ingredients = results['recipes_ingredients']

        # Add recipe, ingredients, and recipes_ingredients to db
        model.db.session.add(recipe)
        model.db.session.add_all(ingredients)
        model.db.session.add_all(recipes_ingredients)


        # Add liked recipe to user's favorites
        new_favorite = crud.add_favorite(user, recipe)
        if new_favorite:
            favorites_in_db.append(new_favorite)
    


    model.db.session.add_all(favorites_in_db)
    model.db.session.commit()

    
    recipe_ingredients = model.RecipeIngredient.query.all()


if __name__ == '__main__':

    seed_test_db()

    # Check if the database already exists before creating it
    #result = os.system("psql -lqt | cut -d \| -f 1 | grep -w dish-dash")
    #if result == 0:
        #print("Database 'dish-dash' already exists. Skipping database creation.")
    #else:
        #seed_test_db()