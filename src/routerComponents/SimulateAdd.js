import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import * as actions from '../actions/index';
import Request from '../components/Request';
import Response from '../components/Response';
import '../css/simulate_form.css';


class SimulateForm extends Component {
        //get the initial state from the db for release list
        //call the redux store with action to get the initial state from backend
        
        componentWillMount() {
           // debugger;
            this.props.getReleaseData();
          //  debugger;
        }

        onResponseChange(updatedResponse) {
            this.response = updatedResponse;         
        }      

        onRequestChange(updatedRequest) {
            this.request = updatedRequest;
        }
        handleReleaseChange(event) {
            //console.log(event.target.value);
            //get the project names for the selected release
            this.props.getProjectData(event.target.value);
        }

        handleProjectChange(event) {
            // console.log(event.target.value);
             //get the project names for the selected release
             this.props.getApiData(event.target.value);
        }

        handleAPIChange(event) {
           // debugger;
            this.props.getDefaultPair(this.releaseValue.value,
                this.projectValue.value, event.target.value);
          //  debugger;
         }
          
  /*      
        validRequest(validity) {
           //  debugger;
             if (validity) {
                if (validity.validRequest) {
                    this.setState({ validRequest: validity.validRequest });
                }
                this.setState({ validRequest: validity.validRequest });
              } 
           // debugger;
        }

        validResponse(validity) {
            debugger;
            //console.log('Simulate_form_Logging',Object.keys(validity).length);
            if (validity) {
                if (validity.validResponse) {
                    this.setState({ validResponse: validity.validResponse });
                }
                this.setState({ validResponse: validity.validResponse });
             }
             debugger;
        }*/

        handleSubmit(event) {
            event.preventDefault();
             const formData = {
                    release: this.releaseValue.value,
                    projectName: this.projectValue.value,
                    apiName: this.apiValue.value,
                    request: this.request,
                    response: this.response,
                    userId: cookie.load('userId')
                };
            this.props.simulateSubmit(formData);
         }

          
        renderReleaseData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.relData) {
             return this.props.relData.map(function (release) {                    
                return (<option inputRef={(ref) => { this.selectInput = ref; }} key={release} value={release}>{release}</option>);
                });
            }
        }

        renderProjectData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.projData) {
             return this.props.projData.map((project) =>                     
                    (<option key={project} value={project}>{project}</option>)
                );
            }
        }

        renderApiData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.apiData) {
             return this.props.apiData.map((api) =>                    
                    (<option key={api} value={api}>{api}</option>)
                );
            }
        } 
    
        render() {
            //console.log('from simulate form render method',cookie.loadAll())
            return (
            <form className='submitForm' onSubmit={this.handleSubmit.bind(this)}>
            <Row>
            <Col xs={4}>
                <div className="form-group">
                        <label htmlFor="select">Release:</label>
                        <select                         
                            className="form-control" 
                            id="release" 
                            ref={(input) => (this.releaseValue = input)}
                            onChange={this.handleReleaseChange.bind(this)}
                        >
                        <option value="Release">--Select Release --</option>
                            {this.renderReleaseData()}
                        </select>
                        
                </div>
                </Col>
                <Col xs={4}>
                <div className="form-group">
                        <label htmlFor="select">Project:</label>                      
                        <select 
                            className="form-control" id="project"
                            ref={(input) => (this.projectValue = input)}
                            onChange={this.handleProjectChange.bind(this)}
                        >
                            <option value="Project">--Select Project --</option>
                            {this.renderProjectData()}
                        </select>
                </div>
                </Col>
                <Col xs={4}>
                <div className="form-group">
                        <label htmlFor="api">API:</label>
                        <select 
                            className="form-control" id="api"
                            ref={(input) => (this.apiValue = input)}
                            onChange={this.handleAPIChange.bind(this)}
                        >
                            <option value="Release">--Select API --</option>
                            {this.renderApiData()}
                        </select>                        
                </div>
                </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Request 
                            onRequestChange={this.onRequestChange.bind(this)}
                        />
                    </Col>
                    <Col xs={6}>
                        <Response 
                            onResponseChange={this.onResponseChange.bind(this)}
                           
                        />
                    </Col>
                </Row>
                <Row>                    
                    <Col xs={6}>
                    <div className="form-group">
                        <button 
                            className="form-control" 
                            type="submit" 
                            className="btn btn-primary mb-2"
                        >
                        Simulate
                        </button>
                    </div>
                    </Col>
                </Row>
            </form>
            );
        }
}

function mapStateToProps(state) {
    return {
        relData: state.fetchReducer.release,
        projData: state.fetchReducer.project,
        apiData: state.fetchReducer.api
    };
}

export default connect(mapStateToProps, actions)(SimulateForm);
