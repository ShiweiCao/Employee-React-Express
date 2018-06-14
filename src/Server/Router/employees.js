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
        res.status(201).json({"Employee created" : emp});
    });
});

router.put('/:emp_id', (req,res) => {
    Employee.findById(req.params.emp_id, (err, emp) => {
        
        if(err) {
            res.status(500).send(err);
        } else {
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
                res.status(200).json({'Employee updated!' : emp})
            })
        }
    })
})

router.delete('/:emp_id', (req,res) => {
    Employee.remove({
        _id : req.params.emp_id
    }, (err, emp) => {
        if(err) {
            res.status(500).send(err);
        }
        res.status(200).json({'Employee deleted!': req.params.emp_id});
    })
})

module.exports = router;