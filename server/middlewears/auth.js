const admin = require("./../firebase");
const User=require("./../models/user")

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers.authtoken);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    // console.log(firebaseUser);
    next();
  } catch (err) {
    res.status(401).send("err: Invalid Token");
  }
};



exports.adminCheck=async(req,res,next)=>{
  const {email}=req.user;

  await User.findOne({email}).then((adminUser)=>{
    if(adminUser.role!=="admin"){
      res.status(403).json({
        err:"Admin resource. Access Denied",
      })
      return;
    }
    next()
  }).catch((err)=>{
    console.log(12321321);
    console.log(err);
  })
}