import { APIGatewayProxyEventBase, APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';
import { Validator } from 'node-input-validator';
import CardHelper from '../helpers/Card.helper';
import ErrorHelper from '../helpers/Error.helper';

export default class TokenizeCardValidator {

    static async exec(event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<any> {

        if (!event.body) {
            return ErrorHelper.throw(ErrorHelper.noDataMessage, ErrorHelper.noContentCode);
        }

        const body = JSON.parse(event.body);

        const validate = new Validator(body,
            {
                card_number: ['required', 'minLength:13', 'maxLength:16'],
                cvv: "required|numeric|minLength:3|maxLength:4",
                expiration_month: "required|minLength:1|maxLength:2|min:1|max:12",
                expiration_year: "required|minLength:4|maxLength:4",
                email: "required|minLength:5|maxLength:100|email"
            }
        );

        let matched = await validate.check();

        if (!CardHelper.validate(body.card_number)) {
            matched = false;
            validate.errors.credit_card = {
                message: "The card number is invalid",
                rule: "Invalid format"
            }
        }

        if (!matched) {
            return ErrorHelper.throw(ErrorHelper.unprocessableEntityMessage, ErrorHelper.unprocessableEntityCode, validate.errors);
        }

        return {
            success: true,
            data: body
        }

    }

}