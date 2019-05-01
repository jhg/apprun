import app from '../src/apprun';
import { replace } from '../src/vdom-my';


describe('vdom-my', () => {
  let element;
  beforeAll(() => {
    document.body.insertAdjacentHTML('afterbegin', `<!--_1_0-->
    <div></div>
    <!--_1_1-->`)
  })

  it('should create HTML comment', () => {
    const view = () => <><comment text='_1_0' /><comment text='_1_1' /></>;
    app.render(document.body, view());
    expect(document.body.innerHTML).toBe('<!--_1_0--><!--_1_1-->');
  });


  it('should replace single element', () => {
    const view = () => <img/>;
    replace('_1', view());
    expect(document.getElementsByTagName('div').length).toBe(0);
    expect(document.getElementsByTagName('img').length).toBe(1);
  });


  it('should replace multiple element', () => {
    const view = () => <>
      <li><a></a></li>
      <li><a></a></li>
    </>;
    replace('_1', view());
    expect(document.getElementsByTagName('div').length).toBe(0);
    expect(document.getElementsByTagName('li').length).toBe(2);
  });

})