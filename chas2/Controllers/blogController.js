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

exports.getBlog = async (req, res) => {
  try {
    // ova e query spored id
    const blog = await Blog.findById(req.params.id);
    Blog.findOne({ _id: req.params.id });

    // query spored naslov
    // const naslov = req.params.naslov;
    // const blog = await Blog.findOne({ ime: naslov });

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const naslov = req.params.naslov;

    // const blog = await Blog.findOneAndUpdate({ime: naslov}, req.body)
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    //
    //Blog.findOneAndDelete

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

// 127.0.0.1:10000/api/v1/blogs?ocenka=3&cena=300
// 127.0.0.1:10000/api/v1/blogs?sort=cena

exports.getAllBlogs = async (req, res) => {
  try {
    // prvo pravime kopija od req.query
    let queryObj = { ...req.query };
    // prvaime array koj array kje izbrisi site paramteri
    const excludeFields = ["page", "sort"];
    // gi brisime site paramtri koi se vo areot ecludeFields
    excludeFields.forEach((el) => delete queryObj[el]);

    // implementirame query so koe query mozeme da koristime gt gte lt ltea
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    // Prebaruvame so objektot sto e isfiltriran kade sto na sekoe gt gte lt lte imame dodadeno dolar
    let query = Blog.find(JSON.parse(queryString));

    if (req.query.sort) {
      // query = query.sort(req.query.sort);
      const multipleSort = req.query.sort.split(",").join(" ");
      query = query.sort(multipleSort);
    }
    // i na kraj go egzekutirame querito

    const blogs = await query;

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

// Vtor nacin
// const blogs = await Blog.find()
//   .where("ocenka")
//   .equals(3)
//   .where("cena")
//   .equals(300);
///////////////////////////
// prv nacin
//  const blogs = await Blog.find({
//   ocenka: 3,
//   cena: 300,
// });
///////////////////////////

// const blogs = await Blog.find(queryObj);

// const query = Blog.find(queryObj);
// const blogs = await query;

// 127.0.0.1:10000/api/v1/blogs?ocenka=3&cena[gt]=280

// implementacija na sort
// 127.0.0.1:10000/api/v1/blogs?sort=cena
