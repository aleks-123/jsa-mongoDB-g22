const Blog = require("../Model/blogModel.js");

exports.getBlogView = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).render("blogs", {
      naslovNaStranata: "Site blogovi",
      godina: "2023",
      blogs,
    });
  } catch (err) {
    res.status(500).send("Error with this page");
  }
};

exports.getSpecificBlog = async (req, res) => {
  try {
    console.log("aaa");
    const blog = await Blog.findById(req.params.id);

    res.status(200).render("clickedBlog", {
      blog,
    });
  } catch (err) {
    res.status(500).send("Error with this page");
  }
};

exports.createBlog = async (req, res) => {
  try {
    console.log(req.body);

    await Blog.create(req.body);
    res.redirect("/blogs");
  } catch (err) {
    res.status(500).send("Error creating blog post");
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/blogs");
  } catch (err) {
    res.status(500).send("Error deleting blog");
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/blogs/${blog._id}`);
  } catch (err) {
    res.status(500).send("Error updating blog");
  }
};
