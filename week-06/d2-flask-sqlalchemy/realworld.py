# Complete Flask app: from hardcoded to database-connected
# app.py
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ismail:ismail@localhost/join_exercise_2_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Product model — maps to 'products' table in PostgreSQL
class Product(db.Model):
    __tablename__ = 'products_from_orm'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    def to_dict(self):
        return {"id": self.id, "name": self.name, "price": self.price}
    
# Create tables if they don't exist
with app.app_context():
    db.create_all()
    
# Route: seed sample data (replaces hardcoded list)
@app.route('/seed')
def seed():
    with app.app_context():
        if Product.query.count() == 0:
            sample_products = [
                Product(name="Laptop", price=999.99),
                Product(name="Mouse", price=29.99),
                Product(name="Keyboard", price=49.99),
            ]
            db.session.add_all(sample_products)
            db.session.commit()
            
            return jsonify({"message": "Seeded 3 products"})
        
        return jsonify({"message": "Products already exist"})
    
# Route: fetch all products from PostgreSQL
@app.route('/products')
def get_products():
    products = Product.query.all()
    
    return jsonify([p.to_dict() for p in products])

if __name__ == '__main__':
    app.run(debug=True)