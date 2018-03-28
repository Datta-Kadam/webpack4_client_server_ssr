import React, { Component } from 'react';
import { connect } from 'react-redux';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/markdown/markdown.js';
import checkXMLRequestStructure from '../components/commonComponents/XmlParser';
import './Request.css';

class Request extends Component {

    constructor(props) {
        super(props);
        this.state = {
         validRequest: false
        };       
    }
   // debugger;;
    componentDidMount() {      
      //  debugger;
        this.requestEditor = CodeMirror.fromTextArea(document.getElementById('request'), {			
            theme: 'eclipse',
            lineNumbers: true			
        });

        this.requestEditor.on('change', value => {
         // debugger;
            console.log(value);
            this.requestEditor.save();
            this.requestValue = this.requestEditor.getValue();
         // debugger;
          if (checkXMLRequestStructure(this.requestEditor.getValue().trim())) {
                this.setState({ validRequest: true });
            } else {
                this.setState({ validRequest: false });
            } 
           //    debugger;
            this.props.onRequestChange(this.requestEditor.getValue());				
        });    
    }
    
    componentWillReceiveProps(nextProps) {
      //  debugger;
        if (nextProps.defaultReq) {
            //to avoid looping and stack overflow
         //   this.requestEditor.off('change');
           this.requestEditor.setValue(nextProps.defaultReq);
          // this.requestEditor.on('change');
        }
       // debugger;
    }
    render() {             
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="request">Request:</label>
                    <textarea
                    ref={(input1) => (this.requestValue = input1)} 
                    className="form-control" 
                    id="request" 
                    />
                </div>
                <div>
                    { (this.state.validRequest) ? 
                        ('Valid Request Xml') : ('Invalid Request Xml') }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        defaultReq: state.fetchReducer.defaultReq,
        count: state.fetchReducer.count
    };
}

export default connect(mapStateToProps)(Request);

