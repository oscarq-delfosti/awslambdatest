export default class CardHelper {

    static validate(number: string) {

        return number.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/) ? true : false;

    }

}