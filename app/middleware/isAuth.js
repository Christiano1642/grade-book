import jwt from "jsonwebtoken";
import config from "../config.js";

// This is our authorization
export default (req, _, next) => {
  try {
    req.isAuth = jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.encryption.secret
    );
    next();
  } catch {
    req.isAuth = false;
    next();
  }
};
