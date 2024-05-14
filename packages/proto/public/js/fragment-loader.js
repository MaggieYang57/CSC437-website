const parser = new DOMParser();

export function addFragment(htmlString, container) {
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = Array.from(doc.body.childNodes);

  container.append(...fragment);
}