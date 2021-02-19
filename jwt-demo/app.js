const app = require("express")();
const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser')

// create application/json parser
app.use(bodyParser.json())
const SECRET_KEY = "my_super_secret_key";
let user = { email: 'vmurali100@gmail.com', password: '1234' }

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});
app.get("/api", (req, res) => {
    res.send({ status: "OPEN_API" })
})

app.post("/login", (req, res) => {
    console.log(user)
    console.log(req.body)
    if (JSON.stringify(user) == JSON.stringify(req.body)) {
        const token = jwt.sign(user, SECRET_KEY);
        res.send({
            status: "LOGGED_IN",
            token: token
        })
    } else {
        res.send({
            status: "Invalid Login",
        })
    }

})

const ensureToken = (req, res, next) => {
    console.log(req.headers)
    const bearerToken = req.headers['authorization'];
    if (bearerToken !== undefined) {
        const tokenArray = bearerToken.split(" ");
        const token = tokenArray[1];
        req.token = token;
        next();
    } else {
        res.send({
            status: "TOKEN_NOT_AVAILABLE"
        })
    }
}
app.get("/api/dashboard", ensureToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, decode) => {
        if (err) {
            return res.send({ status: "UNAUTHORIZED" })
        }
        if (decode.id) {
            return res.send({
                status: "AUTHORIZED"
            })
        }
    })
})

app.listen(9090, () => { console.log("Server started") })