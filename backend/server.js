const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dims"
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.get("/selected", (req, res) => {
    const sql = "SELECT * FROM `drugs`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ message: "Server error" });
        return res.json(data);
    });
});
app.get("/selecteddrugs", (req, res) => {
    const sql = "SELECT * FROM `ndsodrugs`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ message: "Server error" });
        return res.json(data);
    });
});
app.get("/orders", (req, res) => {
    const sql = "SELECT * FROM `orders`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ message: "Server error" });
        return res.json(data);
    });
});

app.post("/create_drug", (req, res) => {
    const sql = "INSERT INTO `drugs`(`sno`, `drug_name`, `category`, `quantity`, `brand_name`, `drug_dosage`, `description`, `manufacturer`, `manufactured_date`, `expiry_date`,`price`) VALUES (?)";
    const values = [
        req.body.sno,
        req.body.drug_name,
        req.body.category,
        req.body.quantity,
        req.body.brand_name,
        req.body.drug_dosage,
        req.body.description,
        req.body.manufacturer,
        req.body.manufactured_date,
        req.body.expiry_date,
        req.body.price,
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Drug created", id: data.insertId });
    });
});
app.post("/ndsocreate_drug", (req, res) => {
    const sql = "INSERT INTO `ndsodrugs`(`sno`, `drug_name`, `category`, `quantity`, `brand_name`, `drug_dosage`, `description`, `manufacturer`, `manufactured_date`, `expiry_date`,`price`) VALUES (?)";
    const values = [
        req.body.sno,
        req.body.drug_name,
        req.body.category,
        req.body.quantity,
        req.body.brand_name,
        req.body.drug_dosage,
        req.body.description,
        req.body.manufacturer,
        req.body.manufactured_date,
        req.body.expiry_date,
        req.body.price,
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Drug created", id: data.insertId });
    });
});
app.post("/create_pharmacist", (req, res) => {
    const sql = "INSERT INTO `pharmacyregistration`(`PharmacyName`, `PharmacyAddress`, `Email`, `Password`, `PhoneNumber`) VALUES (?)";
    const values = [
        req.body.pharmacyName,
        req.body.pharmacyAddress,
        req.body.email,
        req.body.password,
        req.body.phoneNumber
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Reigisteration successful...", id: data.insertId });
    });
});
app.post("/create_ndso", (req, res) => {
    const sql = "INSERT INTO `ndsoregistration`(`FullName`, `Email`, `phone_number`, `Password`) VALUES (?)";
    const values = [
        req.body.fullName,
        req.body.email,
        req.body.phoneNumber,
        req.body.password
        
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Reigisteration successful...", id: data.insertId });
    });
});
app.get("/login", (req, res) => {
    const sql = "SELECT * FROM `pharmacyregistration` WHERE `Email` = ? &&  `Password` = ?";

    db.query(sql, [req.body.username,req.body.password], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "login successful...", id: data.insertId });
    });
});

app.get("/loginndso", (req, res) => {
    const sql = "SELECT * FROM `ndsoregistration` WHERE `Email` = ? &&  `Password` = ?";

    db.query(sql, [req.body.username,req.body.password], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "login successful...", id: data.insertId });
    });
});

app.put("/update_drug/:id", (req, res) => {
    const sql = "UPDATE `drugs` SET `sno`=?, `drug_name`=?, `category`=?, `quantity`=?, `brand_name`=?, `drug_dosage`=?, `description`=?, `manufacturer`=?, `manufactured_date`=?, `expiry_date`=?, `price`=? WHERE `id`=?";
    const values = [
        req.body.sno,
        req.body.drug_name,
        req.body.category,
        req.body.quantity,
        req.body.brand_name,
        req.body.drug_dosage,
        req.body.description,
        req.body.manufacturer,
        req.body.manufactured_date,
        req.body.expiry_date,
        req.body.price,
        req.params.id
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "Drug not found" });
        return res.json({ message: "Drug updated" });
    });
});

app.delete('/delete_drug/:id', (req, res) => {
    const sql = "DELETE FROM `drugs` WHERE `id`=?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: "Drug not found" });
        return res.json({ message: "Drug deleted" });
    });
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
