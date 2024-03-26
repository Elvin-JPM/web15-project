## INSTALLATION ##
npm install

## DATABASE DATA ##
node init-db.js 

## APP RUN ##
npm start

## ENDPOINTS ##

**POST /api/authenticate** : user login

**POST /api/signup** : user signup

**DELETE /api/:username (PRIVATE)** : delete a user

**PUT /api/:username (PRIVATE)** : update user's info



**GET /api/products** : list app's products

**GET /api/products/list/:owner** : list products of a specific user

**GET /api/products/:owner (PRIVATE)** : list user's logged products

**GET /api/products/:id/:name** : show product's details



**POST /api/products** : create a new product

**DELETE /api/products/:owner/:id** : delete a product

**PUT /api/products/:owner/:id** : modify a product



**PUT /api/products/:id** : add product to user's favorites

**DELETE /api/products/:id** : delete product from user's favorites

**GET /api/:owner/favs** : list user's favorite products

**PUT /api/products/check-reserved/:id (PRIVATE)** : check product as reserved

**PUT /api/products/uncheck-reserved/:id (PRIVATE)** : uncheck product as reserved
