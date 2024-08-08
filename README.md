# Inventory Management But Ultra Super Inuitive: aka IM BUSI app

SETUP:
- make sure to manually setup the database through the terminal if problems arrise on startup
- be sure to manually load up the test data as well. (knex migrations and seeds)

## API GUIDE:
  ### **`/inventory`**
  - **Method:** GET
  - Usage: 
    - *Route*: `http://localhost:8080/inventory`
    - Returns a list of all inventory items within the database
    - Options: 
      - `/?id=*` returns a entry with the matching item id
      - ex: `http://localhost:8080/inventory/?id=1` returns:
      ```
      [
        {
          "id": 1,
          "userID": 1,
          "name": "Excalibur",
          "description": "Excalibur is the mythical sword of King Arthur that may possess magical powers or be associated with the rightful sovereignty of Britain.",
          "quantity": 4
        }
      ]
      ```
    - `/?userID=1` returns a list of item entries that belong to that userID
    - ex: `http://localhost:8080/inventory/?userID=1` returns:
      ```
      [
        {
          "id": 1,
          "userID": 1,
          "name": "Excalibur",
          "description": "Excalibur is the mythical sword of King Arthur that may possess magical powers or be associated with the rightful sovereignty of Britain.",
          "quantity": 4
        },
        {
          "id": 2,
          "userID": 1,
          "name": "Dragonslayer Spear",
          "description": "Cross spear born from the soul of Ornstein, a Dragonslayer guarding Anor Londo cathedral. Inflicts lightning damage; effective against dragons. Two-handed thrust relies on cross and buries deep within a dragon's hide, and sends human foes flying.",
          "quantity": 2
        },
        {
          "id": 3,
          "userID": 1,
          "name": "Ornstein's Set",
          "description": "Armor of the dragonslayer Ornstein, who guards the cathedral in the forsaken city of Anor Londo. Ornstein is believed to be the captain of the Four Knights. His golden lion helm is imbued with the power of lightning and should provide good protection against it.",
          "quantity": 1
        }
      ]
      ```
  - **Method:** POST
  - Usage: 
    - *Route*: `http://localhost:8080/inventory`
    - Body must use the following format: 
      ```
      {
        "userID": 1,
        "name": "chicken nuggets",
        "description": "Chicken nuggets from mcdonalds",
        "quantity": 4
      }
      ```
  - **Method:** PATCH
  - Usage: 
    - *Route*: `http://localhost:8080/inventory`
    - Body must use the following format: 
      ```
      {
        "userID": 1,
        "name": "chicken nuggets",
        "description": "Chicken nuggets from mcdonalds",
        "quantity": 4
      }
      ```
  - **Method:** DELETE
  - Usage: 
    - *Route*: `http://localhost:8080/inventory/:id`
    - *id references Item ID*

  ### **`/users`**
  - **Method:** GET
  - Usage:
    - *Route*: `http://localhost:8080/users`
    - returns: a list of all users within the database and their informations
    - Options:
      - `/?username=*` (replace the * with the username) returns an entry that has a matching username;
      - ex: `http://localhost:8080/users/?username=fireball` returns:
        ```
        [
          {
            "id": 1,
            "firstName": "Dan",
            "lastName": "Miller",
            "userName": "fireball",
            "password": "1111"
          }
        ]
        ```
      - `/?id=*` (replace the * with the id) returns an entry that has a matching id;
      ex: `http://localhost:8080/users/?id=1` returns:
        ```
        [
          {
            "id": 1,
            "firstName": "Dan",
            "lastName": "Miller",
            "userName": "fireball",
            "password": "1111"
          }
        ]
        ```
  - **Method:** PATCH
  - Usage: 
    - *Route*: `http://localhost/users/:id`
    - Body must use the following format: 
      ```
      [
        {
          "firstName": "Dan",
          "lastName": "Miller",
          "userName": "fireball",
          "password": "1111"
        }
      ]
      ```
  - **Method:** DELETE
  - Usage:
    - *Route*: `http://localhost/users/:id`
  
  ### **`/login`**
  - **Method:** POST
  - Usage:
    - requires a body to be sent containing a username and password in the following format: 
      ```
      {
        "username": "fireball",
        "password": 1111
      }
      ```
  ### **`/register`**
  - **Method:** POST
  - Usage:
    - requires a body using the following format:
      ```
      { 
        firstname: John, 
        lastname: Doe, 
        username: user1234, 
        password: 1234
      }
      ```

## Description/Features: 
  This application is an inventory management application that allows users to track their internal inventory at a basic level.
  A user account is not necessary to use the application; However, you can only view the Master inventory list
  ### User Autentication
  - *Route*: `http://localhost/login`
  - All user information (username, password, firstname, lastname) are stored within the database
  - All user Passwords are salted and hashed with appropriate decryption capabilities when logging in
  - Login button is located in the elipses(...) dropdown button on the top bar
  - Logout Button only appears when logged in and replaces with login button's location
  - duplicate user's cannot be created. (*ie no two accounts can have identical username's*)
  - when logging in if your password is incorrect you will not be redirected or logged in to the site.
  - Register button will redirect user to the create account page

  ### Creating an Account
  - *Route*: `http://localhost/CreateAccount`
  - user can input information and create a new user account
  - After successful creation the user will be redirected to the login page
  
  ### Inventory Master List
  - *Route*: `http://localhost/inventory`
  - The Inventory master list can be reached at the Master Inventory button on the top bar.
  - Clicking on any item in the master list will take you to the more detailed view for that item.
  - If you are logged in and you click on an item in the master list that you own then you will be redirected to a page that shows you the details and allows you to edit that item.
  - If you are logged in and you click on an item in the master list that you do not own then you will be taken to the same un-editable page that non-user's see.
  
  ### User's Inventory 
  - *Route*: `http://localhost/user-details`
  - The user Inventory can be reached at the username's inventory button on the same bar, but will only appear if you are logged in
  - User's inventory will show the user a list of items that they own
    - clicking on any item within this list will redirect you to the item details page
  - If you wish to add a specific item to your inventory, you need to click on the blue + button at the bottom of the page
    - Doing so will bring up a ui filling out the details of this new item once you click the checkmark at the bottom the item will be added to you inventory
  
  ### Item Details
  - *Route*: `http://localhost/item-details`
  - If you wish to edit a specific item, click on the green button at the top to enable edits; 
    - no edits will be saved unless you click the submit button
  - If you wish to delete a specific item, click the red trash button.
  
## Current Issues: 
- running the docker-compose doesn't create the database for some reason. 
  - solution: I manually created the database after running the docker compose to continue to work on CRUD functionality
- Database password and username currently visible in the docker-compose.yaml
  - solution: need to import variables from the .env, however implementation has not been achieved
- User feedback for incorrect entries only partially complete. The ui doesn't tell the user why they can't login when they have an incorrect password