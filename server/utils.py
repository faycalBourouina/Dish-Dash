def sqlalchemy_obj_to_dict(obj):
    """Convert a SQLAlchemy object to a dictionary."""
    obj_dict = {}
    for column in obj.__table__.columns:
        obj_dict[column.name] = getattr(obj, column.name)
    return obj_dict


def is_valid_upc(upc):
    """Check if UPC is valid"""
    
    # Example validation logic
    if len(upc) == 12 and upc.isdigit():
        return True
    else:
        return False

def get_groceries_upcs(groceries):
    """Get groceries upcs"""

    # Get groceries items from recipe ingredients
    #groceries = map_ingredients_groceries(recipe_id)
    products = {}

    if groceries:
        for item in groceries:
            for product in item["products"]:
                upc = product["upc"]
                if is_valid_upc(upc):
                    original_name = item["originalName"]
                    if original_name not in products:
                        products[original_name] = []
                    products[original_name].append(upc)
    return products