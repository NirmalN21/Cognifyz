import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

const users = [];

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/register", (req, res) => {
    res.render("register")
});

app.post('/register', (req, res) => {
    try {
        const { email, name, password, cpassword } = req.body;

        if (!email || !name || !password || !cpassword) {
            res.status(400).json({ Error: "Please fill all the details" });
        } else {
            if (password !== cpassword) {
                res.status(400).json({ Error: "Passwords dont match" });
            } else {
                users.push({ name, email, password });
                res.status(201).redirect('/login');;
            }
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get("/login", (req, res) => {
    res.render("login")
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ Error: "Please fill all the details" });
        } else {
            const user = users.find(user => user.email === email);
            if (!user) {
                res.status(404).json({ Error: "User not found" });
            } else {
                if (user.password === password) {
                    res.send(user);
                } else {
                    res.status(400).json({ Error: "Invalid username or password" });
                }
            }
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get("/userDetails", (req, res) => {
    const { user } = req.query;
    const userData = JSON.parse(user);
    res.render("userDetails", { user: userData, users: users });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
