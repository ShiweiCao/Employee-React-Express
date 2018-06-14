const axios = require('axios');

//---------------thunk-----------------
export const getAllEmps = () => {
    return(dispatch => {
        axios.get("http://localhost:8888/employees/")
            .then(res => {
                let emps = res.data;
                dispatch(updateEmps(emps));

                let newEmps = [...emps];
                emps.map((emp, index) => {
                    if(emp.manager_id !== ""){
                        axios.get("http://localhost:8888/employees/" + emp.manager_id)
                            .then(res => {
                                newEmps[index] = { ...newEmps[index], managername : res.data.name };
                                dispatch(updateEmps(newEmps));
                            })
                            .catch(err => console.log(err))
                    }
                })
            })
            .catch(err => console.log(err));
    })
}

export const getOne = (id) => {
    return(dispatch => {
        axios.get("http://localhost:8888/employees/" + id)
            .then(res => {
                let emp = res.data;
                dispatch(updateEmp(emp));
            })
            .catch(err => console.log(err));
    })
}

export const saveEmp = (emp) => {

    if(emp._id !== undefined){        
        return(dispatch => {
            axios.put("http://localhost:8888/employees/" + emp._id, emp)
                .then(window.location = '/')
                .catch(err => console.log(err))
        })
    } else {
        return(dispatch => {
            axios.post("http://localhost:8888/employees/", emp)
                .then(window.location = '/')
                .catch(err => console.log(err));
        })
    }
    
}


//----------------------------------------

const updateEmps = (emps) => {
    return ({
        type: "GETALL",
        data: emps,
    })
}

const updateEmp = (emp) => {    
    return ({
        type: "GETONE",
        data: emp,
    })
}

export const onChangeEmp = (value, target) => {
    return ({
        type: "CHANGE",
        value: value,
        target: target,
    })
}

export const clearEmp = () => {
    return ({
        type: "CLEAREMP",
    })
}

