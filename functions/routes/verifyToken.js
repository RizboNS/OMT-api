const jwt = require("jsonwebtoken");

module.exports = {
  hasTokken: (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied");
    token = token.split(" ")[1];
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      res.locals.user = req.user;
      res.locals.authenticated = !req.user.anonymous;
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid Token");
    }
  },
  isAdmin: (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied");
    token = token.split(" ")[1];
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      res.locals.user = req.user;
      res.locals.authenticated = !req.user.anonymous;
      if (verified.role != "ADMIN") {
        return res.status(400).send("Access Denied");
      }
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid Token");
    }
  },
};
//  TO DO ENCRYPT ROLE LIKE PASSWORD OR FIND BETTER WAY OF NOT SENDING ROLE TO THE CLIENT
