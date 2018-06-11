import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class Tablerow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let telstr = "tel:" + this.props.phone;
        let emailstr = "Mailto:" + this.props.email;

        return (
            <TableRow>
                <TableCell> {this.props.emp.avatar} </TableCell>
                <TableCell> {this.props.emp.name} </TableCell>
                <TableCell> <a href={telstr}>{this.props.emp.phone}</a> </TableCell>
                <TableCell> <a href={emailstr}>{this.props.emp.email}</a> </TableCell>
                <TableCell> {this.props.emp.manager_id} </TableCell>
                <TableCell> {this.props.emp.subordinate.length} </TableCell>
            </TableRow>
        )
    }
}