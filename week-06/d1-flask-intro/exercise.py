from flask import Flask, jsonify

app = Flask(__name__)

# TODO: Define your hardcoded product list here
# Each product: {"id": ..., "name": "...", "price": ...}
products = [
    {"id": 1, "name": "sepatu", "price" : 30000},
    {"id": 2, "name": "sandal", "price" : 10000},
    {"id": 3, "name": "laptop", "price" : 3000000}
]

# TODO: Route 1 — GET /products
# Returns: jsonify of the full products list, status 200
@app.route("/products")
def get_all_products():
    if len(products) == 0 :
        return jsonify({
            "success": False , 
            "message" : "products are empty"
            }), 404
    return jsonify({
            "success" : True,
            "message" : "all products found",
            "data" : products
        }), 200

# TODO: Route 2 — GET /products/<int:id>
# Returns: matching product as JSON (200) or error message (404)
@app.route("/products/<int:id>")
def get_product_by_id(id):
    for product in products :
        if product["id"] == id :
            return jsonify({
                "success" : True,
                "message" : "Product found",
                "data" : product
            }), 200
            
    return jsonify({
        "success" : False,
        "message" : "Product not found"
    }), 404

if __name__ == '__main__':
    app.run(debug=True)