'use strict';
const {productsList} = require('../mocks/products.mock');

module.exports.getProducts = async (event) => {
    return productsList ? {
            statusCode: 200,
            body: JSON.stringify(
                productsList
            ),
        } :
        {
            statusCode: 400,
            body: JSON.stringify(
                'Products not found'
            ),
        };
};
