const Jwt = require('jsonwebtoken')

 const authmiddleware = async(req,res,next)=>{
  
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decode = Jwt.verify(token, process.env.SECRET,
     

           
      (err, decode) => {
        if (err) {
          return res.status(200).send({
            message: "Auth Fialed",
            success: false,
            err
          });
        } else {
          req.body.userId = decode.id;
          next();
        }
      });
    } catch (error) {
      console.log(error);
      res.status(401).send({
        message: "Auth Failed",
        success: false,
      });
    }
    
  };
module.exports = authmiddleware