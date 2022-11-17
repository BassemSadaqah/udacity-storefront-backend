# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `GET /products`
- Show (args: product id) `GET /products/:id`
- Create (args: Product) `POST /products` [token required]

#### Users
- Index `GET /users` [token required]
- Show (args: id) `GET /users:id` [token required]
- Create (args: User) `POST /users` [token required]
- Login (args: email,password) `POST /login`

#### Orders
- Current Order by user (args: user id) `GET /users/:id/orders` [token required]

## Data Shapes
#### Product
-  id `SERIAL PRIMARY KEY`
- name `VARCHAR(250) NOT NULL`
- price `FLOAT NOT NULL`

#### User
- id `SERIAL PRIMARY KEY`
- firstName `VARCHAR(50) NOT NULL`
- lastName `VARCHAR(50)`
- email `VARCHAR(50) UNIQUE NOT NULL`
- password `VARCHAR(255) NOT NULL`

#### Orders
- id `SERIAL PRIMARY KEY`
- user_id `INTEGER REFERENCES users(id)`
- status (active or complete) `VARCHAR(50)`


#### Order_Products
- id `SERIAL PRIMARY KEY`
- order_id `INTEGER REFERENCES orders(id)`
- product_id `INTEGER REFERENCES products(id)`
- quantity `INTEGER DEFAULT 1 NOT NULL`
