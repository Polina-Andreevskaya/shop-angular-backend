import { getProducts } from '../handlers/getProductsHandler';
import { productsList } from '../mocks/products.mock';

describe('getProductsList', () => {
    it('should return response with products List', async () => {
        const expectedData = {
            statusCode: 200,
            body: JSON.stringify(
                await productsList
            ),
        };

        await expect(getProducts()).resolves.toStrictEqual(expectedData);
    });
});
