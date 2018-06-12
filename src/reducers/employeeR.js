let initialState = {
    employees: [],
    employee: {}
}

const employeeR = (state = initialState, action) => {
    switch (action.type) {
        case "GETALL":
            return {...state, employees: [...action.data]};
        case "GETONE":
            return {...state, employee: {...action.data}};
        default:
            return state;       
    }
}

export default employeeR;