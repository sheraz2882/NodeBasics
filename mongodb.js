const express = require("express");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // force Node to use Google DNS

const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

//post api for creating a product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get api for fetching all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://helpfinderdb:4aIZteNFbSZY9tpB@cluster0.k5bgrh8.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    console.log("Connected to database!");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });
