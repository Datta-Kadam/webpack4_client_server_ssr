import { renderComponent, expect } from '../test_helper';
import Header from '../../src/components/header';



//Use describe to group togather similar tests
describe('Header Component', () => {

  const component = renderComponent(Header);
  //Use 'it' to test a single attribute of the target
  it('shows the correct navbar Add_Request-Response', () => {
    //create an instance of app
    //Use 'expect' to make an 'assertion' about the target
   // console.log('check expect(component) output = > ',component);
    expect(component).to.contain('Add_Request-Response');
  });

  it('shows the correct navbar Update_Request-response', () => {
    expect(component).to.contain('Update_Request-response');
  });

  it('shows the correct navbar Projects-UrlDetails', () => {
    expect(component).to.contain('Projects-UrlDetails');
  });

  it('shows the correct navbar MyRequests', () => {
    expect(component).to.contain('MyRequests');
  });  

});

