const Tour = require("./../models/userModels");

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success"
    // results: users.length,
    // data: { users }
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  // const user = users.find(el => el.index === id);

  // res.status(200).json({
  //   status: "success",
  //   data: { user }
  // });
};
exports.createUser = (req, res) => {
  res.status(201).json({
    status: "success",
    data: {
      newUser
    }
  });
};

exports.updateUser = (req, res) => {
  if (req.params.id * 1 > users.length) {
    return res.status(404).send({
      status: "failed",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated tour goes here..."
    }
  });
};

exports.deleteUser = (req, res) => {
  if (req.params.id * 1 > users.length) {
    return res.status(404).send({
      status: "failed",
      message: "Invalid ID"
    });
  }

  res.status(204).json({
    status: "success",
    data: null
  });
};
