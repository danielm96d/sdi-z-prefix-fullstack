require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
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

//==================get a list of all inventories====================\\
app.get("/inventory", async (req, res)=>{
  try {
    const adminInventory = await knex("items")
    .select('*');
    return res.json(adminInventory)
  } catch (error) {
    res.status(500).send('unable to retrieve admin inventory list')
  }
})

//==================get a list of a specific user's inventory====================\\
app.get("/inventory/:id", async (req, res)=>{
  const {id} = req.params;
  try {
    const inventory = await knex("items")
    .select('*').where({userID: id})
    return res.json(inventory)
  } catch (error) {
    res.status(500).send('unable to retrieve admin inventory list')
  }
})

//==================Retrieve all the user information====================\\
app.get("/users", async (req, res)=>{
  try {
    const usersList = await knex("users")
    .select('*');
    return res.json(usersList)
  } catch (error) {
    res.status(500).send('unable to retrieve admin inventory list')
  }
})

//==================Create a User====================\\
app.post("/users", async (req, res)=>{
  const userData = req.body
  console.log(userData)
  if(!userData)
    res.status(400).send('empty post request detected please send an appropriate request')
  try {
    await knex("users").insert({firstName: userData.firstName, lastName: userData.lastName, userName: userData.userName, password: userData.password})
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
  const {firstName, lastName, userName, password} = req.body
  if(!id)
    res.status(400).send('empty id field request detected please send an appropriate request')
  if(!firstName || !lastName || !userName || !password){
    res.status(400).send({ERROR: 'please enter an update for each field'})
  }
  try {
    const updateUser = await knex("users")
      .where({ id: id })
      .update({firstName, lastName, userName, password})
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

//==================Retrieve a single users' information====================\\
app.get("/users/:id", async (req, res)=>{
  const {id} = req.params;
  try {
    const usersList = await knex("users")
    .select('*').where({id: id});
    return res.json(usersList)
  } catch (error) {
    res.status(500).send('unable to retrieve admin inventory list')
  }
})



app.listen(PORT, () => {
  console.log(`application running using NODE_ENV: ${process.env.NODE_ENV}`);//this line will need editing for deployment
});
