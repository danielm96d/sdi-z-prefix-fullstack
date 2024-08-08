require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs')
const app = express();
// **NOTE: process.env.NODE_ENV is keyed to use compose as opposed to development, may need altering for deployment
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
  console.log("test")// this log is used to test live updates within the docker environment
  res.send(`application running using NODE_ENV: ${process.env.NODE_ENV}`);//this line will need editing for deployment
})


//==========================================ITEMS CRUD FUNCITONALITY===================================\\
//==================get a list of a specific user's inventory====================\\
app.get("/inventory*", async (req, res)=>{
  // const {id} = req.params;
  const {id, userID} = req.query
  if((!id && !userID) && Object.keys(req.query).length !== 0){
    return res.status(500).json(`invalid request with query key(s): ${Object.keys(req.query)}`)
  }
  if(id){
    console.log(`query get started with id: ${id}`)
    try {
      const inventory = await knex("items")
      .select('*').where({id: id})
      return res.json(inventory)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  else if(userID){
    try {
      const inventory = await knex("items")
      .select('*').where({userID: userID})
      return res.json(inventory)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  else{
    try {
      const adminInventory = await knex("items")
      .select('*');
      return res.json(adminInventory)
    } catch (error) {
      res.status(500).send('unable to retrieve admin inventory list')
    }
  }
})

//==================Create an ITEM====================\\
app.post("/inventory", async (req, res)=>{
  const {userID, name, description, quantity} = req.body
  // console.log(itemData)
  if(!userID || !name || !description || !quantity)
    res.status(400).send('empty field in post request detected please send an appropriate request')
  try {
    const newItem = await knex("items").insert({userID, name, description, quantity},['id','userID', 'name', 'description', 'quantity'])
    // const newItem = await knex("items").select('*').where({
    //   userID: userID,
    //   name: name,
    //   description: description,
    //   quantity: quantity
    // })
    res.send(newItem)
    // return res.json('item successfuly created')
  } catch (error) {
    console.log(error)
    res.status(500).send(error.json())
  }
})

//==================Delete a ITEM====================\\
app.delete("/inventory/:id", async (req, res)=>{
  const {id} = req.params
  if(!id)
    res.status(400).send('empty id field request detected please send an appropriate request')
  try {
    const deleteItem = await knex("items").where({ id: id }).del()
    if (deleteItem === 0) {
      return res.status(404).json({ error: "item not found" });
    } else {
      return res.status(202).json("item successfully removed");
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.json())
  }
})

//==================Update a Item====================\\
app.patch("/inventory/:id", async (req, res)=>{
  const {id} = req.params
  const {userID, description, name, quantity} = req.body
  if(!userID || !name || !description || !quantity)
    res.status(400).send({ERROR: 'please enter an update for each field'})
  try {
    const updateItem= await knex("items")
      .where({ id: id })
      .update({userID, description, name, quantity})
    if (updateItem === 0) {
      return res.status(404).json({ error: "item not found" });
    } else {
      return res.status(202).json("item Information Updated");
    }
  } catch (error) {
    // console.log(error)
    return res.status(500).json(error)
  }
})


//==========================================USERS CRUD FUNCITONALITY===================================\\
//==================Retrieve a single users' information====================\\
app.get("/users*", async (req, res)=>{
  // const {id} = req.params;
  const {id, username} = req.query
  if((!id && !username) && Object.keys(req.query).length !== 0){
    return res.status(500).json(`invalid request with query key(s): ${Object.keys(req.query)}`)
  }
  if(id){
    try {
      const usersList = await knex("users")
      .select('*').where({id: id});
      // console.log(usersList)
      if(usersList.length === 0) return res.status(500).json(`no user under id: ${id}`)
      return res.json(usersList)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  else if(username){
    try {
      const usersList = await knex("users")
      .select('*').where({username: username});
      // console.log(usersList)
      if(usersList.length === 0) return res.status(500).json(`no user with username: ${username}`)
      return res.json(usersList)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  else{
    try {
      const usersList = await knex("users")
      .select('*');
      return res.json(usersList)
    } catch (error) {
      res.status(500).send('unable to retrieve admin users list')
    }
  }
})

//==================Create a User====================\\
app.post("/users", async (req, res)=>{
  const userData = req.body
  console.log(userData)
  if(!userData)
    res.status(400).send('empty post request detected please send an appropriate request')
  try {
    await knex("users").insert({firstname: userData.firstname, lastname: userData.lastname, username: userData.username, password: userData.password})
    return res.json(userData)
  } catch (error) {
    res.status(500).send('unable to retrieve admin inventory list')
  }
})

//==================Delete a User====================\\
app.delete("/users/:id", async (req, res)=>{
  const {id} = req.params
  if(!id)
    res.status(400).send('empty id field request detected please send an appropriate request')
  try {
    const deleteUser = await knex("users").where({ id: id }).del()
    if (deleteUser === 0) {
      return res.status(404).json({ error: "user not found" });
    } else {
      return res.status(202).json("user successfully removed");
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.json)
  }
})

//==================Update a User====================\\
app.patch("/users/:id", async (req, res)=>{
  const {id} = req.params
  const {firstname, lastname, username, password} = req.body
  if(!id)
    res.status(400).send('empty id field request detected please send an appropriate request')
  if(!firstname || !lastname || !username || !password){
    res.status(400).send({ERROR: 'please enter an update for each field'})
  }
  try {
    const updateUser = await knex("users")
      .where({ id: id })
      .update({firstname, lastname, username, password})
    if (updateUser === 0) {
      return res.status(404).json({ error: "user not found" });
    } else {
      return res.status(202).json("user Information Updated");
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error.json)
  }
})
//==========================================USERS HASHING AND SALTING ===================================\\
app.post('/register', async(req, res) => {
  const {firstname, lastname, username, password} = req.body;
  console.log('username: ', username)
  const salt = await bcrypt.genSalt(10);
  console.log('salt: ', salt)
  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  console.log('hash: ', hashedPassword)

  const tempObj = { firstname: firstname, lastname: lastname, username: username, password: hashedPassword};

  if(!firstname || !lastname || !username || !password)
    return res.status(400).json(`Null value in body`)
  try {
    await knex("users").insert({firstname: tempObj.firstname, lastname: tempObj.lastname, username: tempObj.username, password: tempObj.password})
    return res.json(tempObj)
  } catch (error) {
    res.status(500).send('unable to retrieve admin inventory list')
  }
});

app.post('/login', async (req, res)=>{
  const {username, password} = req.body;
  console.log(req.body)
  console.log('username: ', username)
  let user = await knex('users')
    .select('*')
    .where({username: username});
    
  console.log('user: ', user)
  user = user[0]
  console.log('user: ', user)
  if(Object.keys(user).length === 0){
    res.status(401).json({error: 'Invalid Credentials'})
    return;
  }

  const storedHashedPassword = user.password;
  console.log(storedHashedPassword)

  const isValid = await bcrypt.compare(password.toString(), storedHashedPassword)
  if(isValid){
    res.status(200).json({message: 'Login successful', ...user})
  } else {
    res.status(401).json({error: 'Invalid credentials'})
  }
})

app.listen(PORT, () => {
  console.log(`application running using NODE_ENV: ${process.env.NODE_ENV}`);//this line will need editing for deployment
});
