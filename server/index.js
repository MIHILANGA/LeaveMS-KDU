const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require('multer');
const path = require('path');
const EmployeeModel = require('./models/Employee')
const Request = require('./models/Request')
const RequestModel = require("./models/Request")
const StudentsModel = require("./models/Students")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://admin:Miyuru4302@miyuruapi.imhpf7h.mongodb.net/Leave_System?retryWrites=true&w=majority");


// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:Miyuru4302@miyuruapi.imhpf7h.mongodb.net/Leave_System?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define Schema and Model for file data
const fileSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
});
const File = mongoose.model('File', fileSchema);

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename uploaded files with a timestamp
  },
});
const upload = multer({ storage: storage });

// API endpoint to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { filename, path: filepath } = req.file;
    const newFile = new File({ filename, filepath });
    await newFile.save();
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});

// API endpoint to fetch uploaded images
app.get('/images', async (req, res) => {
  try {
    // Fetch all files from the database
    const files = await File.find({}, 'filename filepath');

    // Send the filenames and filepaths as a response
    res.status(200).json(files);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

////////////////////////////////////////////////
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
    const{name,intake,department,date_out,time_out,date_in,time_in,reason,confirmation,Rdate_out,Rtime_out,Rdate_in,Rtime_in}=req.body;
    Request.create({name: name, intake: intake, department: department, date_out: date_out,time_out:time_out, date_in: date_in,time_in:time_in, reason: reason , confirmation: confirmation, Rdate_out: Rdate_out,Rtime_out:Rtime_out, Rdate_in: Rdate_in,Rtime_in:Rtime_in,})
  .then(request => res.json(request))
  .catch(err => res.json(err))
})

app.delete('/deleteRequest/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    // Find and delete the request by ID
    const deletedRequest = await Request.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
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
  app.post('/updateRequest/:id', (req, res) => {
    const { id } = req.params;
    const { Rdate_out, Rtime_out, Rdate_in, Rtime_in } = req.body;

    // Update the request in the database
    RequestModel.findByIdAndUpdate(id, {
        Rdate_out,
        Rtime_out,
        Rdate_in,
        Rtime_in
    }, { new: true })
    .then(updatedRequest => {
        if (updatedRequest) {
            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    })
    .catch(err => {
        console.error('Error updating request:', err);
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