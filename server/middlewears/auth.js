const admin = require("./../firebase");

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
