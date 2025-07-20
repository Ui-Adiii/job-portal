import jwt from 'jsonwebtoken'
const userAuth = async(req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        message: "Unauthorized User",
        success: false,
      })
    }
    const decode =  jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.json({
        message: "Invalid",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
}

export default userAuth;