const isAdmin = (req, res, next) => {
  const user = "admin";
  if (user === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = isAdmin;
