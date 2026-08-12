from sqlalchemy import text
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# TODO 1: Set SQLALCHEMY_DATABASE_URI to connect to your local PostgreSQL 'store_db'
# Format: postgresql://username:password@host/database_name
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ismail:ismail@localhost/join_exercise_2_db'

# TODO 2: Set SQLALCHEMY_TRACK_MODIFICATIONS to False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'Flase'

# TODO 3: Initialize SQLAlchemy with the app
db = SQLAlchemy(app)

with app.app_context() :
    try : 
        db.session.execute(text('SELECT 1'))
        print("Database connection successfully")
    except Exception as e :
        print(f"Database connection failed {e}")
    finally :
        db.session.close()

@app.route('/')
def index():
    return jsonify({"message": "Flask is connected to PostgreSQL!", "status": "ok"})

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