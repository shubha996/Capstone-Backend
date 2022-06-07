const db = require("../models");
const Address = db.addresses;

exports.addAddress = (request, response) => {
    if (!request.body.name || !request.body.contactNumber || !request.body.zipCode || !request.body.state || !request.body.city || !request.headers.token) {
        response.status(400).send({
            message: "Cannot be Empty"
        });
        return;
    }

    if (request.body.zipCode.length < 6 || request.body.zipCode.length > 6) {
        response.status(400).send({
            message: "Invalid zip code!"
        });
        return;
    }

    if (typeof(request.body.contactNumber) ==! Number || request.body.contactNumber.length < 10 || request.body.contactNumber.length > 10) {
        response.status(400).send({
            message: "Invalid number!"
        });
        return;
    }

    const address = new Address({
        name: request.body.name,
        city: request.body.city,
        landmark: request.body.landmark,
        state: request.body.state,
        street: request.body.street,
        contactNumber: request.body.contactNumber,
        zipCode: request.body.zipCode,
    });

    address.save().then((data) => {
        response.send(data);
    }).catch((err) => {
        response.status(500).send({
            message: "Error!!!!", err
        });
    });
}