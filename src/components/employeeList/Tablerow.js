import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

export default class Tablerow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let telstr = "tel:" + this.props.emp.phone;
        let emailstr = "Mailto:" + this.props.emp.email;
        let url = "/employee/" + this.props.emp._id;

        return (
            <TableRow>
                <TableCell> {this.props.emp.avatar} </TableCell>
                <TableCell> <Link to={url}> {this.props.emp.name} </Link> </TableCell>
                <TableCell> <a href={telstr}>{this.props.emp.phone}</a> </TableCell>
                <TableCell> <a href={emailstr}>{this.props.emp.email}</a> </TableCell>
                <TableCell> {this.props.emp.manager_id} </TableCell>
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
                
            </TableRow>
        )
    }
}