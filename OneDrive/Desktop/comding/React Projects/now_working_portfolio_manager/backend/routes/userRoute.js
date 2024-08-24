const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModels");
const router = express.Router();


router.post("/", async (req, res) => {
  // add something in database
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });

    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.send(400).json({ error: error.message });
    // each error has a key called message with which we can see our error message
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

// get single user
router.get("/:id", async (req, res) => {
  const { id } = req.params; // to get the stuff like id out of the url we use params, for getting throug the input field we use req.body()
  try {
    const singleUser = await User.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// delete operations
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // to get the stuff like id out of the url we use params, for getting throug the input field we use req.body()
  try {
    const singleUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//update operations
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

module.exports = router;
