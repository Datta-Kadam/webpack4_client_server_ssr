import {renderComponent, expect} from '../test_helper';
import Request from '../../src/components/Request';

describe('Request Component',()=>{   
    let component;
    beforeEach(()=>{
        component=renderComponent(Request);
    });
    it('has a textarea',()=>{       
        expect(component.find('textarea')).to.exist;
    });
    it('has a Request label',()=>{      
        expect(component).to.contain('Request');
    });

    it('to have id "request"',()=>{       
        expect(component.find('#request')).to.have.id('request');
    })

    it('to have class "form-group"',()=>{        
        expect(component).to.have.class('form-group');
    })
});
