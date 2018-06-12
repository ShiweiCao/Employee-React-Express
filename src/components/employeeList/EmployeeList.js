import React, { Component } from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as actions from '../../actions/actionCreator.js'
import Tablerow from './Tablerow'

class EmployeeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchid : [],
        }
    }

    componentDidMount = () => {
        this.props.dispatch(actions.getAllEmps());
    }   

    showSubordinate = (subordinates) => {
        this.setState({
            searchid : subordinates
        })
    }

    reset = () => {
        this.setState({
            searchid: [],
        })
    }

    render() {
        return (
            <div className="container" style={{width: "1500px"}}>
                <div style={{width: "50%", float: "left", textAlign: "center"}}>
                    <h1>Employee Table </h1>
                </div>

                <div style={{width: "50%", float: "right", margin: "25px auto"}}>
                    <Button variant="raised" > Add New </Button>
                    <Button variant="raised" color="secondary" onClick={this.reset} style={{margin: "10px"}}> Reset </Button>
                </div>

                <div className="empTable">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Avatar </TableCell>
                                <TableCell> Name </TableCell>
                                <TableCell> Phone </TableCell>
                                <TableCell> Email </TableCell>
                                <TableCell> Manager </TableCell>
                                <TableCell> Numbers of Subordinates </TableCell>
                                <TableCell> Delete </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.searchid.length === 0 &&                                
                                this.props.employees.map((element, index) => (
                                    <Tablerow emp={element} key={index} showSubordinate={this.showSubordinate}/>
                                ))
                            }

                            {
                                this.state.searchid.length > 0 &&
                                this.props.employees.filter( each => this.state.searchid.includes(each._id)).map((element, index) => (
                                    <Tablerow emp={element} key={index} showSubordinate={this.showSubordinate}/>
                                ))
                            }
                        </TableBody>
                    </Table>

                </div>

            </div>
            
        )
    }
}


const mapStateToProps = (state) => {
    return {
        employees : state.employeeR.employees,
    }
}

export default connect(mapStateToProps)(EmployeeList);