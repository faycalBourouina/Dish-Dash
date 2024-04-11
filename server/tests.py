import unittest
import json
import logging
from flask import session

from server import app
import model 
from seed import seed_test_db

class ServerTests(unittest.TestCase):
    """Tests for server.py"""

    @classmethod
    def setUpClass(cls):
        """Set up test client and database before any tests run"""
        super(ServerTests, cls).setUpClass()
        
        # Drop all tables before setting up
        model.db.drop_all()
        
        # Create all tables
        model.db.create_all()

        # Call seed_test_db to create the test database and populate it with mock data
        seed_test_db()

        # Get the Flask test client
        cls.client = app.test_client()
        app.config['TESTING'] = True

        # Disable DB logs to reduce logs during testing (uncomment to see logs)
        logging.disable(logging.CRITICAL)

    @classmethod
    def tearDownClass(cls):
        """Tear down test client and database after all tests run"""
        super(ServerTests, cls).tearDownClass()
        
        # Drop all tables after tests are done
        model.db.drop_all()

        # Enable logging again (comment out to keep logs disabled)
        logging.disable(logging.NOTSET)

    def setUp(self):
        """Set up test client before each test"""
        
        # Get the Flask test client
        self.client = app.test_client()
        app.config['TESTING'] = True
        
    # Test landing page
    def test_landing_page_status_code(self):
        """Test landing page status code"""

        result = self.client.get("/landing")
        self.assertEqual(result.status_code, 200)

    def test_landing_page_response_format(self):
        """Test landing page response format"""

        result = self.client.get("/landing")
        self.assertEqual(result.headers['Content-Type'], 'application/json')

    def test_landing_page_recipes_attribute(self):
        """Test presence and format of 'recipes' attribute"""

        result = self.client.get("/landing")
        response_data = json.loads(result.data)
        self.assertIn('recipes', response_data)

    def test_landing_page_non_empty_recipes_list(self):
        """Test 'recipes' attribute is a non-empty list"""

        result = self.client.get("/landing")
        response_data = json.loads(result.data)
        
        recipes_value = response_data['recipes']
        self.assertIsInstance(recipes_value, list, "'recipes' attribute is not a list")
        self.assertTrue(len(recipes_value) > 0, "'recipes' attribute is an empty list")

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

        self.assertIn('recipes', response_data)
        #self.assertIn('results', response_data['recipes'])

    def test_search_non_empty_recipe_list(self):
        """Test 'results' attribute is a non-empty list"""

        result = self.client.get("/search")
        response_data = json.loads(result.data)
        
        recipes_value = response_data['recipes']
        self.assertIsInstance(recipes_value, list, "'results' attribute is not a list")
        self.assertTrue(len(recipes_value) > 0, "'results' attribute is an empty list")

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

        self.assertIn('recipe', response_data) # Check if 'recipe' attribute exists
        self.assertIn('id', response_data['recipe']) # Check if 'id' attribute exists
        self.assertEqual(response_data['recipe']['id'], 644885, "Recipe id should be 644885") # Check if 'id' attribute has correct value

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

    def test_recipe_ingredients_non_empty_ingredients_list(self):
        """Test 'ingredients' attribute is a non-empty list"""

        result = self.client.get("/recipes/644885/ingredients")
        response_data = json.loads(result.data)
        ingredients_value = response_data['ingredients']
        self.assertIsInstance(ingredients_value, list, "'ingredients' attribute is not list")
        self.assertTrue(len(ingredients_value) > 0, "'ingredients' attribute is an empty list")

    # Test recipe groceries list from Walmart
    def test_get_walmart_items_status_code_success(self):
        """Test get walmart items status code"""

        result = self.client.get("/recipes/644885/items")
        self.assertEqual(result.status_code, 200)

    def test_get_walmart_items_response_format(self):
        """Test get walmart items response format"""

        result = self.client.get("/recipes/644885/items")
        self.assertEqual(result.headers['Content-Type'], 'application/json')

    def test_get_walmart_items_response_items_attribute(self):
        """Test presence of 'items' attribute"""
            
        result = self.client.get("/recipes/644885/items")
        response_data = json.loads(result.data)
        self.assertIn('items', response_data)
        self.assertIsInstance(response_data['items'], list, "'items' attribute is not a list")
        self.assertIsNotNone(response_data['items'], "'items' attribute is None")

