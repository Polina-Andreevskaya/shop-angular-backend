'use strict';
import { productsList } from '../mocks/products.mock';

export async function getProductById(event) {
    const id = event.pathParameters.id;
    const itemById = (await productsList).find((item) => item.id === +id);

    return itemById ? {
            statusCode: 200,
            body: JSON.stringify(
                itemById
            ),
        } :
        {
            statusCode: 400,
            body: `Item ${id} not found`,
        };
};
