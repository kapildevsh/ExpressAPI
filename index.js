
require('dotenv').config();

const DB_URL = process.env.DB_URL;

console.log(DB_URL);


   
    
    const chrome = async()=>{
        const kapil = await studentModel.create({
            first_name:"Sarita",
            last_name:"Dev"
        })
        console.log(kapil);
    }
    const bharat = async()=>{
        const kapildev = await studentModel.find();
        console.log(kapildev);
    }
    const suresh = async()=>{
        const kapildevsh = await studentModel.find({first_name:{$eq:6}});
        console.log(kapildevsh);
    }
    chrome();
    bharat();
    suresh();
