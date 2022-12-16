import { DynamoDB } from 'aws-sdk';

export default class Database {
    static getConnection() {
        return new DynamoDB.DocumentClient({
            region: "sa-east-1",
        });
    }
}