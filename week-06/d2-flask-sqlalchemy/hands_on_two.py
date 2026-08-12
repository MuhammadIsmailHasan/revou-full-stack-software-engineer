import psycopg2

conn = psycopg2.connect('postgresql://ismail:ismail@localhost/join_exercise_2_db')
cursor = conn.cursor()

cursor.execute(
    "INSERT INTO products_from_orm (name, price ) VALUES (%s, %s)",
    ("Monitor", 200000)
)
conn.commit()

cursor.execute(
    "SELECT id, name, price FROM products_from_orm"
)
rows = cursor.fetchall()
for row in rows :
    print(row)
    
cursor.close()
conn.close()
    
    
"""sumary_line
    using ORM SQLAlchemy
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ismail:ismail@localhost/join_exercise_2_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Products(db.Model) :
    __tablename__ = 'products_from_orm'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    
with app.app_context():
    product = Products(name="Macbook", price=500000.00)
    db.session.add(product)
    db.session.commit()
    
    products = Products.query.all()
    for prod in products:
        print(prod.name, prod.price)