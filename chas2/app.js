const express = require("express");
const mongoose = require("mongoose");
const blogController = require("./Controllers/blogController");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://aleksandar:YRzFP7MITu4YfYZo@cluster0.dle0u6v.mongodb.net/vezba1?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("uspesno se povrzavme");
  })
  .catch((err) => {
    console.log(err);
  });

// so ovaa ruta sakame da ja zemime celata kolekcija
app.get("/api/v1/blogs", blogController.getAllBlogs);
// so ovaa ruta go zemame sam
app.get("/api/v1/blogs/:id", blogController.getBlog);
// so ovaa ruta prakjame informacii vo serverot, vo ovoj slucaj kreirame blog
app.post("/api/v1/blogs", blogController.createBlog);
// so patch pravime update na blokogot
app.patch("/api/v1/blogs/:id", blogController.updateBlog);
// brisime blog
app.delete("/api/v1/blogs/:id", blogController.deleteBlog);

const port = 10000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
