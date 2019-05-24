import app, { html } from '../src/apprun-html';

const model = 'y';
const view = _ => {
  switch (_) {
    case 'a':
      return html`<div>${_}</div><div>2</div><div>3</div>`
    default:
      return html`\n <div>${_}</div>`

  }
}

const update = {
  hi: (_, val) => val
}

describe('vdom-html', () => {

  let element;
  beforeEach(() => {
    element = document.createElement('div');
    app.start(element, model, view as any, update);
  });

  it('should support lit-html', () => {
    app.run('hi', 'a');
    expect(element.children.length).toEqual(3);
    app.run('hi', 'b');
    expect(element.children.length).toEqual(1);
  });

});
