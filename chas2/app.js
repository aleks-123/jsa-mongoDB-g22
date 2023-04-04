const express = require("express");
const mongoose = require("mongoose");
const blogController = require("./Controllers/blogController");
const viewController = require("./Controllers/viewController");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// importirame ejs engine
app.set("view engine", "ejs");
// za da go koristime public folder mora da iskoristime middelware
app.use(express.static("public"));

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

// OVIE RUTI SE ZA NASHETO API
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

// definiranje na routi za stranica
app.get("/blogs", viewController.getBlogView);
app.post("/blogs", viewController.createBlog);
app.get("/blogs/:id", viewController.getSpecificBlog);
app.post("/blogs/delete/:id", viewController.deleteBlog);
app.post("/blogs/:id", viewController.updateBlog);

const port = 10000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//vezba
// app.get("/blogs/:id", viewController.getSingleBlock);

//1.
// Crud operacii
// so HTTP metodite
// Create Read Update and Delete
//2.
// Najcesto isprakjame data kako JSON objekt
//3.
// apito e stateless

// res.status(200);

// 200 - OK, nasiot request bil uspesen i naseto api ipratilo pobaranata data
// 201 - Kreiranje, nasiot request bil uspesen i imame kreirano dokument na serverot
// 204 - OK, samo sto serverot ne ni vrakja datata

// 400 - Bad request, Ova ni oznacuva deka request bil invalid(netocen) ili defekten. so ova oznacuva deka ne razbran requestot od serverot
// 401 - Unathorized: Ova oznacuva deka juzerot ne e avtoriziran. nema pravo da go dobie toa sto go saka
// 403 - Forbidden, Serverot go razbral requestot, ama juzerot ne mu e dozvoleno da ima pristam do requestiraiot resource
// 404 - Not found: Serverot nemoze da go pronajajde pobaraniot resurs

// 500 Imame greska so serverot pri procesiranje na requestot
