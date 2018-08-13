import express from 'express'
import nodemon from 'nodemon'
import morgan from 'morgan'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fs from 'fs'
import fileType from 'file-type'
import multer from 'multer'

const app = express();

//Connect DB
import db from './config/db'

//Passport
require('./config/passport')(passport);

//Settings
app.set('port', process.env.PORT || 4000);
//app.set('views', `${__dirname}/views`);
//app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(cors());


//Upload

let storageSupport = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/support')
    },
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now())
    }
});

let storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile')
    },
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now())
    }
});

let storagePayments = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/payment')
    },
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now())
    }
});

let uploadSupport = multer({ storage: storageSupport })
let uploadProfile = multer({ storage: storageProfile })
let uploadPayments = multer({ storage: storagePayments })

app.post('/upsupport', uploadSupport.array('images', 12), (req, res, next) => {
    try {
        console.log(req.files)
        res.json({
            res: true,
            images: req.files
        })
    } catch (err) {
        res.sendStatus(400);
    }
})

app.post('/upprofile', uploadProfile.single('profile'), (req, res, next) => {
    try {
        console.log(req.file)
        res.json({
            res: true,
            profile: req.file
        })
    } catch (err) {
        res.sendStatus(400);
    }
})

app.post('/uppayment', uploadPayments.array('images', 12), (req, res, next) => {
    try {
        console.log(req.files)
        res.json({
            res: true,
            images: req.files
        })
    } catch (err) {
        res.sendStatus(400);
    }
})

app.get('/uploads/support/:imagename', (req, res) => {

    let imagename = req.params.imagename
    let imagepath = __dirname + "/uploads/support/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = fileType(image).mime

    res.writeHead(200, { 'Content-Type': mime })
    res.end(image, 'binary')
})

app.get('/uploads/profile/:imagename', (req, res) => {

    let imagename = req.params.imagename
    let imagepath = __dirname + "/uploads/profile/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = fileType(image).mime

    res.writeHead(200, { 'Content-Type': mime })
    res.end(image, 'binary')
})

app.get('/uploads/payment/:imagename', (req, res) => {

    let imagename = req.params.imagename
    let imagepath = __dirname + "/uploads/payment/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = fileType(image).mime

    res.writeHead(200, { 'Content-Type': mime })
    res.end(image, 'binary')
})



//Routes
import infopersonal from './routes/infoPersonal'
import user from './routes/user'
import auth from './routes/auth'
import others from './routes/others'
import support from './routes/support'
import record from './routes/record'
import report from './routes/report'
import bill from './routes/bill'
import payment from './routes/payment'

app.use('/infopersonal', passport.authenticate('jwt', { session: false }), infopersonal);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use('/auth', auth);
app.use('/others', others);
app.use('/support', passport.authenticate('jwt', { session: false }), support);
app.use('/record', passport.authenticate('jwt', { session: false }), record);
app.use('/report', passport.authenticate('jwt', { session: false }), report);
app.use('/bill', passport.authenticate('jwt', { session: false }), bill);
app.use('/payment', passport.authenticate('jwt', { session: false }), payment);

//Logout Passport
app.get('/logout', function (req, res) {
    req.logout();
    res.json({
        res: true
    })
});


//Files static
//app.use(express.static(`/uploads`));
//app.get('/', express.static(`${__dirname}/uploads/support`))


//Output
app.listen(app.get('port'), () => {
    console.log(`App start on ${app.get('port')}`);
});


