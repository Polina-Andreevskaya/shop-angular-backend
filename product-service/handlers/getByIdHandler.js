'use strict';
const {productsList} = require('../mocks/products.mock');

module.exports.getProductById = async (event) => {
    const id = event.pathParameters.id;
    const itemById = productsList.find((item) => item.id === +id);

    return itemById ? {
            statusCode: 200,
            body: JSON.stringify(
                itemById
            ),
        } :
        {
            statusCode: 400,
            body: JSON.stringify(
                'Item not found'
            ),
        };
};
