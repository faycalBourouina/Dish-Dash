import unittest
import json
from server import app

class ServerTests(unittest.TestCase):
    """Tests for server.py"""

    def setUp(self):
        """Set up test client before each test"""

        self.client = app.test_client()
        app.config['TESTING'] = True
    
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

    def test_authentication_response_attribute_sucess(self):
        """Test presence and value of 'id' attribute"""

        result = self.client.post("/authenticate", data={"email": "user1@example.com", "password": "password1"})

        response_data = json.loads(result.data)
        self.assertIn('id', response_data)
        self.assertEqual(response_data['id'], 1, "'id' attribute should be 1")


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

        
if __name__ == "__main__":
    unittest.main()
