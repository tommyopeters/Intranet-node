const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/user-gen.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users }
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find(el => el.index === id);

  if (!user) {
    return res.status(404).send({
      status: "failed",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: { user }
  });
};
exports.createUser = (req, res) => {
  const newId = users[users.length - 1].index + 1;
  const newUser = Object.assign({ index: newId }, req.body);

  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/user-gen.json`,
    JSON.stringify(users),
    err => {
      res.status(201).json({
        status: "success",
        data: {
          newUser
        }
      });
    }
  );
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
