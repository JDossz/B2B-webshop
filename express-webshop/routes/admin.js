const express = require("express");
const router = express.Router();

const MariaDBmain = require("../modules/webshop-mariadb");
const database = new MariaDBmain();

router.all("/", async (req, res, next) => {
  const auth = await database.checkLogin(req);
  if (!auth || auth.admin === 0) {
    return res.render("error-page", {
      title: "Nem-nem :)"
    });
  } else if (auth && auth.admin === 1) {
    next();
  }
});

router.get("/*", (req, res) => {
  res.render("admin", {
    title: "Admin",
    user: req.user || {}
  });
});

module.exports = router;