class DBTests(unittest.TestCase):
    """Tests for database"""

    def setUp(self):
        """Set up test client before each test"""

        # Drop all tables before setting up
        model.db.drop_all()

        # Get the Flask test client
        self.client = app.test_client()
        app.config['TESTING'] = True

        # Disable DB logs to reduce logs during testing (uncomment to see logs)
        logging.disable(logging.CRITICAL)

        # Call seed_test_db to create the test database and populate it with mock data
        seed_test_db()

    def tearDown(self):

        # Drop all tables and remove session at the end of each test
        print("tearDown is being called")        
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

        self.assertIn('user', response_data)  # Check if 'user' key is present
        self.assertIn('id', response_data['user'])  # Check if 'id' key is present within 'user'
        self.assertEqual(response_data['user']['id'], 11, "'id' attribute should be 11")

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

        self.assertIn('user', response_data)  # Check if 'user' key is present
        self.assertIn('id', response_data['user'])  # Check if 'id' key is present within 'user'
        self.assertEqual(response_data['user']['id'], 1, "'id' attribute should be 1") # Check if 'id' value is 1
    

    # Test logout
    def test_logout_status_code_success(self):
        """Test logout status code if successful"""

        # Login as a user first (you can modify this based on your login implementation)
        self.client.post("/authenticate", data={"email": "user1@example.com", "password": "password1"})

        # Perform logout
        result = self.client.get("/logout")

        # Assert the response status code is 200
        self.assertEqual(result.status_code, 200)

        # Assert the response contains the expected data
        response_data = json.loads(result.data)
        self.assertIn('message', response_data)
        self.assertEqual(response_data['message'], 'Logged out successfully')
        
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
    def test_add_favorite_status_code_success_new_favorite(self):
        """Test add favorite status code if authentication is successful and recipe is not already in favorites"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}

        # Check if recipe 644885 is already in the user's favorites
        result = self.client.get("/users/1/favorites")
        response_data = json.loads(result.data)

        if 'favorites' in response_data:
            recipe_644885_exists = any(
                favorite.get('id') == 644885 for favorite in response_data['favorites']
            )

            if not recipe_644885_exists:
                # Add recipe 644885 to the user's favorites
                result = self.client.patch("/users/1/favorites/644885")
                

                # Check the response status code
                self.assertEqual(result.status_code, 201)

            else:
                self.skipTest("Recipe already exists in favorites")
        else:
            self.fail("No 'favorites' key in the response data")


    def test_add_favorite_status_code_success_existing_favorite(self):
        """Test add favorite status code if authentication is successful and recipe already exists in favorites"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}

        # Check if recipe 644885 is already in the user's favorites
        result = self.client.get("/users/1/favorites")
        response_data = json.loads(result.data)
        
        # Check if 'favorites' key exists in response_data
        if 'favorites' in response_data:
            recipe_644885_exists = any(
                favorite.get('id') == 644885 for favorite in response_data['favorites']
            )

            if recipe_644885_exists:
                # Add recipe 644885 to the user's favorites
                result = self.client.patch("/users/1/favorites/644885")

                # Check the response status code
                self.assertEqual(result.status_code, 409)

                # Check the response data
                self.assertEqual(result.data, b'Favorite already exists')

            else:
                self.skipTest("Recipe does not exist in favorites")
        else:
            self.fail("No 'favorites' key in the response data")


    def test_add_favorites_status_code_fail(self):
        """Test add favorite status code if unsuccessful if user is not logged in"""

        result = self.client.patch("/users/1/favorites/644885")
        self.assertEqual(result.status_code, 401)

    def test_add_favorite_to_favorites_id_existing(self):
        """Test adding an existing favorite recipe to the favorites list"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}

        # Check if recipe 644885 is already in the use favorites
        result = self.client.get("/users/1/favorites")
        response_data = json.loads(result.data)
        recipe_644885_exists = any(favorite.get('id') == 644885 for favorite in response_data['favorites'])

        if recipe_644885_exists:
            # Recipe already exists in favorites, so try adding it again
            result = self.client.patch("/users/1/favorites/644885")

            # Check the response status code
            self.assertEqual(result.status_code, 409)

            # Check the response data
            response_data = json.loads(result.data)
            self.assertEqual(response_data['message'], 'Favorite already exists')
        else:
            self.skipTest("Recipe 644885 is not an existing favorite")

    def test_add_favorite_to_favorites_id_new(self):
        """Test adding a new favorite recipe to the favorites list"""

        # Set session to simulate authentication for user 1
        with self.client.session_transaction() as session:
            session['user'] = {'id': 1, 'email': 'user1@example.com'}

        # Check if recipe 644885 is already in favorites
        result = self.client.get("/users/1/favorites")
        response_data = json.loads(result.data)
        recipe_644885_exists = any(favorite.get('id') == 644885 for favorite in response_data['favorites'])

        if not recipe_644885_exists:
            # Recipe doesn't exist in favorites, add it as a favorite
            patch_result = self.client.patch("/users/1/favorites/644885")

            # Fetch the favorites list
            result = self.client.get("/users/1/favorites")
            response_data = json.loads(result.data)

            # Assert recipe 644885 is in the favorites list
            self.assertTrue(any(favorite.get('id') == 644885 for favorite in response_data['favorites']), "Recipe id 644885 should be in the user favorites list")
        else:
            self.skipTest("Recipe 644885 is already an existing favorite in user favorite list")

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

            # Assert id attribute is not in the favorites list
            self.assertFalse(any(favorite.get('id') == 644885 for favorite in response_data['favorites']), "Recipe id 644885 should not be in the favorites list")

if __name__ == "__main__":
    unittest.main(verbosity=1)
