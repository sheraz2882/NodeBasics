const express = require("express");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // force Node to use Google DNS

const mongoose = require("mongoose");
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route.js");
const app = express();

//app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app routes
app.use("/api/products", productRoute);

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
