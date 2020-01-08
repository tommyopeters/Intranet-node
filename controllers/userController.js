const User = require("./../models/userModels");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["sort", "page", "fields", "limit"];
    excludedFields.forEach(field => {
      delete queryObj[field];
    });

    //Query Operator conversion
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const tempQueryObj = JSON.parse(queryStr);

    this.query = this.query.find(tempQueryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = req.query.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitField() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    // const queryObj = { ...req.query };
    // const excludedFields = ["sort", "page", "fields", "limit"];
    // excludedFields.forEach(field => {
    //   delete queryObj[field];
    // });

    // //Query Operator conversion
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // const tempQueryObj = JSON.parse(queryStr);

    // let query = User.find(tempQueryObj);
    // const query = User.find()
    //   .where("gender")
    //   .equals("male");

    //SORTING
    // if (req.query.sort) {
    //   let sortBy = req.query.sort.split(",").join(" ");
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("-createdAt");
    // }

    //FIELD LIMIT
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    //PAGINATION AND LIMIT
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 1;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numUsers = await User.countDocuments();

    //   if (skip >= numUsers) {
    //     console.log("error");
    //     throw new Error("This page does not exist");
    //   }
    // }

    //EXECUTE QUERY
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    const users = await features.query;

    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: { user }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
