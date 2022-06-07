const jwt = require("jsonwebtoken");

module.exports = function(request, response, next) {
    const token = request.headers["authorization"];

    if(!token) return response.status(401).send({
        message: "Access Denied No token Provided"
    });
    try{
        jwt.verify(token, "myprivatekey");
        next();
    }catch(ex){
        response.status(401).send("Invalid token");
    }
};
