import { getProductById } from '../handlers/getByIdHandler';
import { productsList } from '../mocks/products.mock';

describe('getProductById', () => {

    it('should return appropriate product for id', async () => {
        const products = (await productsList);
        const testId = 1;

        const expectedData = {
            statusCode: 200,
            body: JSON.stringify(
                products.find((item) => item.id === testId)
            ),
        };

        await expect(getProductById({pathParameters: {id: testId}})).resolves.toStrictEqual(expectedData);
    });


    it('should return error response for non-existing id', async () => {
        const testId = 0;

        const expectedData = {
            statusCode: 400,
            body: `Item ${testId} not found`,
        };

        await expect(getProductById({pathParameters: {id: testId}})).resolves.toStrictEqual(expectedData);
    });
});
