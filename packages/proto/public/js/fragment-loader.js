export function addFragment(htmlString, container) {
    const doc = this.parser.parseFromString(htmlString, "text/html");
    const fragment = Array.from(doc.body.childNodes);
    container.append(...fragment);
}