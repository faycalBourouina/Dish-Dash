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


    for user in mock_db_data['users']:
        email = user['email']
        password = user['password']
        new_user = crud.create_user(email, password)
        users_in_db.append(new_user)

    model.db.session.add_all(users_in_db)
    model.db.session.commit()


    for x in range(10):
        # Select a random user form the list of users in the db
        user = choice(users_in_db)
        # Select a random recipe from the mock data
        recipe = choice(mock_db_data['recipes'])
        
        # Add recipe to the db
        liked_recipe = crud.add_favorite_to_recipes(recipe)
        recipes_in_db.append(liked_recipe)

        # Add liked recipe to user's favorites
        new_favorite = crud.add_favorite(user, liked_recipe)
        if new_favorite:
            favorites_in_db.append(new_favorite)

    model.db.session.add_all(recipes_in_db)
    model.db.session.commit()

    model.db.session.add_all(favorites_in_db)
    model.db.session.commit()

    print("Session added to db")


if __name__ == '__main__':

    seed_test_db()
    # Check if the database already exists before creating it
    #result = os.system("psql -lqt | cut -d \| -f 1 | grep -w dish-dash")
    #if result == 0:
        #print("Database 'dish-dash' already exists. Skipping database creation.")
    #else:
        #seed_test_db()