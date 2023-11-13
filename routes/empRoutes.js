const express = require('express');
const path = require('path');
const router = express.Router();
const empModel = require('../models/employee');
const empControl = require('../controllers/empControl');
const { verifyToken } = require('../middleware/authCheck');


router.get('/create', verifyToken, empControl.createEmpPage);

router.post('/delete/:empId', verifyToken, empControl.delEmp);

router.get('/', verifyToken, empControl.getAllemp)

router.get('/:empId', verifyToken, empControl.getEmp);

router.post('/', verifyToken, empControl.createEmp);

router.get('/edit/:empId', verifyToken, empControl.editEmpPage);
router.post('/edit/:empId', verifyToken, empControl.editEmp);

module.exports = router