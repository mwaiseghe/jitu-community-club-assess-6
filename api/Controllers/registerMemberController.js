const mssql = require('mssql');
const {v4} = require('uuid');
const { sqlConfig } = require('../Config/Config');


const registerMember = async (req, res) => {
    try{
        const {first_name, last_name, email, 
                phone_number, gender, cohort_number,
                description
            } = req.body;

        const id = v4();

        // validate the data
        if(!first_name || !last_name || !email || !phone_number || !gender || !cohort_number || !description){
            return res.status(400).json({
                message: "Please fill in all fields"
            })
        }

        // check if the email in the format first_name.last_name@thejitu.com
        const emailRegex = new RegExp(`^${
            first_name.toLowerCase()}.${last_name.toLowerCase()}@thejitu.com$`);
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Email must be in the format: fname.lname@thejitu.com"
            })
        }

        const pool = await mssql.connect(sqlConfig);

        // check if the email already exists
        const email_exists_query = await pool.request()
            .input('email', mssql.VarChar(255), email)
            .execute('getMemberByEmailProc');
        
        if (email_exists_query.recordset.length > 0){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const request = await pool.request()
            .input('id', mssql.VarChar(255), id)
            .input('first_name', mssql.VarChar(255), first_name)
            .input('last_name', mssql.VarChar(255), last_name)
            .input('email', mssql.VarChar(255), email)
            .input('phone_number', mssql.VarChar(255), phone_number)
            .input('gender', mssql.VarChar(255), gender)
            .input('cohort_number', mssql.Int(255), cohort_number)
            .input('description', mssql.VarChar(255), description)
            .execute('registerMemberProc');

        if(request.rowsAffected[0] > 0){
            return res.status(200).json({
                message: "Member registered successfully"
            })
        }
    }catch(error){
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

module.exports = {
    registerMember
}



