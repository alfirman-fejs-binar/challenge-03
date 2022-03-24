const { Router } = require("express");
const router = Router();
// const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  homePage,
  carsPage,
  addCarPage,
  addNewCarRent,
  editCarPage,
  updateCarRent,
  deleteCarRent,
} = require("../controllers/dashboard.controller.js");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, homePage);
router.get("/cars", isAuthenticated, carsPage);
router.post("/cars", isAuthenticated, addNewCarRent);
router.post("/cars/:id", isAuthenticated, updateCarRent);
router.get("/cars/delete/:id", isAuthenticated, deleteCarRent);
router.get("/add-car", isAuthenticated, addCarPage);
router.get("/edit-car/:id", isAuthenticated, editCarPage);

module.exports = router;
