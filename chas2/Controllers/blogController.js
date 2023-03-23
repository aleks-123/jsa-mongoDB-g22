const Blog = require("../Model/blogModel.js");

exports.createBlog = async (req, res) => {
  try {
    console.log(req.body);
    // stara varijanta
    // const newBlog =  new Blog(req.body);
    // await newBlog.save()
    const newBlog = await Blog.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        blog: newBlog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    // so ova gi dobivame site dokumenti od kolekcijata
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success",
      data: {
        blogs: blogs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getBlog = (req, res) => {};
exports.updateBlog = (req, res) => {};
exports.deleteBlog = (req, res) => {};
