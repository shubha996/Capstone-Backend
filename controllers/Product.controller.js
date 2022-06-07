const db = require("../models");
const Product = db.products;

exports.searchProducts = (request, response) => {
    const { category, direction, name, sortBy } = request.query;

    if (category === "undefined") {
        category = "";
    }
    if (direction === "undefined") {
        direction = "DESC";
    }
    if (name === "undefined") {
        name = "";
    }
    if (sortBy === "undefined") {
        sortBy = "productId";
    }

    Product.find({ category: category }).then((data) => {
        response.status(200).send(data);
    }).catch((err) => {
        response.status(500).send({
            message: "some error occurred while fetching the product by categories", err
        });
    });

    Product.find({ name: name }).then((data) => {
        response.status(200).send(data);
    }).catch((err) => {
        response.status(500).send({
            message: "some error occurred while fetching the product by name", err
        });
    });

    Product.find({ name: name }).then((data) => {
        response.status(200).send(data);
    }).catch((err) => {
        response.status(500).send({
            message: "some error occurred while fetching the product by name", err
        });
    });

    Product.find({}).sort({ sortBy: -1 }).then((data) => {
        response.status(200).send(data);
    }).catch((err) => {
        response.status(500).send({
            message: "some error occurred while sorting", err
        });
    });

};

exports.getProductCategories = (request, response) => {
    Product.find({}).select("category").distinct("categories").then((data) => {
        response.send(data);
    }).catch((err) => {
        response.status(500).send({
            message: "some error occurred while fetching the categories", err
        });
    });
}

exports.getProductById = (request, response) => {
    const id = request.params.id;

    Product.findById({ _id: id }).then((data) => {
        if (!data) {
            response.status(404).send({
                message: "No Product found for ID - <id>",
            });
        }
        else {
            response.send(data);
        }
    }).catch((err) => {
        response.status(500).send({
            message: "some error occurred while fetching the Courses", err
        });
    });
}

exports.saveProduct = (request, response) => {
    if (!request.body.name || !request.body.availableItems || !request.body.price || !request.body.category || !request.headers.token) {
        response.status(400).send({
            message: "Cannot be Empty"
        });
        return;
    }

    const product = new Product({
        name: request.body.name,
        category: request.body.category,
        manufacturer: request.body.manufacturer,
        availableItems: request.body.availableItems,
        price: request.body.price,
        imageURL: request.body.imageURL,
        description: request.body.description,

    })

    product.save(product).then((data) => {
        response.send(data);
    }).catch((err) => {
        response.status(500).send({
            message: "some error occurred while saving the product", err
        });
    });
}

exports.updateProductDetails = (request, response) =>{
    if (!request.body.name || !request.body.availableItems || !request.body.price || !request.body.category || !request.headers.token) {
        response.status(400).send({
            message: "Cannot be Empty"
        });
        return;
    }

    const product = new Product({
        name: request.body.name,
        category: request.body.category,
        manufacturer: request.body.manufacturer,
        availableItems: request.body.availableItems,
        price: request.body.price,
        imageURL: request.body.imageURL,
        description: request.body.description,

    })

    product.save(product).then((data) => {
        response.send(data);
    }).catch((err) => {
        response.status(500).send({
            message: "No Product found for ID - <id>!", err
        });
    });
}


exports.deleteProductById = (request, response) => {
    const id = request.params.id;

    Product.findOneAndDelete({ _id: id }).then((data) => {
        response.send({ product: data, message: "Product with ID - <id> deleted successfully!" });
    }).catch((err) => {
        response.status(500).send({
            message: "No Product found for ID - <id>!", err
        });
    });
}
