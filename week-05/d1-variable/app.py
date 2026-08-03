from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def get_products():
    products = [
        {"id": 1, "name": "Laptop Pro X", "price": 15_000_000},
        {"id": 2, "name": "Wireless Mouse", "price": 250_000},
    ]
    return jsonify(products)

if __name__ == "__main__":
    app.run(debug=True)