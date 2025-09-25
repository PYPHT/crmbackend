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
            .input("imageproflie", sql.VarBinary, req.file.buffer)
            .input("status", sql.Int, status)
            .input("type", sql.Int, type)
            .input("depart", sql.Int, department)
            .input("createtime", sql.VarChar, createtime)
            .input("logintime", sql.VarChar, logintime)
            .query(`
        INSERT INTO admins (username, password, fname, lname, email, phone, imageproflie, status, type, depart, createtime, logintime)
        VALUES (@username, @password, @fname, @lname, @email, @phone, @imageproflie, @status, @type, @depart, @createtime, @logintime)
      `);

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send("Upload error");
    }
})

app.post("/getadmins", async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig)

        const result = await pool.request()
            .query(`SELECT *, CAST(imageproflie AS VARBINARY(MAX)) AS imageprofile_bin FROM admins`);

        const admins = result.recordset.map(admin => {
            let imageBase64 = null;
            if (admin.imageprofile_bin) {
                imageBase64 = Buffer.from(admin.imageprofile_bin).toString('base64')
            }

            return {
                ...admin,
                imageUrl: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : null
            }
        })

        res.status(200).json(admins)
    } catch (error) {
        console.error("DB Error:", error)
        res.status(500).json({ error: "Database query failed" })
    }
})


app.post("/getdepartment", async (req, res) => {
    const departID = req.body.id
    try {
        const pool = await sql.connect(dbConfig)
        if (departID != null) {
            const result = await pool.request()
                .input("id", sql.Int, departID)
                .query(`SELECT department FROM department WHERE id = @id `)
            res.status(200).json(result.recordset)
        } else {
            const result = await pool.request()
                .query(`SELECT * FROM department`)
            res.status(200).json(result.recordset)
        }
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
})

app.listen(5001, () => {
    console.log('Server running on port 5001');
})