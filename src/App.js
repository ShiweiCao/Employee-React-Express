import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import './App.css';

import EmployeeList from './components/employeeList/EmployeeList.js'
import EmployeeDetail from './components/employeeDetail/EmployeeDetail.js'

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
                        <Route path="/employee/:emp_id" component={EmployeeDetail} />
                    </div>
                </BrowserRouter>                                                
            </div>
            
        );
    }
}

export default App;
