const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  else {
    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) { return res.status(401).end(); }

      const userStatus = decoded.userstatus;
      console.log(userStatus)
      if(userStatus == 1){
        return next();
      } else {
        return res.status(401).end();
      }
    });
  }

};
