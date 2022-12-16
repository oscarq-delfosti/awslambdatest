
export default class DateHelper {

    static currentDateTime() {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();

        let currentDateTime = `${year}-${month}-${day} ${hour}:${minutes}`;

        return currentDateTime;
    }

    static fakeCurrentDateTime(min: number) {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();

        let currentDateTime = `${year}-${month}-${day} ${hour}:${minutes - min}`;

        return currentDateTime;
    }

}