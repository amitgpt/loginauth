const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    try{       
        const token = req.headers.authorization;
        var decoded = jwt.verify(token, "amitgpt");
        req.userData = decoded;
        next();
    }catch(err){        
        return res.status(403).json({ "message": "Not Authenticated"})
    }

};