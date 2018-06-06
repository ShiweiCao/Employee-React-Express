import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import './App.css';

import EmployeeList from './components/employeeList/EmployeeList.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Route path="/" exact={true} component={EmployeeList} />
                    </div>
                </BrowserRouter>                                                
            </div>
            
        );
    }
}

export default App;
