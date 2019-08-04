export class Helper {
    static getElement(id) {
        return document.getElementById(id);
    }

    static removeErrorText(elem) {
        if (elem.nextSibling != null) {
            elem.nextSibling.remove();
        }
    }

    static createErrorSpan(text) {
        const span = document.createElement('span');
        span.classList.add('error');
        span.innerText = text;
        return span;
    }

    static addErrorText(elem, text) {
        const span = this.createErrorSpan(text);
        if (elem.nextSibling == null) {
            elem.insertAdjacentElement('afterend', span);
        } else if (elem.nextSibling.innerHTML !== text) {
            elem.nextSibling.innerHTML = text;
        }
    }
}
