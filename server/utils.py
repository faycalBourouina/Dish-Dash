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
