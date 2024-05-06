const express = require('express');
const router = express.Router();
const redis = require('../redis')
const {getTodoCount}=require('../util/middleware')

router.get('/', async (req, res)=>{
    result = await getTodoCount()
    res.json({'added_todos': result})
})

module.exports = router;