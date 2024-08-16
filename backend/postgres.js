const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const path = require('path');
const multer = require('multer');
const { spawn } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "identeefi"
});

client.connect();

// Authentication Functions
function createAccount(username, password, role) {
    client.query('INSERT INTO auth (username, password, role) VALUES ($1, $2, $3)', 
        [username, password, role], (err, res) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Data insert successful');
        }
    });
}

function changePassword(username, password) {
    client.query('UPDATE auth SET password = $1 WHERE username = $2', 
        [password, username], (err, res) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Data update successful');
        }
    });
}

// Profile Functions
function createProfile(username, name, description, website, location, image, role) {
    client.query('INSERT INTO profile (username, name, description, website, location, image, role) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [username, name, description, website, location, image, role], (err, res) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Data insert successful');
            }
        });
}

// Product Functions
function addProduct(serialNumber, name, brand) {
    client.query('INSERT INTO product (serialNumber, name, brand) VALUES ($1, $2, $3)', 
        [serialNumber, name, brand], (err, res) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Data insert successful');
            }
        });
}

// Multer configuration for file uploads
const storageProduct = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/product'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const storageProfile = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/profile'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Routes for Authentication
app.get('/authAll', async (req, res) => {
    const data = await client.query('SELECT * FROM auth');
    res.header('Access-Control-Allow-Credentials', true);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.post('/auth/:username/:password', async (req, res) => {
    const { username, password } = req.params;
    const data = await client.query(`SELECT * FROM auth WHERE username = '${username}' AND password = '${password}'`);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.post('/addaccount', (req, res) => {
    const { username, password, role } = req.body;
    createAccount(username, password, role);
    res.send('Data inserted');
});

app.post('/changepsw', (req, res) => {
    const { username, password } = req.body;
    changePassword(username, password);
    res.send('Data updated');
});

// Routes for Profiles
app.get('/profileAll', async (req, res) => {
    const data = await client.query('SELECT * FROM profile');
    res.header('Access-Control-Allow-Credentials', true);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.get('/profile/:username', async (req, res) => {
    const { username } = req.params;
    const data = await client.query(`SELECT * FROM profile WHERE username = '${username}'`);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.post('/addprofile', (req, res) => {
    const { username, name, description, website, location, image, role } = req.body;
    createProfile(username, name, description, website, location, image, role);
    res.send('Data inserted');
});

// Image Upload Routes
app.post('/upload/profile', (req, res) => {
    let upload = multer({ storage: storageProfile }).single('image');
    upload(req, res, (err) => {
        if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }
    });
});

app.post('/upload/product', (req, res) => {
    let upload = multer({ storage: storageProduct }).single('image');
    upload(req, res, (err) => {
        if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }
    });
});

app.get('/file/profile/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, 'public/uploads/profile', fileName);
    res.sendFile(filePath);
});

app.get('/file/product/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, 'public/uploads/product', fileName);
    res.sendFile(filePath);
});

app.get('/product/serialNumber', async (req, res) => {
    const data = await client.query('SELECT serialNumber FROM product');
    res.send(data.rows);
});

// Routes for Products
app.post('/addproduct', (req, res) => {
    const { serialNumber, name, brand } = req.body;
    addProduct(serialNumber, name, brand);
    res.send('Data inserted');
});

// Route for Order Picking
app.post('/picking', (req, res) => {
    const data = req.body;
    const python = spawn('python3', ['order_picking.py', JSON.stringify(data)]);

    let result = '';
    python.stdout.on('data', (data) => {
        result += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error(stderr, data);
    });

    python.on('close', (code) => {
        if (code !== 0) {
            res.status(500).send('Error executing Python script');
            return;
        }
        try {
            res.json(JSON.parse(result));
        } catch (error) {
            console.error('JSON Parsing Error: ${error}');
            res.status(500).send('Error parsing Python script output');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});