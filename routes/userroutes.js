
  const user = require("../controllers/userController.js");
  const auth = require("../middleware/auth.js");

  var router = require("express").Router();

  router.post("/login", user.login);                // User Login


  router.post("/signup",auth.saveUser, user.create);    // Create new user


  router.get("/user", user.findAll);               // Retrieve all user


  router.get("/user::id", user.findOne);            // Retrieve  single user with id


  router.put("/user:id", user.update);             // Update a user with username


  router.delete("/user::id", user.delete);         // Delete a user with id


  router.delete("/user", user.deleteAll);          // Delete all user


  module.exports = router;