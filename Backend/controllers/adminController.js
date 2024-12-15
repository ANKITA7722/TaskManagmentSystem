const adminModel = require("../models/adminModel");


const adminDataCheck=async(req,res)=>{
    const {user,password}=req.body;
    // console.log(user,password);
    const Admin =await adminModel.find({user:user});
    if(Admin.length<1)
    {
        res.status(404).send({msg:"Invalid Username!"})
    }
    else
    {
        if(Admin[0].password!=password)
        {
            res.status(404).send({msg:"Invalid Passord!"});
        }
        else
        {
            res.status(200).send(Admin)
        }
    }
}

module.exports={
   adminDataCheck 
}