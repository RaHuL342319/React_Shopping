const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shopping");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  confirmPassword: String,
  mobile: String,
});

const productsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

const categorySchema = new mongoose.Schema({
  category: String,
});

const userModel = mongoose.model("users", userSchema);

const productModel = mongoose.model("products", productsSchema);

const categoryModel = mongoose.model("categories", categorySchema);

app.get("/getusers", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving users"); // Send error response
  }
});

app.post("/registeruser", async (req, res) => {
  const user = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    mobile: req.body.mobile,
  };
  try {
    const insertedData = await userModel.create(user);
    // Check if insertion was successful
    if (!insertedData) {
      throw new Error("Error registering user. Please check the data.");
    }
    res.json(insertedData); // Send the inserted user data as response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user. Please try again later."); // More user-friendly error message
  }
});

app.get("/getproducts", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving users"); // Send error response
  }
});


app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.find({ "id": parseInt(productId) }, { _id: 0, __v: 0 });
    console.log(product)
    if (!product) {
      // Handle case where no product is found with the given ID
      return res.status(404).send("Product not found.");
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).send("Error during fetching products: " + err.message);
  }
});

app.get("/products/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const product = await productModel.find({ "category": category }, { _id: 0, __v: 0 });
    console.log(product)
    if (!product) {
      // Handle case where no product is found with the given ID
      return res.status(404).send("Product not found.");
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).send("Error during fetching products: " + err.message);
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).send("Error during fetching categories: " + err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
