const express = require("express");
const route= express.Router();
const empController= require("../controllers/empController");

route.post("/employeeregistration", empController.userRegistration);
route.post("/employeelogin", empController.userLogin);
route.get("/displayusersdata", empController.displayUsersData);
route.get("/displaysdata", empController.display);




module.exports=route;