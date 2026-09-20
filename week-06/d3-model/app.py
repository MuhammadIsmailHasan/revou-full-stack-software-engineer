from sqlalchemy import text
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# TODO 1: Set SQLALCHEMY_DATABASE_URI to connect to your local PostgreSQL 'flask_orm'
# Format: postgresql://username:password@host/database_name
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ismail:ismail@localhost/flask_orm'

# TODO 2: Set SQLALCHEMY_TRACK_MODIFICATIONS to False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# TODO 3: Initialize SQLAlchemy with the app
db = SQLAlchemy(app)

# Define the Product model here instead of importing
from models import Product, User
import routes

with app.app_context():
    try : 
        db.create_all()
        print("Database connection successfully")
    except Exception as e :
        print(f"Database connection failed {e}")

@app.route('/health')
def check_connection_db():
    try:
        db.session.execute(text('SELECT 1'))
        return jsonify({
            "success" : True,
            "message" : "Database connection succesfully"
        })
    except Exception as e:
        return jsonify({
            "success" : False,
            "message" : f"Database connection failed {e}",
        })

if __name__ == '__main__':
    app.run(debug=True)