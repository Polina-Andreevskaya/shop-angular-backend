'use strict';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const scan = async (tableName) => {
    const scanResult = await dynamoDB.scan({
        TableName: tableName
    }).promise();

    return scanResult;
}

export async function getProducts() {
    let products;
    let stocks;
    let result;

    try {
        products = (await scan(process.env.TABLE_PRODUCTS)).Items;
        stocks = (await scan(process.env.TABLE_STOCKS)).Items;

        result = products.reduce((res, product) => {
            res.push(
                {
                    ...product,
                    count: stocks.find((stocksProduct) => stocksProduct.id === product.id).count
                }
            );

            return res;
        }, []);
    }
    catch (error) {
        console.log(`error ${error}`);

        return {
            statusCode: 500,
            body: JSON.stringify({message: `${error}`})
        };
    }

    console.log(`success ${result}`);

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}
