import { APIGatewayProxyEventBase, APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';
import { Validator } from 'node-input-validator';
import ErrorHelper from '../helpers/Error.helper';

export default class FindCardValidator {

    static async exec(event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>): Promise<any> {

        if (!event.pathParameters) {
            return ErrorHelper.throw(ErrorHelper.noDataMessage, ErrorHelper.noContentCode);
        }

        const body = event.pathParameters;

        const validate = new Validator(body,
            {
                token: "required|minLength:16|maxLength:16",
            }
        );

        const matched = await validate.check();

        if (!matched) {
            return ErrorHelper.throw(ErrorHelper.unprocessableEntityMessage, ErrorHelper.unprocessableEntityCode, validate.errors);
        }

        return {
            success: true,
            data: body
        }

    }

}