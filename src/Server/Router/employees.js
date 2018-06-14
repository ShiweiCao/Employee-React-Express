const express = require('express');
const router = express.Router();

const Employee = require('../Model/employee');

router.get('/', (req, res) => {
    Employee.find((err, data) => {
        if(err) {
            res.status(500).send("Cannot find:" + err);
        } else {
            res.status(200).json(data);
        }
    }) 
})


router.get('/:emp_id', (req, res) =>{
    Employee.findById(req.params.emp_id, (err, data) => {
        if(err) {
            res.status(500).send("Cannot find:" + err);
        }
        res.status(200).json(data);
    });
})

router.post('/', (req, res) => {
    var emp = new Employee();
    emp.name = req.body.name;
    emp.phone = req.body.phone;
    emp.email = req.body.email;
    emp.manager_id = req.body.manager_id;
    emp.subordinate = [];

    emp.save( err => {
        if(err) {
            res.status(500).send("Cannot create:" + err);
        } 
        // res.status(201).json({"Employee created" : emp});
    });

    Employee.findById(emp.manager_id, (err, manager) => {
        if(err) {
            res.status(500).send(err);
        }
        manager.subordinate.push(emp._id)
        manager.save(err => {
            if(err) {
                res.status(500).send("Cannot update relationship")
            }
            res.status(201).json({"Employee created" : emp})
        })
    })
});

router.put('/:emp_id', (req,res) => {
    var newManager_id = req.body.manager_id;
    var oldManager_id = "";
    var objID = {...req.body._id};

    Employee.findById(req.params.emp_id, (err, emp) => {        
        if(err) {
            res.status(500).send(err);
        } else {
            oldManager_id = emp.manager_id;

            emp._id = req.body._id;
            emp.name = req.body.name;
            emp.phone = req.body.phone;
            emp.email = req.body.email;
            emp.manager_id = req.body.manager_id;
            emp.subordinate = req.body.subordinate;
            emp.save(err => {
                if(err) {
                    res.status(500).send('Failed to save:' + err);
                }
            })
        }
    })

    // update old manager
    if(oldManager_id != undefined && oldManager_id != "") {
        Employee.findById(oldManager_id, (err, manager) => {
            if(err) {
                res.status(500).send('Failed to update relationship ' + err)
            }

            var deleteID = -1;
            manager.subordinate.map((element, index) => {
                if (element === objID){
                    deleteID = index;
                }
            })

            if(deleteID >=0){
                manager.subordinate.splice(deleteID, 1);
            }
            // manager.subordinate = manager.subordinate.filter( element => element !== objID)
            manager.save(err => {
                if(err) {
                    res.status(500).send('Failed to update:' + err);
                }
                res.status(200).send('Employee updated!')
            })
        })
    }

    //update new manager
    if(newManager_id != undefined && newManager_id != "") {
        Employee.findById(newManager_id, (err, manager) => {
            if(err) {
                res.status(500).send('Failed to update relationship ' + err)
            }
            manager.subordinate.push(objID);
            manager.save(err => {
                if(err) {
                    res.status(500).send('Failed to update:' + err);
                }
                res.status(200).send('Employee updated!')
            })
        })
    }
})

router.delete('/:emp_id', (req,res) => {

    Employee.findById(req.params.emp_id, (err, emp) => {
        if(err) {
            res.status(500).send('Failed to find')
        }
        let subordinate_id = [...emp.subordinate];       
        let manager_id = emp.manager_id;
        let objID = emp._id;
        

        // Deal with Manager
        Employee.findById(manager_id, (err, manager) => {
            if(err) {
                res.status(500).send('Failed to find')
            }
            var deleteID = -1;
            manager.subordinate.map((element, index) => {
                if (element.toString() === objID.toString()){
                    deleteID = index;
                }
            })

            if(deleteID >=0){
                manager.subordinate.splice(deleteID, 1);
            }

            manager.save(err => {
                if(err) {
                    res.status(500).send('Failed to update:' + err);
                }
                // res.status(200).send('Employee deleted!')
            })        
        })

        //Deal with subordinate
        subordinate_id.map((element, index) => {
            Employee.findById(element, (err, sub) => {
                delete sub.manager_id;

                sub.save(err => {
                    if(err) {
                        res.status(500).send('Failed to update:' + err);
                    }
                    // res.status(200).send('Employee deleted!')
                }) 
            })
        })
        
        Employee.remove({
            _id : req.params.emp_id
        }, (err, emp) => {
            if(err) {
                res.status(500).send(err);
            }
            res.status(200).json({'Employee deleted!': req.params.emp_id});
        })
    })

    

    
})

module.exports = router;