import { randomBytes } from 'crypto'
import DateHelper from './Date.helper'

export default class TokenHelper {

    static validKeys: Array<string> = [
        'pk_test_1decadd68caeec55',
        'pk_test_0352b66ce8df6f71',
        'pk_test_dd3b29cdbc8f483a',
        'pk_test_c2ab29d62e3335b8'
    ]

    static randomToken() {
        return randomBytes(8).toString('hex');
    }

    static generate() {
        return this.randomToken();
    }

    static generatePkKey() {

        const prefix = 'pk_test_';
        const token = this.randomToken();

        const pkKey = prefix + token;

        return pkKey;

    }

    static isExpired(date: string) {

        const recordTime = new Date(date);
        const currentTime = new Date(DateHelper.currentDateTime());

        const minutesApart = ((currentTime.getTime() - recordTime.getTime()) / 1000) / 60;

        return minutesApart > 15 ? true : false;
    }

}