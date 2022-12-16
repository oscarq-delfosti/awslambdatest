import { APIGatewayProxyEvent } from 'aws-lambda'
import TokenHelper from '../helpers/Token.helper';
import ErrorHelper from '../helpers/Error.helper';

export default class AccessKeyMiddleware {

    static validate(headers: any) {

        if (!headers.authorization) {
            return ErrorHelper.throw(ErrorHelper.tokenNotFoundMessage, ErrorHelper.unathorizedCode);
        }

        const token = headers.authorization.split(" ")[1];

        const valid = TokenHelper.validKeys.findIndex((item) => item == token)

        if (valid === -1) {
            return ErrorHelper.throw(ErrorHelper.unathorizedMessage, ErrorHelper.unathorizedCode);
        }

    }

}