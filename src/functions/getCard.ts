import middy from '@middy/core'

import { APIGatewayProxyHandler } from 'aws-lambda';
import { APIGatewayProxyEventBase, APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';

import FindCardValidator from '../validators/findCard.validator';
import { CardsService } from '../services/cards.service';
import AccessKeyMiddleware from '../middlewares/accessKey.middleware';
import ErrorHelper from '../helpers/Error.helper';
import Database from '../database/database';

export const exec: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {

    const validate = await FindCardValidator.exec(event);

    if (!validate.success) {
        return validate;
    }

    const cardsService = new CardsService(Database.getConnection());

    const response = await cardsService.getByToken(validate.data.token);

    if (!response) {
        return ErrorHelper.throw(ErrorHelper.notFoundMessage, ErrorHelper.notFoundCode);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ data: response })
    }

}).before(async (request) => {
    return AccessKeyMiddleware.validate(request.event.headers);
})

