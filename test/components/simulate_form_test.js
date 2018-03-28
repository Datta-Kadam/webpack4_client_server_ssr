import { renderComponent, expect } from '../test_helper';
import simulate_form from '../../src/components/simulate_form';


describe('Simulate_form compoenent', () => {
    let component;
    beforeEach(() => {
       // let dispatch = sinon.spy();
        //let subject = shallow(<Layout movies={movies} dispatch={dispatch} />);
        debugger;
        const state={release:['1802','1804']};
        component = renderComponent(simulate_form);
        
       // expect(dispatch.calledWith(expectedAction)).to.be.true;
    });

    //check if components exists like request/response component
  it('shows the request Component', () => {
        
        //console.log('HHHRERHEHREHRHE',component.find('#release').html());
        expect(component).to.exist;
        //console.log(component);
    });

    //test the release selection/project selection/api selection
  
    describe('selects release from dropdown', () => {
        beforeEach(() => {
            component.find('#release').append('<option value="1707">1707</option>');
        });

        it('shows the project list with 1707 projects', () => {
          expect(component.find('#release').simulate('change','1707'));
         console.log('GGGGGGGGGGGGGG',component.find('#project').val('1707_project2'));
          expect(component.find('#project')).to.be.eql(['Project','1707_project2']);
        });
    });
});