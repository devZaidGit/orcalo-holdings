const Sequelize = require('sequelize');
const op = Sequelize.Op;
const { Organization } = require('../models');
const fs = require("fs");
const csvtojson = require('csvtojson');

// csv = fs.readFileSync("organization-data.csv")
async function createRecordService(data) {

    // CSV file name
    const fileName = "organization-data.csv";
  
    await csvtojson().fromFile(fileName).then(source => {


    let myDataArray = [];

    for (var i = 0; i < source.length; i++) {
        
        console.log('1111', source[i]["Organization Id"])
        myDataArray.push({
            organization_id: source[i]["Organization Id"],
            name: source[i]["Name"],
            website: source[i]["Website"],
            country: source[i]["Country"],
            founded: source[i]["Founded"],
            industry: source[i]["Industry"],
            no_of_employees:source[i]["Number of employees"],
        })

    }

    Organization.bulkCreate(myDataArray);

    });
      
}

async function getRecordService(queryParams) {

const { page_no, record, organization_id, name, website, country,founded, industry, no_of_employees } = queryParams;

let page = page_no - 1;


let where = {};

if(organization_id){
    where = {
        ...where,
        organization_id
    }
}

if(name){
    where = {
        ...where,
        name
    }
}

if(country){
    where = {
        ...where,
        country
    }
}

if(founded){
    where = {
        ...where,
        founded
    }
}

if(industry){
    where = {
        ...where,
        industry
    }
}

if(no_of_employees){
    where = {
        ...where,
        no_of_employees
    }
}

    let orgsData = await Organization.findAll({
        limit: parseInt(record),
        offset: parseInt(page * record),
        where: { ...where },
      });

      return orgsData 
      
}


module.exports = {
    createRecordService,
    getRecordService

}