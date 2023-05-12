import json

import model
import server
import crud

from datetime import datetime


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
    user = crud.create_user(email, password)
    users_in_db.append(user)


for recipe in mock_db_data['recipes']:
    id = recipe['id']
    title = recipe['title']
    recipe = crud.create_recipe(id, title)
    recipes_in_db.append(recipe)


for favorite in mock_db_data['favorites']:
    user_id = favorite['user_id']
    recipe_id = favorite['recipe_id']
    favorite = crud.create_favorite(user_id, recipe_id)
    favorites_in_db.append(favorite)