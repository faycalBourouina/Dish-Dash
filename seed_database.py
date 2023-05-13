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