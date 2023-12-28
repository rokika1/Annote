export default class Remove{
    doAction(text) {
        return text.replace( /(<([^>]+)>)/ig, '');
    }
}
