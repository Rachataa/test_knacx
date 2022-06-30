const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());
// coneection db

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'covid_19',
    port: '3306'
})

connection.connect((err) => {
    if (err) {
        console.log('Error connection :', err);
        return;
    }
    console.log("Connect Success");
})

//create
app.post("/create", (req, res) => {
    const { firstname, lastname, address } = req.body;
    try {
        connection.query("INSERT INTO users(firstname, lastname, address) VALUES(?, ?, ?)",
            [firstname, lastname, address],
            (err, results, fields) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "Add new user success" });
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//read 
app.get("/read", (req, res) => {
    try {
        connection.query("SELECT * FROM users", (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//read from id
app.get("/read/:id", (req, res) => {
    const id = req.params.id;
    try {
        connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//update
app.patch("/update/:id", (req, res) => {

    const id = req.params.id;
    console.log(id);
    const newaddress = req.body.newaddress;

    try {
        connection.query("UPDATE users SET address = ? WHERE id = ?", [newaddress, id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "User update success" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//delete
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    try {
        connection.query("DELETE FROM users WHERE id =?", [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ message: "No user" });
            }
            res.status(200).json({ message: "Delete success" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.listen(3000, () => console.log("server is running on port 3000"));