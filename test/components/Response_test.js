import {renderComponent, expect} from '../test_helper';
import Response from '../../src/components/Response';

describe('Response Component',()=>{  
    let component;
    beforeEach(()=>{
        component=renderComponent(Response);
    }) ; 
    it('has a textarea',()=>{        
        expect(component.find('textarea')).to.exist;
    });
    it('has a Request label',()=>{
        expect(component).to.contain('Response');
    });

    it('to have id "request"',()=>{
        expect(component.find('#response')).to.have.id('response');
    });

    it('to have class "form-group"',()=>{
        expect(component).to.have.class('form-group');
    });
});
