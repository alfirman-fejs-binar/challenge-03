const isAuthenticated = (req, res, next) => {
  const userString = req.cookies?.user;

  if (userString) res.redirect("/auth/login");

  next();
};

module.exports = isAuthenticated;
