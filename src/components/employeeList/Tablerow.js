import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import empAvatar from '../../img/avatar.png'

export default class Tablerow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let telstr = "tel:" + this.props.emp.phone;
        let emailstr = "Mailto:" + this.props.emp.email;
        let url = "/employee/" + this.props.emp._id;

        return (
            <TableRow hover>
                <TableCell> <img src={empAvatar} alt="avatar" width="50px" /> </TableCell>
                <TableCell> <Link to={url}> {this.props.emp.name} </Link> </TableCell>
                <TableCell> <a href={telstr}>{this.props.emp.phone}</a> </TableCell>
                <TableCell> <a href={emailstr}>{this.props.emp.email}</a> </TableCell>
                {
                    this.props.emp.manager_id !== undefined && <TableCell style={{textDecoration: "underline", color:"blue"}} onClick={ () => this.props.showManager(this.props.emp.manager_id) }> {this.props.emp.managername} </TableCell>
                }

                {
                    this.props.emp.manager_id === undefined && <TableCell> No Manager </TableCell>
                }
                
                {
                    this.props.emp.subordinate.length > 0 &&

                    <TableCell 
                    onClick={ () => this.props.showSubordinate(this.props.emp.subordinate)}
                    style={{textDecoration: "underline", color:"blue"}}
                    > {this.props.emp.subordinate.length} 
                    </TableCell>
                }

                {
                    this.props.emp.subordinate.length === 0 &&
                    <TableCell> 0 </TableCell>
                }
                <TableCell> <Button onClick={() => this.props.onDel(this.props.emp._id)} color="secondary" variant="fab"><DeleteIcon /></Button> </TableCell>
                
            </TableRow>
        )
    }
}