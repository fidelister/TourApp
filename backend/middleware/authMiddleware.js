import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const protect = async (req, res, next) => {
  try {
    //get token from header
    let token = req.header('Authorization').split(' ')[1];
    // .split(' ')[1]
    if (!token) {
      return res.status(400).json({ msg: 'no token' })
    }

    //verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(400).json({ msg: "invalid token" })
    console.log({ decoded });

    //get user from the token
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authorized" });
  }
}
// bearer token
// export default protect;

export const authAdmin = (req, res, next) => {
  try {
    console.log(req.user)
    if (req.user.roles === "user") {
      return res.status(403).json({
        error: [{ msg: "Unauthorized user, you're not a USER" }]
      })
    }
    next();
  } catch (error) {
    return res.status(500).json({
      error: [{ msg: `Server error:${error.message}` }]
    })
  }
}
export const authUser = (req, res, next) => {
  try {
    console.log(req.user)
    if (req.user.roles === "user") {
      return res.status(403).json({
        error: [{ msg: "Unauthorized user, you're not an ADMIN" }]
      })
    }
    next();
  } catch (error) {
    return res.status(500).json({
      error: [{ msg: `Server error:${error.message}` }]
    })
  }
}

