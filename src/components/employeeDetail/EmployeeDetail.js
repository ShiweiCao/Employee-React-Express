import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import empAvatar from '../../img/avatar.png'


export default class employeeDetail extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container" style={{width: "600px", margin: "auto"}}>
                <h1 style={{width: "600px", textAlign: "center"}}> Employee Detail </h1>
                <div style={{width: "100px", margin: "50px auto"}}>
                    <img src={empAvatar} width="100px" />
                </div>

                <div style={{width: "200px", margin: "50px auto"}}>
                    <TextField label="Name"/><br/><br/>
                    <TextField label="Phone"/><br/><br/>
                    <TextField label="E-mail"/><br/><br/>
                    <TextField select label="Manager" style={{width: "200px"}}>
                        <option key="0" value="Wolf's Dragoons">Wolf's Dragoons</option>
                        <option key="1" value="MK2">MK2</option>
                    </TextField>  
                    <br/><br/>
                    <Button variant="raised" color="primary"> Save </Button>
                    <Link to='/'><Button variant="raised" color="secondary" style={{margin: "10px"}}> Cancel </Button></Link>
                                  
                </div>

            </div>
        )
    }
}