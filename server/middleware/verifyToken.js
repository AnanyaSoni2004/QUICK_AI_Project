// const jwt = require("jsonwebtoken");

// // Middleware to verify access and refresh tokens
// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization;
//   const refreshToken = req.headers["x-refresh-token"];

//   if (!token) return res.status(400).json({ msg: "token absent" });

//   const [prefix, authToken] = token.split(" ");
//   if (prefix !== "JWT") return res.status(400).json({ msg: "invalid token" });

//   jwt.verify(authToken, process.env.JWT_SECRET, (err, decode) => {
//     if (err && err.name === "TokenExpiredError") {
//       // Access token expired — try verifying refresh token
//       jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
//         if (err) return res.status(400).json({ msg: "invalid token" });

//         // Generate new tokens
//         const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(decode);

//         // Send them in response headers
//         res.setHeader("x-access-token", accessToken);
//         res.setHeader("x-refresh-token", newRefreshToken);

//         next();
//       });
//     } else if (err) {
//       return res.status(400).json({ msg: "invalid token" });
//     } else {
//       next();
//     }
//   });
// };

// // Helper function for generating tokens
// function generateTokenPair(payload) {
//   const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
//   const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
//   return { accessToken, refreshToken };
// }

// module.exports = verifyToken;
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
