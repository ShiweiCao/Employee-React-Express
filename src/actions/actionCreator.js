const axios = require('axios');

//---------------thunk-----------------
export const getAllEmps = () => {
    return(dispatch => {
        axios.get("http://localhost:8888/employees/")
            .then(res => {
                let emp = res.data;
                dispatch(updateEmp(emp));
            })
            .catch(err => console.log(err));
    })
}


//----------------------------------------

const updateEmp = (emp) => {
    return ({
        type: "GET",
        data: emp,
    })
}