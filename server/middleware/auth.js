import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  console.log(token)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);


    console.log(payload)

    // Attach useful data to the request
    req.auth = { userId: payload.id };
    req.plan = payload.plan || "free";
    req.free_usage = payload.free_usage ?? 0;
    req.user = payload;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
