export default class Highlight {
    doAction(text, colour) {
        return <mark style={{backgroundColor: colour}}>{text}</mark>;
    }
}