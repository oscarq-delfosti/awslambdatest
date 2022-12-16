import { CardsService } from '../../src/services/cards.service';
import Database from '../../src/database/database';
import { ICard } from '../../src/interfaces/card.interface';

describe('Cards service test', () => {

    const cardsService = new CardsService(Database.getConnection());

    const testCard: ICard = {
        card_number: "4970110000001029",
        cvv: 124,
        expiration_month: "10",
        expiration_year: "2022",
        email: "oscar.quiroz@test.com"
    }

    test('It should return card token', async () => {

        const response = await cardsService.tokenize(testCard);

        const expected = {
            token: response.token
        }

        expect(response).toMatchObject(expected);

    })

    test('It should get the card for the generated token', async () => {

        const responseTokenize = await cardsService.tokenize(testCard);
        const response = await cardsService.getByToken(responseTokenize.token);

        const expected = {
            card_number: "4970110000001029",
            expiration_month: "10",
            expiration_year: "2022",
            email: "oscar.quiroz@test.com"
        }

        expect(response).toMatchObject(expected);

    })

    test('It Should return null for invalid token', async () => {


        const responseTokenize = await cardsService.tokenize(testCard);

        // First request
        await cardsService.getByToken(responseTokenize.token);

        const response = await cardsService.getByToken(responseTokenize.token);

        expect(response).toBe(null);

    })

})