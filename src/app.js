const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get('/get_ques', (req, res) => {
    const filePath = path.join(__dirname, '../public/question.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send('Error reading the file');
        }
        res.header("Content-Type", "application/json");
        res.send(data);
    });
});
app.listen(PORT, ()=>{
    console.log(`Server is started at PORT ${PORT}`);
});