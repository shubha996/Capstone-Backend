const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.users;

exports.signup = (request, response) => {
    if (!request.body.email || !request.body.password) {
        response.status(400).send({
            message: "Enter valid email and password"
        });
        return;
    }


    const filter = { email: request.body.email };

    if (User.email === filter) {
        response.send(400).send({
            message: "This email is already registered!"
        });
        return;
    }


    User.findOne(filter, (err, user) => {
        if (!err && user === null) {

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(request.body.password, salt);

            const user = new User({
                name: request.body.name,
                email: request.body.email,
                password: hashedPassword,

                isAdmin: request.body.isAdmin ? true : false,
                isAuthenticated: false,
            });
            user.save(user).then((data) => {
                response.status(200).send(data);
            })
                .catch((err) => {
                    response.status(500).send({
                        message: "Something's wrong"
                    });
                })

        }
        else {
            response.status(400).send({
                message: "Already exist"
            });
        }
    })
};

exports.login = (request, response) => {
    if (!request.body.email || !request.body.password) {
        response.status(400).send({
            message: "Enter valid email and password"
        });
        return;
    }

    const filter = { email: request.body.email };

    User.findOne(filter, (err, user) => {
        if (user === null) {
            response.status(401).send({
                message: "This email is not registered"
            });
            return;
        }
        else {
            if (bcrypt.comparesponseync(request.body.password, user.password)) {
                user.isAuthenticated = true;
                User.findOneAndUpdate(filter, user).then((data) => {
                   
                    const token = jwt.sign({ _id: data._id }, "myprivatekey");
                    
                    data.token = token;
                   
                    response.send(data);
                }).catch((err) => {
                    response.status(500).send({
                        message: "Some error Occured",
                    });
                })
            }
            else {
                response.status(401).send({
                    message: "Invalid Credentials"
                })
            }

        }
    });

};