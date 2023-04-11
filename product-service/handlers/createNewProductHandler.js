'use strict';
import * as AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const put = async (tableName, item) => {
    const scanResult = await dynamoDB.scan({
        TableName: tableName,
        Item: item
    }).promise();

    return scanResult;
}

export async function createNewProduct(event) {
    let itemToCreate = event.body?.item;

    try {
        await put(process.env.TABLE_PPODUCTS, {
            id: itemToCreate.id,
            price: itemToCreate.price,
            title: itemToCreate.title,
            imgUrl: itemToCreate.imgUrl,
            description: itemToCreate.description});
        await put(process.env.TABLE_STOCKS, {
            id: itemToCreate.id,
            count: itemToCreate.count
        });

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Internal server error: ${error}` })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Item was added: ${itemToCreate}` }),
    };
}
