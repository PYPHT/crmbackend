const express = require("express")
const multer = require("multer")
const sql = require("mssql")

const app = express();
const upload = multer();

const dbConfig = {
    user: "pyph",
    password: "Panyatle191943",
    server: "PYPHDEV\\SQLEXPRESS",
    database: "CRM",
    options: { encrypt: false },
};

app.post("/insertadmins", upload.single("image"), async (req, res) => {
    const { username, password, fname, lname, email, phone, status, type, depart, createtime, logintime } = req.body;
    try {
        const pool = await sql.connect(dbConfig);

        await pool.request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .input("fname", sql.VarChar, fname)
            .input("lname", sql.VarChar, lname)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .input("imageprofile", sql.VarBinary, req.file.buffer)
            .input("status", sql.Int, status)
            .input("type", sql.Int, type)
            .input("depart", sql.Int, depart)
            .input("createtime", sql.VarChar, createtime)
            .input("logintime", sql.VarChar, logintime)
            .query(`
        INSERT INTO admins (username, password, fname, lname, email, phone, imageprofile, status, type, depart, createtime, logintime)
        VALUES (@username, @password, @fname, @lname, @email, @phone, @imageprofile, @status, @type, @depart, @createtime, @logintime)
      `);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send("Upload error");
    }
})

app.post("/getadmins", async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig)

        const result = await pool.request()
            .query(`SELECT * FROM admins`)

        res.json(result.recordset)
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
})

app.listen(5001, () => {
    console.log('Server running on port 5001');
})