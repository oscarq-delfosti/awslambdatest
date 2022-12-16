import TokenHelper from '../../src/helpers/Token.helper';
import DateHelper from '../../src/helpers/Date.helper';

describe('Token helper test', () => {

    test('The generated token must have 16 digits.', () => {
        const response = TokenHelper.generate();
        expect(response).toHaveLength(16);
    })

    test('The pk key must have the correct structure', () => {
        const response = TokenHelper.generatePkKey();
        const arrResponse = response.split("_");

        const responseStructure = [arrResponse[0], arrResponse[1]];
        const expectedStructure = ["pk", "test"];

        expect(responseStructure).toEqual(
            expect.arrayContaining(expectedStructure),
        );
    })

    test('It should return that the token has not yet expired', () => {
        const testTime = DateHelper.fakeCurrentDateTime(10);
        const response = TokenHelper.isExpired(testTime);

        expect(response).toEqual(false);
    })

    test('It should return that the token has already expired', () => {
        const testTime = DateHelper.fakeCurrentDateTime(20);
        const response = TokenHelper.isExpired(testTime);

        expect(response).toEqual(true);
    })

})