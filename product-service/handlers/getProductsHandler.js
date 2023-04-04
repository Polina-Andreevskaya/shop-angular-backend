'use strict';
const {productsList} = require('../mocks/products.mock');

export async function getProducts(event) {
    try {
        await productsList
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: `${error}`})
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            await productsList
        ),
    };
}
