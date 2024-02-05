const express = require("express");
const db = require("../models");
 const User = db.user;


 const saveUser = async (req, res, next) => {
 try {
    //checking if username already exist
   const username = await User.findOne({
     where: {
        username: req.body.username,
     },
   });
   if (username) {
     return res.send("username already taken");
   }

   //checking if contact already exist
   const contactCheck = await User.findOne({
     where: {
       contact: req.body.contact,
     },
   });

   if (contactCheck) {
     return res.send("Authentication failed");
   }

   next();
 } catch (error) {
   console.log(error);
 }
};

 module.exports = {
 saveUser,
};