import React, { Component } from 'react';
import {connect} from 'react-redux';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/markdown/markdown.js';
import checkXMLResponseStructure from '../components/commonComponents/XmlParser';
import './Response.css';

class Response extends Component {  

    constructor(props) {
        super(props);
        this.state = {
            validResponse: false
        };
    }
    //using componentDidMount() only one instance on codemirror wouuld be created and preserved
    componentDidMount() {  
         //   debugger;   
          this.responseEditor = CodeMirror.fromTextArea(document.getElementById('response'), {			
                theme: 'eclipse',
                lineNumbers: true			
            });
            this.responseEditor.on('change', () => {	
                this.responseEditor.save();
                this.responseValue = this.responseEditor.getValue();     
              if (checkXMLResponseStructure(this.responseEditor.getValue().trim())) {
                    this.setState({ validResponse: true });
                } else {
                   this.setState({ validResponse: false });
                }       
                this.props.onResponseChange(this.responseEditor.getValue());				
            });      
            //debugger;
    } 
    
    componentWillReceiveProps(nextProps) {
        //console.log('sdfsdf',this.props.defaultRes);
      //  debugger
        if (nextProps.defaultRes) {
          //  this.responseEditor.off('change');
            this.responseEditor.setValue(nextProps.defaultRes);
           // this.responseEditor.on('change');
        }
      //  debugger
    }

    render() {  
       // console.log(this);            
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="response">Response:</label>
                    <textarea 
                        onChange={this.handleChange}
                        ref={(input) => (this.responseValue = input)} 
                        /*onChange={this.handleChange.bind(this,event)}*/
                        className="form-control"
                        id="response"
                    />
                </div>
                <div>
                    { (this.state.validResponse) 
                        ? ('Valid Response Xml') : ('Invalid Response Xml') }
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        defaultRes: state.fetchReducer.defaultRes,
        count: state.fetchReducer.count
    };
}

export default connect(mapStateToProps)(Response);

