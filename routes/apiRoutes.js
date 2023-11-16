const express = require('express');
const apiRouter = express.Router();
const empModel = require('../models/employee');
const { verifyToken } = require('../middleware/authCheck');

apiRouter.get('/', async (req, res) => {
    const employees = await empModel.find({});
    // console.log(employees);
    res.json(employees);
});

apiRouter.post('/add', async (req, res) => {
    const { name, email, salary } = req.body;
    const employee = await empModel.create({ name, email, salary });
    res.json(employee);
});

apiRouter.put('/:id', async (req, res) => {
    const empid = req.params.id;
    try {
        const oldEmpData = await empModel.findById(empid);
        if (oldEmpData) {
            const { name, email, salary } = req.body;
            const employee = await empModel.findByIdAndUpdate(empid, { name, email, salary });
            res.json(employee);
        } else {
            res.json({ 'message': 'Wrong ID' });
        }
    } catch (error) {
        console.log(error);
        res.json({ 'message': 'Invalid Request' });
    }
});

apiRouter.delete('/:id', async (req, res) => {
    const empid = req.params.id;
    try {
        const employee = await empModel.findById(empid);
        if (employee) {
            const employeeDeleted = await empModel.findByIdAndDelete(empid);
            res.json({ 'message': 'employee deleted', 'employee': employeeDeleted });
        } else {
            res.json({ 'message': 'Wrong ID' });
        }
    } catch (error) {
        console.log(error);
        res.json({ 'message': 'Invalid Request' });
    }
})

module.exports = apiRouter;