from flask import jsonify, request
from app import app, db
from models import Product, User
import bcrypt
from sqlalchemy.exc import IntegrityError

@app.route('/')
def home():
    return jsonify({
        'message': 'this is home',
        'success' : True
    }), 200

# GET all products
@app.route('/products', methods=['GET'])
def get_products():
    # TODO: Query all products, return as JSON list
    try:
        products = Product.query.all()
        return jsonify({
            'message': 'get all products success',
            'status': True,
            'data': 
                [product.to_dict() for product in products]
        }), 200
            
    except Exception as e:
        return jsonify({
            'message': 'failed get all products',
            'status': False,
            'error': str(e)  # Display the actual error message
        }), 404
    

# POST — create a product
@app.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    
    try:
        product = Product(
            name=data.get('name'),
            sku=data.get('sku'),
            price=data.get('price')
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            'message': 'product created',
            'status': True,
            'data' : product.to_dict()
        }), 201
        
    except IntegrityError as error:
        db.session.rollback()
        
        return jsonify({
            'message': "Product SKU already exists",
            'status': False,
            'error': "Duplicate SKU - each product must have a unique SKU"
        }), 409  # 409 Conflict status code
        
    except Exception as error:
        db.session.rollback()
        
        return jsonify({
            'message': "Failed to create product",
            'status': False,
            'error': str(error)
        }), 400    

# GET one product by ID
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try :
        product = Product.query.get(product_id)
        if product :
            return jsonify({
                'message': 'success get product',
                'status': True,
                'data' : product.to_dict()
            }), 200
        else :
            return jsonify({
                'message': "Product not found",
                'status': False,
            }), 404 
    except Exception as error :
        return jsonify({
            'message': "Failed to create product",
            'status': False,
            'error': str(error)
        }), 500    
    
# PUT — update a product
@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    
    try:
        product = Product.query.get(product_id)
        
        if not product :
            return jsonify({
                'message': "Product not found",
                'status': False,
            }), 404 
            
        # return jsonify(data)
            
        if 'name' in data :
            product.name = data['name']
        if 'sku' in data :
            product.sku = data['sku']
        if 'price' in data :
            product.price = data['price']
        
        db.session.commit()
        
        return jsonify({
                'message': 'success get product',
                'status': True,
                'data' : product.to_dict()
            }), 200
        
    except Exception as error :
        return jsonify({
            'message': "Failed to create product",
            'status': False,
            'error': str(error)
        }), 500  

# DELETE — remove a product
@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        product = Product.query.get(product_id)
        
        if not product : 
            return jsonify({
                    'message': "Product not found",
                    'status': False,
                }), 404 
        
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({
                'message': 'success delete product',
                'status': True,
            }), 200
    except Exception as error:
        return jsonify({
            'message': "Failed to delete product",
            'status': False,
            'error': str(error)
        }), 500  
    

# POST /users/register
@app.route('/users/register', methods=['POST'])
def register_user():
    data = request.get_json()
    
    # Validate required fields: username, email, password_hash
    if 'username' not in data:
        return jsonify({
                'message': "username is required",
                'status': False,
            }), 400 
    if 'email' not in data:
        return jsonify({
                'message': "email is required",
                'status': False,
            }), 400 
        
    if 'password' not in data:
        return jsonify({
                'message': "password is required",
                'status': False,
            }), 400 
    
    # Create User, add to session, commit
    try:
        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password_hash = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            'message': 'user created',
            'status': True,
            'data' : new_user.to_dict()
        }), 201
        
    except IntegrityError as error:
        db.session.rollback()
        
        return jsonify({
            'message': "username already exists",
            'status': False,
            'error': "this username is already registered"
        }), 409 
        
    except Exception as error:
        db.session.rollback()
        
        return jsonify({
            'message': "failed to create user",
            'status': False,
            'error': str(error)
        }), 400   

# GET /users/<id>
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    
    # TODO: Fetch user by ID, return 404 if not found
    try :
        user = User.query.get(user_id)
        if user :
            return jsonify({
                'message': 'success get user data',
                'status': True,
                'data' : user.to_dict()
            }), 200
        else :
            return jsonify({
                'message': "user data not found",
                'status': False,
            }), 404 
    except Exception as error :
        return jsonify({
            'message': "failed to get user data",
            'status': False,
            'error': str(error)
        }), 500 
    