# CookBook - Recipe Web Application

> **CookBook** is a web application that allows users to discover, save, and manage cooking recipes for their everyday cooking needs.

## Description

CookBook is designed to help everyone—from beginners to cooking enthusiasts—find recipe inspiration based on dish names, categories, or available ingredients. Users can also create their own recipe collection, manage personal recipes, and access them anytime through a clean, intuitive, and user-friendly interface.

---

## Features

* **Browse & Search Recipes**
  *Explore thousands of recipes and quickly find dishes by name, category, or main ingredients using a fast and efficient search feature.*

* **Save Favorite Recipes**
  *Save your favorite recipes to a personal collection for quick and easy access anytime.*

* **Create & Manage Recipes**
  *Create your own recipes, edit recipe details, and remove recipes you no longer need through a simple management dashboard.*

---

## Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* React Router
* Axios
* TanStack Query

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Alembic

### Database

* PostgreSQL

### Authentication

* JWT Authentication
* OAuth2 Password Flow

### Infrastructure

* Docker
* Docker Compose
* Nginx

### Development Tools

* Git
* GitHub
* Visual Studio Code
* Postman

---

## API Contract

**Base URL**

```text
http://localhost:5173/api/v1
```

| Method | Endpoint                  | Description                                        |
| :----: | ------------------------- | -------------------------------------------------- |
|   GET  | `/recipes`                | Retrieve all recipes                               |
|   GET  | `/recipes/{id}`           | Retrieve recipe details                            |
|   GET  | `/recipes?search=chicken` | Search recipes                                     |
|  POST  | `/recipes`                | Create a new recipe                                |
|   PUT  | `/recipes/{id}`           | Update a recipe                                    |
| DELETE | `/recipes/{id}`           | Delete a recipe                                    |
|   GET  | `/categories`             | Retrieve all recipe categories                     |
|   GET  | `/favorites`              | Retrieve the authenticated user's favorite recipes |
|  POST  | `/favorites/{recipe_id}`  | Add a recipe to favorites                          |
| DELETE | `/favorites/{recipe_id}`  | Remove a recipe from favorites                     |

---

## Project Structure

```text
cookbook/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── alembic/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/username/cookbook.git
```

### Navigate to the Project Directory

```bash
cd cookbook
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

### Open the Application

Open your browser and navigate to:

```text
http://localhost:5173
```

---

## Usage

1. Open the application in your web browser.
2. Search for recipes by name, category, or ingredient.
3. View recipe details, including ingredients and cooking instructions.
4. Sign in to save recipes to your favorites.
5. Create, edit, or delete recipes from your dashboard if you have the required permissions.

---

## Reference Requirements

* [**UI Design Inspiration**](https://dribbble.com/tags/recipe-app)

* [**Public API Reference**](https://dummyjson.com/docs/recipes)

* [**REST API Documentation**](https://swagger.io/specification/)
