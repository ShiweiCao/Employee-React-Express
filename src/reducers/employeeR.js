let initialState = {
    employees: [],
    employee: {allSub: []}
}

const employeeR = (state = initialState, action) => {
    switch (action.type) {
        case "GETALL":
            return {...state, employees: [...action.data]};

        case "GETONE":{
            let res = [];
            res.push(action.data._id);

            if(action.data.subordinate.length !== 0){
                let stack = [...action.data.subordinate];


                while(stack.length !== 0) {
                    let cur_id = stack.pop();
                    res.push(cur_id);
                    let cur = state.employees.find(element => (element._id === cur_id));
                    if(cur.subordinate.length !== 0){
                        stack.push(...cur.subordinate); 
                    }
                                       
                }
                return {...state, employee: {...action.data, allSub: [...res]}};
            } else {
                return {...state, employee: {...action.data, allSub: []}};
            }
        }            
            
        case "CHANGE": {
            let obj = {...state.employee};
            obj[action.target] = action.value;
            return {...state, employee: obj}
        }
        case "CLEAREMP": 
            return {...state, employee: {_id:"", name:"", phone:"", email:"", manager_id:"", subordinate:[], allSub:[]}}
        default:
            return state;
    }
}

export default employeeR;