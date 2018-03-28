import {expect} from '../test_helper';
import reducer from '../../src/reducers/reducer';
import {GET_RELEASE} from '../../src/actions/types';


describe('Reducer',()=>{
    it('handles actions with unknown types',()=>{
        expect(reducer({},{})).to.be.instanceOf(Object);
        console.log("here w ego ",reducer({},{type:"UNKNOWN_ACTION"}));
       // expect(reducer()).to.be.eql({});
    });

    it('GET_RELEASE',()=>{
        const action={type:GET_RELEASE,payload:1802};
        expect(reducer({},action).release).to.be.eql(1802);
    });

    it('GET_RELEASE Multple releases',()=>{
        const action={type:GET_RELEASE,payload:[1802,1804,1902]};
        expect(reducer({},action).release).to.be.eql([1802,1804,1902]);
    });
})