import unittest
import json
from server import app

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

    def test_landing_page_recipe_attribute(self):
        """Test presence and format of 'recipes' attribute"""

        result = self.client.get("/")
        response_data = json.loads(result.data)
        self.assertIn('recipes', response_data)

    def test_landing_page_non_empty_recipe_array(self):
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
        """Test presence and format of 'results' attribute"""

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


    

if __name__ == "__main__":
    unittest.main()
