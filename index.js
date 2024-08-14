const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./configurations/dbConnect");
const cors = require('cors');
const userRoute = require('./Routes/userRoute');
const handleError = require("./Middlewares/userErrorHandler/errorHandler");
const cookieParser = require("cookie-parser");
const certGenRoute = require('./Routes/certGenRoute');
const studentRoute = require('./Routes/studentRoute');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const expressfileUpload = require("express-fileupload");
dbConnect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressfileUpload());
const corsOptions = {
  AccessControlAllowOrigin: "http://localhost:3000/",
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};


 app.use(cors(corsOptions));


app.use('/api/user', userRoute);

app.use("/api/certGen", certGenRoute);
app.use("/api/student", studentRoute);

app.use(handleError);
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT} `);
});
