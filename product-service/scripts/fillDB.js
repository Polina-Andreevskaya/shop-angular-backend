'use strict';
import {productsList} from '../mocks/products.mock.js';
import {v4 as uuidv4} from 'uuid';
import {DynamoDBDocumentClient, BatchWriteCommand} from '@aws-sdk/lib-dynamodb';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';

const region = 'us-east-1';

const ddbClient = new DynamoDBClient({
    region,
});

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: true, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
    marshallOptions,
    unmarshallOptions,
});

const putStockRequestItems = [];
const putProductRequestItems = [];

const fillDB = async () => {
    const productsArray = await productsList;

    productsArray.forEach((product) => {
        const productId = uuidv4();

        putProductRequestItems.push({
            PutRequest: {Item: {...product, id: productId}},
        });

        putStockRequestItems.push({
            PutRequest: {
                Item: {
                    id: productId,
                    count: Math.floor(Math.random() * 100),
                },
            },
        });
    });


    await ddbDocClient.send(
        new BatchWriteCommand({
            RequestItems: {
                ['products']: putProductRequestItems,
                ['stocks']: putStockRequestItems,
            },
        })
    );
};

fillDB();
