export default class ObjectHelper {

    static isEmpty(obj: any) {
        return Object.keys(obj).length === 0;
    }

}