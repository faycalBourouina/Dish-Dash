import json
import os
from random import choice

import model
import server
import crud

os.system("dropdb dish-dash")
os.system('createdb dish-dash')

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


for range in range(10):
    # Select a random user form the list of users in the db
    user = choice(users_in_db)
    # Select a random recipe from the mock data
    recipe = choice(mock_db_data['recipes'])
    
    # Add recipe to the db
    liked_recipe = crud.add_recipe(recipe)
    recipes_in_db.append(liked_recipe)

    # Add liked recipe to user's favorites
    new_favorite = crud.add_favorite(user, liked_recipe)
    if new_favorite:
        favorites_in_db.append(new_favorite)

print("users_in_db", users_in_db)
print("recipes_in_db", recipes_in_db)
print("favorites_in_db", favorites_in_db)

model.db.session.add_all(recipes_in_db)
model.db.session.commit()

model.db.session.add_all(favorites_in_db)
model.db.session.commit()