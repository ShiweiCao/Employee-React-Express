let initialState = {
    employees: [],
    employee: {allSub: []}
}

const employeeR = (state = initialState, action) => {
    switch (action.type) {
        case "GETALL":
            return {...state, employees: [...action.data]};

        case "GETONE":{
            if(action.data.subordinate.length !== 0){
                let stack = [...action.data.subordinate];
                let res = [];
                res.push(action.data._id);

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
                return {...state, employee: {...action.data, allSub: [action.data._id]}};
            }
        }            
            
        case "CHANGE": {
            let obj = {...state.employee};
            obj[action.target] = action.value;
            return {...state, employee: obj}
        }

        case "SORT": {
            let emps = [...state.employees];
            if(action.order === "asc"){
                emps.sort((a,b) => (
                    a[action.target][0]-b[action.target][0]
                ))
            } else {
                emps.sort((a,b) => b[action.target][0]-a[action.target][0])
            }            
            console.log(emps);
            return {...state, employees: emps}
        }

        case "CLEAREMP": 
            return {...state, employee: { name:"", phone:"", email:"", manager_id:"", subordinate:[], allSub:[]}}
        default:
            return state;
    }
}

export default employeeR;