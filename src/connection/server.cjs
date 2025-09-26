const express = require("express")
const multer = require("multer")
const sql = require("mssql")
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

const dbConfig = {
    user: "pyph",
    password: "Panyatle191943",
    server: "PYPHDEV\\SQLEXPRESS",
    database: "CRM",
    options: { encrypt: false },
};

app.post("/insertadmins", upload.single("image"), async (req, res) => {
    const { username, password, fname, lname, email, phone, status, type, department, createtime, logintime } = req.body;
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
            .input("depart", sql.Int, department)
            .input("createtime", sql.VarChar, createtime)
            .input("logintime", sql.VarChar, logintime)
            .query(`
        INSERT INTO admins (username, password, fname, lname, email, phone, imageprofile, status, type, depart, createtime, logintime)
        VALUES (@username, @password, @fname, @lname, @email, @phone, @imageprofile, @status, @type, @depart, @createtime, @logintime)
      `);

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send("Upload error");
    }
})

app.post("/editadmins", upload.single("image"), async (req, res) => {
    const { username, password, fname, lname, email, phone, status, type, department, id } = req.body;
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
            .input("depart", sql.Int, department)
            .input("id", sql.Int, id)
            .query(`
        UPDATE admins
        SET 
            username = @username,
            password = @password,
            fname = @fname,
            lname = @lname,
            email = @email,
            phone = @phone,
            imageprofile = @imageprofile,
            status = @status,
            type = @type,
            depart = @depart
        WHERE id = @id
    `)

        res.status(200).json({ success: true })
    } catch (error) {
        console.error(err);
        res.status(500).send("Upload error");
    }
})

app.post("/getadmins", async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig)
        const result = await pool.request()
            .query(`
        SELECT a.*, d.department AS departmentName
        FROM admins a
        INNER JOIN department d ON a.depart = d.id
      `)

        const admins = result.recordset.map(row => {
            if (row.imageprofile && Buffer.isBuffer(row.imageprofile)) {
                row.imageUrl = `data:image/jpeg;base64,${Buffer.from(row.imageprofile).toString("base64")}`
            } else {
                row.imageUrl = null
            }
            return row
        });

        res.status(200).json(admins)
    } catch (error) {
        console.error("DB Error:", error)
        res.status(500).json({ error: "Database query failed" })
    }
})

app.post("/getdepartment", async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig)
        const result = await pool.request()
            .query(`SELECT * FROM department`)
        res.status(200).json(result.recordset)
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
})

app.listen(5001, () => {
    console.log('Server running on port 5001');
})