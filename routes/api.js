const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = router;

//database connection to localhost
var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'knsession1'
});

db.connect(function(err){
    if(err){
        throw err;
    }
    else{
        console.log("Connected to Kazan Neft Session 1 Database");
    }
});

router.route("/getDepartments").post(function(req, res){
    db.query(`SELECT * FROM departments`, function(err, results){
        res.send(results);
    });
});

router.route("/getAssetGroups").post((req, res)=>{
    db.query(`SELECT * FROM assetgroups`, function(err, results){
        if(err) throw err;
        res.send(results);
    });
});

router.route("/getAssets").post((req,res) =>{
    db.query(`SELECT assets.ID,assets.AssetName, departments.Name as 'DepartmentName', assets.AssetSN, assetgroups.Name as 'AssetGroup' FROM assets 
    JOIN departmentlocations on DepartmentLocationID = departmentlocations.ID
    JOIN departments on departmentlocations.DepartmentID = departments.ID
    JOIN assetgroups on AssetGroupID = assetgroups.ID`, function(err, results){
        if(err) throw err;
        res.send(results);
    });
});


router.route('/getEmployees').post((req, res)=>{

});