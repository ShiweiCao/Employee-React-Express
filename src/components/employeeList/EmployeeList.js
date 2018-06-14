import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel  from '@material-ui/core/TableSortLabel';

import * as actions from '../../actions/actionCreator.js'
import Tablerow from './Tablerow'


class EmployeeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchid : [],
            managerid: "",
            sort_id: "",
            order : "asc",
        }
    }

    componentDidMount = () => {
        this.props.dispatch(actions.getAllEmps());
    }   

    showSubordinate = (subordinates) => {
        this.setState({
            searchid : subordinates,
            managerid: "",
        })
    }

    showManager = (manager_id) => {
        this.setState({
            managerid: manager_id,
            searchid : [],
        })
    }

    reset = () => {
        this.setState({
            searchid: [],
            managerid: "",
            sort_id: "",
        })
    }

    clearEmp = () => {
        this.props.dispatch(actions.clearEmp())
    }

    sort = (tar) => {
        this.setState({
            sort_id: tar,
            order : this.state.order === "asc"? "desc": "asc",
        })
    }

    delete = (id) => {
        this.props.dispatch(actions.deleteEmp(id));
    }

    render() {
        return (
            <div className="container" style={{width: "1300px", margin: "auto"}}>
                <div style={{width: "50%", float: "left", textAlign: "center"}}>
                    <h1>Employee Table </h1>
                </div>

                <div style={{width: "50%", float: "right", margin: "25px auto"}}>
                    <Link to='/employee'><Button variant="raised" color="primary" onClick={this.clearEmp}> Add New </Button></Link>
                    <Button variant="raised" color="secondary" onClick={this.reset} style={{margin: "10px"}}> Reset </Button>
                </div>

                <div className="empTable">
                    <Table style={{textAlign: "center"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell> Avatar </TableCell>

                                <TableCell key="name"> 
                                    <TableSortLabel onClick = { () => this.sort("name") }
                                        active = {this.state.sort_id === "name"}
                                        direction = {this.state.order}
                                    >
                                    Name
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell key="phone" > 
                                    <TableSortLabel onClick = { () => this.sort("phone") }
                                        active = {this.state.sort_id === "phone"}
                                        direction = {this.state.order}
                                    >
                                    Phone
                                    </TableSortLabel>
                                </TableCell>

                                
                                <TableCell key="email" > 
                                    <TableSortLabel onClick = { () => this.sort("email") }
                                        active = {this.state.sort_id === "email"}
                                        direction = {this.state.order}
                                    >
                                    E-Mail
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell> Manager </TableCell>
                                <TableCell> Numbers of Subordinates </TableCell>
                                <TableCell> Delete </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.searchid.length === 0 && this.state.managerid === "" && this.state.sort_id === "" &&
                                this.props.employees.map((element, index) => (
                                    <Tablerow emp={element} key={index} onDel={this.delete} showSubordinate={this.showSubordinate} showManager={this.showManager}/>
                                ))
                            }

                            {
                                this.state.searchid.length === 0 && this.state.managerid === "" && this.state.sort_id !== "" &&
                                this.props.employees.sort( (a,b) => (
                                    this.state.order === "asc" ? (a[this.state.sort_id].localeCompare(b[this.state.sort_id])) : 
                                                                 (b[this.state.sort_id].localeCompare(a[this.state.sort_id]))
                                )).map((element, index) => (
                                    <Tablerow emp={element} key={index} onDel={this.delete} showSubordinate={this.showSubordinate} showManager={this.showManager}/>
                                ))
                            }

                            {
                                this.state.searchid.length > 0 &&
                                this.props.employees.filter( each => this.state.searchid.includes(each._id) ).map((element, index) => (
                                    <Tablerow emp={element} key={index} onDel={this.delete} showSubordinate={this.showSubordinate} showManager={this.showManager} />
                                ))
                            }

                            {
                                this.state.managerid !== "" && 
                                this.props.employees.filter( each => this.state.managerid === each._id).map((element, index) => (
                                    <Tablerow emp={element} key={index} onDel={this.delete} showSubordinate={this.showSubordinate} showManager={this.showManager} />
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