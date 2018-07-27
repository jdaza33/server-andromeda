import express from 'express'
const router = express.Router();
import jwt from 'jsonwebtoken'
import passport from 'passport'

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                const error = new Error('An Error occured')
                return next(error);
            }

            if (!user) {
                res.json({
                    res: false,
                    err: info.err
                });
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)
                const body = { _id: user._id, username: user.username };
                const token = jwt.sign({ user: body }, 'blackencio');
                return res.json({ token, res: true });
            });
        } catch (e) {
            return next(e);
        }
    })(req, res, next);
});

/*router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});*/

export default router