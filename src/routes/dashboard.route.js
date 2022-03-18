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

router.get("/", homePage);
router.get("/cars", carsPage);
router.post("/cars", addNewCarRent);
router.post("/cars/:id", updateCarRent);
router.get("/cars/delete/:id", deleteCarRent);
router.get("/add-car", addCarPage);
router.get("/edit-car/:id", editCarPage);

module.exports = router;
