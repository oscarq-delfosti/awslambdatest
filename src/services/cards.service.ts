import { ICard } from '../interfaces/card.interface';
import Database from '../database/database';
import Token from '../helpers/Token.helper';
import DateHelper from '../helpers/Date.helper';
import TokenHelper from '../helpers/Token.helper';
import ObjectHelper from '../helpers/Object.helper';
import { DynamoDB } from 'aws-sdk';

export class CardsService {

    private db: DynamoDB.DocumentClient;
    private tableName: string;

    constructor(db: DynamoDB.DocumentClient) {
        this.db = db;
        this.tableName = 'CardTable';
    }

    async tokenize(card: ICard) {

        const createdAt = DateHelper.currentDateTime();

        const newCard = {
            id: Token.generate(),
            card_number: card.card_number,
            used: false,
            cvv: card.cvv,
            expiration_month: card.expiration_month,
            expiration_year: card.expiration_year,
            email: card.email,
            created_at: createdAt
        }

        await this.db.put({
            TableName: this.tableName,
            Item: newCard
        }).promise();

        const data = {
            token: newCard.id
        }

        return data;
    }

    async getByToken(token: string) {

        const result = await this.db.get({
            TableName: this.tableName,
            Key: {
                id: token
            }
        }).promise();

        if (ObjectHelper.isEmpty(result.Item)) {
            return null;
        }

        if (result.Item) {

            const item = result.Item;

            if (TokenHelper.isExpired(item.created_at) || item.used) {
                return null;
            }
        }

        await this.invalidateCard(token);

        let card: ICard = {
            email: result.Item!.email,
            card_number: result.Item!.card_number,
            expiration_year: result.Item!.expiration_year,
            expiration_month: result.Item!.expiration_month
        };

        return card
    }

    async invalidateCard(token: string) {

        const params = {
            TableName: this.tableName,
            Key: {
                "id": token
            },
            UpdateExpression: "set used = :used",
            ExpressionAttributeValues: {
                ":used": true,
            }
        };

        await this.db.update(params).promise();

    }

}