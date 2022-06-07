const db = require("../models");
const Order = db.orders;

exports.createOrder = (request, response) => {
    if (!request.body.address || !request.body.product || !request.body.quantity || !request.body.user || !request.headers.token) {
        response.status(400).send({
            message: "Cannot be Empty"
        });
        return;
    }

    const order = new Order({
        address: request.body.address,
        product: request.body.product,
        quantity: request.body.quantity,
    })

    order.save().then((data) => {
        response.send(data);
    }).catch((error) => {
        response.status(500).send({
            message: "Error occurred while creating Order!!!!", error
        });
    });
}