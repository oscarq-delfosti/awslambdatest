import CardHelper from '../../src/helpers/Card.helper';

describe('Token helper test', () => {

    test('The card number must be valid', () => {

        const cardNumber = "4970110000001029";
        const response = CardHelper.validate(cardNumber);

        expect(response).toEqual(true);

    })

    test('The card number must be invalid', () => {

        const cardNumber = "39701100020102";
        const response = CardHelper.validate(cardNumber);

        expect(response).toEqual(false);

    })


})