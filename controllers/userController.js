const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "Piyush";

const user = db.user;


// User Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = await user.findOne({
      where: {
        username: username
      }

    });

    if (newUser) {
      const isSame = await bcrypt.compare(password, newUser.password);

      if (isSame) {
        let token = jwt.sign({ id: newUser.id }, secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        console.log(token);
        return res.send(newUser);
      } else {
        return res.send("Authentication failed ");
      }
    } else {
      return res.send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};



//  Save a new user
exports.create = async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "User details can not be empty!"
    });
    return;
  }

  const userData = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
    role: req.body.role,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    contact: req.body.contact

  };

  const newUser = user.create(userData)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
 
  if (newUser) {
    let token = jwt.sign({ id: newUser.id }, secretKey, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });
    console.log(token);
  }
};



// Retrieve all users
exports.findAll = (req, res) => {
  user.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:  "Error occurred while retrieving users."
      });
    });
};

// Find a single user with an username
exports.findOne = (req, res) => {
  const id = req.params.id;
  user.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a user by the id
exports.update = (req, res) => {
  const id = req.params.id;

  user.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user with id
exports.delete = (req, res) => {
  const newId = req.params.id;

  user.destroy({
    where: { id: newId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + newId
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  user.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} users deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
