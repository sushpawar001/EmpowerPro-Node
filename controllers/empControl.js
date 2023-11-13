const express = require('express');
const path = require('path');
const router = express.Router();
const empModel = require('../models/employee');

const getAllemp = async (req, res) => {
    // to get  all employees
    const allEmp = await empModel.find({});
    res.render('home', {
        'title': 'Employees',
        'emps': allEmp
    });
}

const getEmp = async (req, res) => {
    // to get one employee
    try {
        const id = req.params.empId;
        const employee = await empModel.findById(id);

        if (!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            message: 'Single employee',
            empId: id,
            employee: employee
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const createEmpPage = (req, res) => {
    res.render('create_emp', { title: 'Create Emp', showAlert: false });
}

const createEmp = async (req, res) => {
    // to create a new employee
    const { name, email, salary } = req.body;
    const employee = await empModel.create({ 'name': name, 'email': email, 'salary': salary });
    res.render('create_emp', { title: 'Create Emp', showAlert: true, employee: employee });
}

const delEmp = async (req, res) => {
    // to delete employee
    const id = req.params.empId;
    const employee = await empModel.findByIdAndDelete(id);
    res.redirect('/employee/');
}

const editEmp = async (req, res) => {
    // to update employee
    const { name, email, salary } = req.body;
    const id = req.params.empId;
    const employee = await empModel.findByIdAndUpdate(id, { name: name, email: email, salary: salary });

    res.redirect('/employee/');
}

const editEmpPage = async (req, res) => {
    const id = req.params.empId;
    const employee = await empModel.findById(id);
    res.render('update_emp', { 'emp': employee, title: 'Edit Employee' });
};

module.exports = {
    getAllemp,
    getEmp,
    createEmp,
    delEmp,
    editEmp,
    createEmpPage,
    editEmpPage
};