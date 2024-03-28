const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const Request = require('./models/Request')
const RequestModel = require("./models/Request")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://admin:Miyuru4302@miyuruapi.imhpf7h.mongodb.net/Leave_System?retryWrites=true&w=majority");


app.post("/login",(req,res)=>{
    const{email,password}=req.body;
    EmployeeModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("the password is incorrect")
            }
        }else {
            res.json("No record existed")
        }
    })
})

app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.get('/notification', (req, res) => {
    EmployeeModel.find()
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
});

//////////////////////////////////////////////////

app.post("/request",(req,res)=>{
    const{name,intake,department,date_out,time_out,date_in,time_in,reason}=req.body;
    Request.create({name: name, intake: intake, department: department, date_out: date_out,time_out:time_out, date_in: date_in,time_in:time_in, reason: reason})
  .then(request => res.json(request))
  .catch(err => res.json(err))
})

app.get('/requestss', (req, res) => {
    RequestModel.find()
        .then(Request => res.json(Request))
        .catch(err => res.json(err));
})

app.listen(3001, ()=>{
    console.log("server is running")
})