# myFoodStock
Inventory app for food items

## Overview
It's main features are:
- secure authentication
- ability to keep track of every food item: quantity, storage type(fridge/freezer/shelf), expiry date
- ability to decide which items should be a constant requirement
- signaling when a required item has less quantity than required (based on the editable requirement list)

## Project structure

### API
#### `/accessToken.js`
Serializes and deserializes the web token used for authentication.

#### `/authMiddleware.js`
Manages the access token.

#### `/database.js`
Manages the MySQL database.

#### `/server.js`
Contains endpoints.

### WEB
#### `/SignUp.js`
Sign Up component, manages and renders the sign up button and page.

#### `/Login.js`
Login component, manages and renders the login button and page.

#### `/userServerService.js`
Creates request to server for signup and login.

#### `/Navigation.js`
Navigation component, manages the navigation within the app and the logout button.

#### `/session.js`
Manages cookies.

#### `/InventoryApp.js`
Main page, manages and renders the food inventory

#### `/Card.js`
Renders each food item in one Card component.

#### `/FormApp.js`
Renders and manages the form for adding food items to inventory

#### `/RequirementsApp.js`
Manages and renders the requirements list.

#### `/RequirementsServerService.js`
Performs CRUD http requests for requirement items 

#### `/inventoryService.js`
Performs CRUD http requests for inventory items



