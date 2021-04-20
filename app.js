import config from "./config/config";
import express from "express"; // This is to include ExpressJs Library in the nodejs.
import bluebird from "bluebird";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import userRoutes from "./api/routes/user.route";





//sendSms("Test Message", "9004550925");
let app = new express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// app.use(busboyBodyParser({ limit: "500mb" }));


app.use(cors());
app.use(flash())
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}))
app.use("/assets", express.static(__dirname + '/assets'));

mongoose.Promise = bluebird;
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to DB successfully!');
    }
});
mongoose.set('debug', false);

//add routes here
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    return res.end('Api workings');
})

app.listen(config.port, function () {
    console.log('Listing port: ' + config.port)
});
