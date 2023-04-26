'use strict';
import * as AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const put = async (tableName, item) => {
    const scanResult = await dynamoDB.put({
        TableName: tableName,
        Item: item
    }).promise();

    return scanResult;
}

export async function createNewProduct(event) {
    console.log('create request event', event);

    const payloadData  = JSON.parse(event.body);
    const productId = uuidv4();

    const props = ['title', 'description', 'price', 'count'];
    const missedFromSchema = props.find(
        prop => !payloadData.hasOwnProperty(prop)
    );

    if (!payloadData || missedFromSchema) {
        return {
            statusCode: 400,
            body: JSON.stringify(
                { message: `The data is invalid` }
            ),
        };
    } else {
        try {
            await put(process.env.TABLE_PRODUCTS, {
                id: productId,
                price: payloadData.price,
                title: payloadData.title,
                imgUrl: payloadData.imgUrl,
                description: payloadData.description});
            await put(process.env.TABLE_STOCKS, {
                id: productId,
                count: payloadData.count
            });

            console.log(`Product with ID [ ${productId} ] has been added`);

        } catch (error) {

            console.log(`Internal server error: ${error}`);

            return {
                statusCode: 500,
                body: JSON.stringify({ message: `Internal server error: ${error}` })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(
                { message: `Product with ID [ ${productId} ] has been added`, productId: productId }
            ),
        };
    }
}
