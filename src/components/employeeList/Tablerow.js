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
        return (
            <TableRow>
                <TableCell> {this.props.emp.avatar} </TableCell>
                <TableCell> {this.props.emp.name} </TableCell>
                <TableCell> {this.props.emp.phone} </TableCell>
                <TableCell> {this.props.emp.email} </TableCell>
                <TableCell> {this.props.emp.manager} </TableCell>
                <TableCell> {this.props.emp.subordinate.length} </TableCell>
            </TableRow>
        )
    }
}