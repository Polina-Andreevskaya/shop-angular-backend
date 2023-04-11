'use strict';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const query = async (id) => {
    const result = await dynamoDB.query({
        TableName: process.env.TABLE_PRODUCTS,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {':id': id}
    }).promise();

    return result;
}

export async function getProductById(event) {
    const id = event.pathParameters.id;

    const itemById = (await query(id)).Items;

    console.log(itemById.length ? `success ${itemById}` : `error not found`)

    return itemById.length ? {
            statusCode: 200,
            body: JSON.stringify(
                itemById
            ),
        } :
        {
            statusCode: 500,
            body: `Item ${id} not found`,
        };
};
