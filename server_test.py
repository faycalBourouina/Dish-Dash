import unittest
import json
import logging
from flask import session

from server import app
import model 
from seed_database import seed_test_db

class ServerTests(unittest.TestCase):
    """Tests for server.py"""

    def setUp(self):
        """Set up test client before each test"""

        self.client = app.test_client()
        app.config['TESTING'] = True

    # Test landing page
    def test_landing_page_status_code(self):
        """Test landing page status code"""

        result = self.client.get("/")
        self.assertEqual(result.status_code, 200)

    def test_landing_page_response_format(self):
        """Test landing page response format"""

        result = self.client.get("/")
        self.assertEqual(result.headers['Content-Type'], 'application/json')

    def test_landing_page_recipes_attribute(self):
        """Test presence and format of 'recipes' attribute"""

        result = self.client.get("/")
        response_data = json.loads(result.data)
        self.assertIn('recipes', response_data)

    def test_landing_page_non_empty_recipes_array(self):
        """Test 'recipes' attribute is a non-empty array"""

        result = self.client.get("/")
        response_data = json.loads(result.data)
        recipes_value = response_data['recipes']
        self.assertIsInstance(recipes_value, list, "'recipes' attribute is not an array")
        self.assertTrue(len(recipes_value) > 0, "'recipes' attribute is an empty array")

    # Test search
    def test_search_status_code(self):
        """Test search status code"""

        result = self.client.get("/search")
        self.assertEqual(result.status_code, 200)

    def test_search_response_format(self):
        """Test search response format"""

        result = self.client.get("/search")
        self.assertEqual(result.headers['Content-Type'], 'application/json')

    def test_search_recipe_attribute(self):
        """Test presence of 'results' attribute"""

        result = self.client.get("/search")
        response_data = json.loads(result.data)
        self.assertIn('results', response_data)

    def test_search_non_empty_recipe_array(self):
        """Test 'results' attribute is a non-empty array"""

        result = self.client.get("/search")
        response_data = json.loads(result.data)
        recipes_value = response_data['results']
        self.assertIsInstance(recipes_value, list, "'results' attribute is not an array")
        self.assertTrue(len(recipes_value) > 0, "'results' attribute is an empty array")


    # Test recipe by id
    def test_recipe_by_id_status_code(self):
        """Test recipe by id status code"""

        result = self.client.get("/recipes/644885")
        self.assertEqual(result.status_code, 200) 


    def test_recipe_by_id_response_format(self):
        """Test recipe by id response format"""

        result = self.client.get("/recipes/644885")
        self.assertEqual(result.headers['Content-Type'], 'application/json')


    def test_recipe_by_id_response_id_attribute(self):
        """Test presence and value of 'id' attribute"""
            
        result = self.client.get("/recipes/644885")
        response_data = json.loads(result.data)
        self.assertIn('id', response_data)
        self.assertEqual(response_data['id'], 644885)


    # Test recipe ingredients
    def test_recipe_ingredients_status_code(self):
        """Test recipe ingredients by id status code"""

        result = self.client.get("/recipes/644885/ingredients")
        self.assertEqual(result.status_code, 200)

    def test_recipe_ingredients_response_format(self):
        """Test recipe ingredients by id response format"""

        result = self.client.get("/recipes/644885/ingredients")
        self.assertEqual(result.headers['Content-Type'], 'application/json')

    def test_recipe_ingredients_ingredients_attribute(self):
        """Test presence of 'ingredients' attribute"""

        result = self.client.get("/recipes/644885/ingredients")
        response_data = json.loads(result.data)
        self.assertIn('ingredients', response_data)

    def test_recipe_ingredients_non_empty_ingredients_array(self):
        """Test 'ingredients' attribute is a non-empty array"""

        result = self.client.get("/recipes/644885/ingredients")
        response_data = json.loads(result.data)
        ingredients_value = response_data['ingredients']
        self.assertIsInstance(ingredients_value, list, "'ingredients' attribute is not an array")
        self.assertTrue(len(ingredients_value) > 0, "'ingredients' attribute is an empty array")



