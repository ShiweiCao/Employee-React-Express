let initialState = {
    employees: [],
}

const employeeR = (state = initialState, action) => {
    switch (action.type) {
        case "GET":
            return {...state, employees: [...action.data]};
        default:
            return state;       
    }
}

export default employeeR;