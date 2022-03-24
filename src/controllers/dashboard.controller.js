const fs = require("fs");

const getDateAndTime = (stringDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(stringDate);
  const getDate = date.toLocaleDateString("id-ID", options);
  const getTime = `${date.getHours()}:${date.getMinutes()}`;
  return `${getDate}, ${getTime}`;
};

const saveCarsToDB = (carsRent) => {
  fs.writeFileSync("./src/database/cars.json", JSON.stringify(carsRent));
};

const loadCars = () => {
  const file = fs.readFileSync("./src/database/cars.json", "utf-8");
  const cars = JSON.parse(file);
  return cars;
};

const findCar = (id) => {
  const file = fs.readFileSync("./src/database/cars.json", "utf-8");
  const cars = JSON.parse(file);
  const found = cars.find((car) => car.id == id);
  return found;
};

const findIndexCar = (id) => {
  const file = fs.readFileSync("./src/database/cars.json", "utf-8");
  const cars = JSON.parse(file);
  const found = cars.findIndex((car) => car.id == id);
  return found;
};

exports.homePage = (req, res) => {
  const str = req.cookies?.user;
  const user = JSON.parse(str);

  res.render("dashboard/index", {
    layout: "../views/dashboard/layout",
    routePath: req.originalUrl,
    email: user.email,
  });
};
exports.carsPage = (req, res) => {
  const str = req.cookies?.user;
  const user = JSON.parse(str);
  const status = req.query?.status || "";
  const message = req.query?.message || "";
  const cars = loadCars();

  cars.forEach((car) => {
    car.updatedAt = getDateAndTime(car.updatedAt);
    car.price = parseInt(car.price).toLocaleString("id-ID");
  });

  res.render("dashboard/cars", {
    layout: "../views/dashboard/layout",
    routePath: req.originalUrl,
    cars,
    status,
    message,
    email: user.email,
  });
};
exports.addCarPage = (req, res) => {
  const str = req.cookies?.user;
  const user = JSON.parse(str);

  res.render("dashboard/add-car", {
    layout: "../views/dashboard/layout",
    routePath: req.originalUrl,
    email: user.email,
  });
};
exports.editCarPage = (req, res) => {
  const str = req.cookies?.user;
  const user = JSON.parse(str);
  const car = findCar(req.params.id);
  res.render("dashboard/edit-car", {
    layout: "../views/dashboard/layout",
    routePath: req.originalUrl,
    car,
    email: user.email,
  });
};

exports.addNewCarRent = (req, res) => {
  const cars = loadCars();
  const car = {
    ...req.body,
    id: Date.now(),
    price: parseInt(req.body.price),
    updatedAt: new Date(Date.now()).toISOString(),
  };
  cars.push(car);
  saveCarsToDB(cars);
  res.redirect("/cars?status=saved&message=Data Berhasil Disimpan");
};

exports.updateCarRent = (req, res) => {
  const cars = loadCars();
  const carIndex = findIndexCar(req.params.id);
  cars[carIndex] = {
    ...req.body,
    id: cars[carIndex].id,
    updatedAt: new Date(Date.now()).toISOString(),
  };
  saveCarsToDB(cars);
  res.redirect("/cars?status=saved&message=Data Berhasil Disimpan");
};

exports.deleteCarRent = (req, res) => {
  const cars = loadCars();
  const carIndex = findIndexCar(req.params.id);
  cars.splice(carIndex, 1);
  saveCarsToDB(cars);
  res.redirect("/cars?status=deleted&message=Data Berhasil Dihapus");
};
