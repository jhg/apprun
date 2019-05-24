import { createElement, updateElement, Fragment } from './vdom-my';
// tslint:disable-next-line:no-implicit-dependencies
import morphdom from 'morphdom';
// tslint:disable-next-line:no-implicit-dependencies
import { render, TemplateResult } from 'lit-html';

function update(element, html, parent?) {
  if (typeof html === 'string') {
    html = html.trim();
    if (element.firstChild) {
      const el = element.cloneNode(false);
      el.innerHTML = html;
      morphdom(element, el);
    } else {
      element.innerHTML = html;
    }
  } else if (html instanceof TemplateResult) {
    render(html, element);
  } else {
    updateElement(element, html, parent);
  }
}
export { createElement, Fragment, update as render };

