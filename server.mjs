// Note: Sign Up Screen Back-End...!

// Note: Importing required API's...!
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

// Note: Users bucket...!
let users = [];

app.use(express.json());
app.use(cors());
app.use(morgan("short"));

// Note: This function is accepting a request...!
app.use((req, res, next) => {
    console.log('A request came: ', req.body);
    next();
});

// Note: This is a root path...!
app.get("/", (req, res) => {
    res.send('This is the back-End of Sign Up Web App!');
});

// Note: This function will send all user bucket as a response...!
app.get("/users", (req, res) => {
    res.send(users);
});

// Note: This function will add user in users bucket...!
app.post('/user', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send('Invalid Data!');
    }

    else {
        users.push({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        res.send("User Created!");
    }
});

// Note: This function will delete user from the users bucket...!
app.post('/user/delete', (req, res) => {
    users.map((element, i) => {
        if (element.email == req.body.email) users.splice(i, 1);
    });
    console.log("Users: ", users);
    res.send(users);
});

// Note: Running the app...!
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});