class DBTests(unittest.TestCase):
    """Tests for database"""

    def setUp(self):
        """Set up test client before each test"""

        # Get the Flask test client
        self.client = app.test_client()
        app.config['TESTING'] = True

        # Disable DB logs to reduce logs during testing (uncomment to see logs)
        logging.disable(logging.CRITICAL)

        # Call seed_test_db to create the test database and populate it with mock data
        seed_test_db()


    def tearDown(self):

        # Drop all tables and remove session at the end of each test        
        model.db.drop_all()
        model.db.session.remove()


    # Test sign up
    def test_signup_status_code_new_user(self):
        """Test sign up status code for new user"""
        
        result = self.client.post("/signup", data={"email": "user11@example.com", "password": "password11"})
        self.assertEqual(result.status_code, 201)

            
    def test_signup_response_id_attribute_new_user(self):
        """Test presence and value of 'id' attribute"""
        result = self.client.post("/signup", data={"email": "user11@example.com", "password": "password11"})

        response_data = json.loads(result.data)
        self.assertIn('id', response_data)
        self.assertEqual(response_data['id'], 11, "'id' attribute should be 11")


    def test_signup_status_code_existing_user(self):
        """Test sign up status code for existing user"""

        result = self.client.post("/signup", data={"email": "user10@example.com", "password": "password10"})
        self.assertEqual(result.status_code, 409)

    
    
    # Test authentication
    def test_authentication_status_code_success(self):
        """Test authentication status code if successful"""

        result = self.client.post("/authenticate", data={"email": "user1@example.com", "password": "password1"})
        self.assertEqual(result.status_code, 200)
    
    def test_authentication_status_code_fail(self):
        """Test authentication status code if unsuccessful"""

        result = self.client.post("/authenticate", data={"email": "user1@example.com", "password": "password"})
        self.assertEqual(result.status_code, 401, "'Incorect password should fail'")

        result = self.client.post("/authenticate", data={"email": "user@example.com", "password": "password1"})
        self.assertEqual(result.status_code, 401, "'Incorect email should fail'")

    def test_authentication_response_format(self):
        """Test authentication response format"""

        result = self.client.post("/authenticate", data={"email": "user1@example.com", "password": "password1"})

        self.assertEqual(result.headers['Content-Type'], 'application/json')

    def test_authentication_response_id_attribute_sucess(self):
        """Test presence and value of 'id' attribute"""

        result = self.client.post("/authenticate", data={"email": "user1@example.com", "password": "password1"})

        response_data = json.loads(result.data)
        self.assertIn('id', response_data)
        self.assertEqual(response_data['id'], 1, "'id' attribute should be 1")

    
    # Test user favorites recipes

    def test_favorites_status_code_success(self):
        """Test favorites status code if successful"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}

        result = self.client.get("/users/1/favorites")
        self.assertEqual(result.status_code, 200)

    def test_favorites_status_code_fail(self):
        """Test favorites status code if unsuccessful if user is not logged in"""

        result = self.client.get("/users/1/favorites")
        self.assertEqual(result.status_code, 401)

    def test_favorites_response_attribute_format_value(self):
        """Test favorites response format and value"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}

        result = self.client.get("/users/1/favorites")

        # Convert the JSON response to a dictionary
        response_data = json.loads(result.data)

        # Assert that the 'favorites' keyword is present in the response
        self.assertIn('favorites', response_data)

        # Assert that the 'favorites' value is a list
        self.assertIsInstance(response_data['favorites'], list)


    # Test add favorites recipes

    def test_add_favorite_status_code_success(self):
        """Test add favorite status code if successful"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}
        
        result = self.client.patch("/users/1/favorites/644885")
        print(f"data: {result.data} status code: {result.status_code}")
        self.assertEqual(result.status_code, 201)
    
    def test_add_favorites_status_code_fail(self):
        """Test add favorite status code if unsuccessful if user is not logged in"""

        result = self.client.patch("/users/1/favorites/644885")
        self.assertEqual(result.status_code, 401)


    def test_add_favorite_to_favorites_attribute_value(self):
        """Test add favorite recipe value infavorites list"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}
        
        # Add recipe to favorites
        self.client.patch("/users/1/favorites/644885")

        # testing if the recipe was added to the favorites
        result = self.client.get("/users/1/favorites")
        
        # Convert the JSON response to a dictionary
        response_data = json.loads(result.data)

        # Assert recipe_id attribute is in the favorites list
        self.assertTrue(any(favorite['recipe_id'] == 644885 for favorite in response_data['favorites']), "Recipe id 644885 should be in the favorites list")

    # Test remove favorites recipes

    def test_remove_favorite_status_code_success(self):
        """Test remove favorite status code if successful"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}
        
        # Add recipe to favorites if not already in favorites
        self.client.patch("/users/1/favorites/644885")

        # Remove a recipe from favorites
        result = self.client.delete("/users/1/favorites/644885")
        self.assertEqual(result.status_code, 204)

    def test_remove_favorite_status_code_fail(self):
        """Test remove favorite status code if unsuccessful if user is not logged in"""

        result = self.client.delete("/users/1/favorites/644885")
        self.assertEqual(result.status_code, 401)


    def test_remove_favorite_from_favorites_attribute_value(self):
        """Test removed favorite recipe value in favorites list"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}


        # Add recipe to favorites if not already in favorites
        self.client.patch("/users/1/favorites/644885")

        # Remove a recipe from favorites
        self.client.delete("/users/1/favorites/644885")

        # testing if the recipe was removed from the favorites
        result = self.client.get("/users/1/favorites")

        # Convert the JSON response to a dictionary
        response_data = json.loads(result.data)

        # Assert recipe_id attribute is not in the favorites list
        self.assertFalse(any(favorite['recipe_id'] == 644885 for favorite in response_data['favorites']), "Recipe id 644885 should not be in the favorites list")

if __name__ == "__main__":
    unittest.main()