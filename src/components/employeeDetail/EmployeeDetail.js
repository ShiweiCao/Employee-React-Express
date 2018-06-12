import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import empAvatar from '../../img/avatar.png'
import * as actions from '../../actions/actionCreator'


class employeeDetail extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        let url = window.location.pathname;
        this.props.dispatch(actions.getAllEmps());
        if(url !== "/employee"){
            console.log(url.slice(10));
            this.props.dispatch(actions.getOne(url.slice(10)));
        }        
    }

    handleChange = (e, tar) => {
        this.props.dispatch(actions.onChangeEmp(e.target.value, tar))
    }

    render() {
        
        
        return (
            <div className="container" style={{width: "600px", margin: "auto"}}>
                <h1 style={{width: "600px", textAlign: "center"}}> Employee Detail </h1>
                <div style={{width: "100px", margin: "50px auto"}}>
                    <img src={empAvatar} alt="avatar" width="100px" />
                </div>

                <div style={{width: "200px", margin: "50px auto"}}>
                    Name:<br/><Input onChange={ (e) => this.handleChange(e, "name") } value={this.props.employee.name}/><br/><br/>
                    Phone:<br/><Input onChange={ (e) => this.handleChange(e, "phone") }value={this.props.employee.phone}/><br/><br/>
                    E-mail:<br/><Input onChange={ (e) => this.handleChange(e, "email") }value={this.props.employee.email}/><br/><br/>
                    <TextField select label="Manager" style={{width: "200px"}}>
                        {
                            this.props.employees.map((element, index) => (
                                <option key={index} value={element.name}> {element.name} </option>
                            ))
                        }
                    </TextField>  
                    <br/><br/>
                    <Button variant="raised" color="primary"> Save </Button>
                    <Link to='/'><Button variant="raised" color="secondary" style={{margin: "10px"}}> Cancel </Button></Link>
                                  
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employeeR.employees,
        employee : state.employeeR.employee,
    }
}

export default connect(mapStateToProps)(employeeDetail);