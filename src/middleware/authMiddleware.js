const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    console.log("hello")
    console.log(req.header("Authorization"))
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res
      .status(400)
      .send({ error: "Authentication Failed - Please reauthenticate" });
  }
};

module.exports = authenticate;
