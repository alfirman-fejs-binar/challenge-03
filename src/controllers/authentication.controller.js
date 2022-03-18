const fs = require("fs");

const loadUsers = () => {
  const file = fs.readFileSync("./src/database/authentication.json", "utf-8");
  const users = JSON.parse(file);
  return users;
};

const findIndexUser = (email) => {
  const file = fs.readFileSync("./src/database/authentication.json", "utf-8");
  const users = JSON.parse(file);
  const found = users.findIndex((user) => user.email === email);
  return found;
};

exports.loginPage = (req, res) => {
  const status = req.query?.status || "hidden";
  const message = req.query?.message || "";

  res.render("authentication/login", {
    layout: "../views/authentication/layout",
    status,
    message,
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return;

  const users = loadUsers();

  const userIndex = findIndexUser(email);

  if (userIndex !== -1 && users[userIndex]?.password === password) {
    res.cookie("user", JSON.stringify(users[userIndex]), {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.redirect("/");
  } else
    return res.redirect(
      "/auth/login?status=error&message=Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital."
    );
};

exports.logout = (req, res, next) => {
  res.cookie("user", "", { maxAge: 0 });
  res.redirect("/auth/login");
};
