import { IError } from '../interfaces/error.interface';
export default class ErrorHelper {

    // Codes
    public static createdCode: number = 201;
    public static successCode: number = 200;
    public static noContentCode: number = 204;
    public static badRequestCode: number = 400;
    public static unathorizedCode: number = 401;
    public static notFoundCode: number = 404;
    public static teapodCode: number = 418;
    public static unprocessableEntityCode: number = 422;
    public static internalErrorCode: number = 500;

    // Messages
    public static unathorizedMessage = "Unauthorized";
    public static tokenNotFoundMessage = "Token not found"
    public static noDataMessage = "No data sent";
    public static notFoundMessage = "Item Not found";
    public static unprocessableEntityMessage = "Unprocessable Entity";
    public static createdMessage = "Successfully created";
    public static updatedMessage = "Successfully updated";

    public static throw(message: string, code: number, errors?: any) {

        let data: IError = {
            message: message
        }

        if (errors) {
            data.errors = errors;
        }

        return {
            statusCode: code,
            body: JSON.stringify(data)
        }

    }

}