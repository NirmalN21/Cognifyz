import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index")
})

const users={};

app.post('/submit', (req, res) => {
    const email = req.body.email;
    users["email"] = email;
    const password = req.body.password;
    users["password"] = password;
    res.redirect(`/userDetails?email=${email}&password=${password}`);
});

app.get("/userDetails", (req, res) => {
    res.render("userDetails",{user:users})
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
