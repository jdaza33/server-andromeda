import express from 'express'
import nodemon from 'nodemon'
import morgan from 'morgan'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import serveStatic from 'serve-static'


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

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now())
    }
});

let storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/profile')
    },
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now())
    }
});

let upload = multer({ storage: storage })
let uploadProfile = multer({ storage: storageProfile })

app.post('/upsupport', upload.array('images', 12), (req, res, next) => {
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

app.post('/profile', uploadProfile.single('profile'), (req, res, next) => {
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

//Routes
import infopersonal from './routes/infoPersonal'
import user from './routes/user'
import auth from './routes/auth'
import others from './routes/others'
import support from './routes/support'

//app.use('/infopersonal', infopersonal);
app.use('/infopersonal', passport.authenticate('jwt', { session: false }), infopersonal);
//app.use('/user', user);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use('/auth', auth);
app.use('/others', others);
app.use('/support', passport.authenticate('jwt', { session: false }), support);

//Logout Passport
app.get('/logout', function (req, res) {
    req.logout();
    res.json({
        res: true
    })
});


//Files static
//app.use(express.static(`../../dist/`));



//Output
app.listen(app.get('port'), () => {
    console.log(`App start on ${app.get('port')}`);
});

