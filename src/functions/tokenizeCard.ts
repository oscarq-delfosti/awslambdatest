import middy from '@middy/core'

import { APIGatewayProxyHandler } from 'aws-lambda';
import { APIGatewayProxyEventBase, APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';
import AccessKeyMiddleware from '../middlewares/accessKey.middleware';

import TokenizeCardValidator from '../validators/tokenizeCard.validator';
import { CardsService } from '../services/cards.service';
import { ICard } from '../interfaces/card.interface';
import Database from '../database/database';

export const exec: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {

    const validate = await TokenizeCardValidator.exec(event);

    if (!validate.success) {
        return validate
    }

    const cardsService = new CardsService(Database.getConnection());

    const card: ICard = {
        email: validate.data.email,
        card_number: validate.data.card_number,
        cvv: validate.data.cvv,
        expiration_month: validate.data.expiration_month,
        expiration_year: validate.data.expiration_year
    };

    const response = await cardsService.tokenize(card);

    return {
        statusCode: 200,
        body: JSON.stringify({ data: response })
    }

}).before(async (request) => {
    return AccessKeyMiddleware.validate(request.event.headers);
})

