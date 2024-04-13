const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const Request = require('./models/Request')
const RequestModel = require("./models/Request")
const StudentsModel = require("./models/Students")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://admin:Miyuru4302@miyuruapi.imhpf7h.mongodb.net/Leave_System?retryWrites=true&w=majority");


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json("Email and password are required");
    }

    // First, try to find the user in the EmployeeModel
    EmployeeModel.findOne({ email: email })
        .then(result => {
            if (result instanceof Object) {
                if (result.password === password) {
                    return Promise.resolve("Success");
                } else {
                    return Promise.resolve("Employee: Incorrect password");
                }
            } else {
                // If not found in EmployeeModel, try in StudentsModel
                return StudentsModel.findOne({ email: email });
            }
        })
        .then(result => {
            if (result instanceof Object) { // Check if result is an object (student object)
                if (result.password === password) {
                    return res.json("Success");
                } else {
                    return res.json("Student: Incorrect password");
                }
            } else if (result === "Success" || result === "Employee: Incorrect password") {
                return res.json(result);
            } else {
                return res.json("No record found for both employee and student");
            }
        })
        .catch(err => {
            console.error("Error:", err);
            return res.status(500).json("Internal Server Error");
        });
});


app.post('/register',(req,res)=>{
    StudentsModel.create(req.body)
    .then(students => res.json(students))
    .catch(err => res.json(err))
})


app.get('/notification', (req, res) => {
    EmployeeModel.find()
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
});

//////////////////////////////////////////////////



app.get('/request', (req, res) => {
    RequestModel.find()
        .then(Request => res.json(Request))
        .catch(err => res.json(err));
})

app.post("/request",(req,res)=>{
    const{name,intake,department,date_out,time_out,date_in,time_in,reason,confirmation}=req.body;
    Request.create({name: name, intake: intake, department: department, date_out: date_out,time_out:time_out, date_in: date_in,time_in:time_in, reason: reason , confirmation: confirmation})
  .then(request => res.json(request))
  .catch(err => res.json(err))
})
//update conformation
app.post('/updateConfirmation/:id', (req, res) => {
    const { id } = req.params;
    const { confirmation } = req.body;
  
    // Find the request by ID and update the confirmation status
    RequestModel.findByIdAndUpdate(id, { confirmation: confirmation }, { new: true })
      .then(updatedRequest => {
        if (updatedRequest) {
          res.json(updatedRequest);
        } else {
          res.status(404).json({ message: 'Request not found' });
        }
      })
      .catch(err => {
        console.error('Error updating confirmation status:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
//update rejection
app.post('/updateRejection/:id', (req, res) => {
    const { id } = req.params;
    const { confirmation } = req.body;
  
    // Find the request by ID and update the rejection status
    RequestModel.findByIdAndUpdate(id, { confirmation: confirmation }, { new: true })
      .then(updatedRequest => {
        if (updatedRequest) {
          res.json(updatedRequest);
        } else {
          res.status(404).json({ message: 'Request not found' });
        }
      })
      .catch(err => {
        console.error('Error updating rejection status:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
// Example backend route to handle scanned QR code data
app.post('/scanQR', async (req, res) => {
    try {
        const { name, intake, department, message } = req.body;

        // Update the request message in the database
        const updatedRequest = await RequestModel.findOneAndUpdate(
            { name, intake, department },
            { msg: message },
            { new: true }
        );

        if (updatedRequest) {
            res.status(200).json({ message: 'Request updated successfully' });
        } else {
            res.status(404).json({ error: 'Request not found' });
        }
    } catch (error) {
        console.error('Error updating request:', error);
        res.status(500).json({ error: 'Failed to update request' });
    }
});



app.listen(3001, ()=>{
    console.log("server is running")
})