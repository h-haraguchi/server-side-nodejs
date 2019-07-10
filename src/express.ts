import express from 'express';
import {logger} from './logger';
import passport from 'passport';
import {Strategy, VerifyFunction} from 'passport-local';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'

const PORT = 3000;

const alwaysSuccessVerification: VerifyFunction = (username, password, done) => {
	logger.application.info(`呼ばれてるよー${username}${password}`);
	return done(null, username);
};
passport.use(new Strategy(alwaysSuccessVerification));
passport.serializeUser(function(user, cb) { cb(null, 1); });
passport.deserializeUser(function(id, cb) { cb(null, {}); });

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", express.static('public'));
app.get("/login", express.static('public/login'));
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', session: false}));

app.listen(PORT, () => logger.application.info(`Example app listening on port ${PORT}!`));
