import express from 'express'
import user from '../model/user'
import infopersonal from '../model/infoPersonal'

const router = express.Router();

router.post('/newuser', async (req, res, next) => {
    
    try{

        console.log(`Body --> ${req.body}`)

        const validateNit = await (infopersonal.find({ 'nit': req.body.nit }))
        if(validateNit.length>0){
            return res.json({
                res: false,
                err: 'E001'
            })
        }

        const validateEmail = await (infopersonal.find({ 'email': req.body.email }))
        if (validateEmail.length > 0) {
            return res.json({
                res: false,
                err: 'E002'
            })
        }

        const validateUsername = await (user.find({ 'username': req.body.username }))
        if (validateUsername.length > 0) {
            return res.json({
                res: false,
                err: 'E003'
            })
        }

        const newInfoPersonal = new infopersonal({
            'name': req.body.name,
            'nit': req.body.nit,
            'email': req.body.email
        });
        await newInfoPersonal.save();

        const aux = await (infopersonal.find({ 'nit': req.body.nit }));
        const newUser = new user({
            'id_infopersonal': aux[0]._id,
            'username': req.body.username,
            'password': req.body.password,
            'ref': req.body.nit
        });
        await newUser.save();

        res.json({
            res: true,
            cod: 'S001'
        });

    }catch (e){
        next(e);
    }
    
});

router.post('/newuserforauth', async (req, res, next) => {

    try {

        console.log(`Body --> ${req.body}`)

        const validateNit = await (infopersonal.find({ 'nit': req.body.nit }))
        if (validateNit.length > 0) {
            return res.json({
                res: false,
                err: 'E001'
            })
        }

        const validateEmail = await (infopersonal.find({ 'email': req.body.email }))
        if (validateEmail.length > 0) {
            return res.json({
                res: false,
                err: 'E002'
            })
        }

        const validateUsername = await (user.find({ 'username': req.body.username }))
        if (validateUsername.length > 0) {
            return res.json({
                res: false,
                err: 'E003'
            })
        }

        const newInfoPersonal = new infopersonal({
            'name': req.body.name,
            'nit': req.body.nit,
            'email': req.body.email
        });
        await newInfoPersonal.save();

        const aux = await (infopersonal.find({ 'nit': req.body.nit }));
        const newUser = new user({
            'id_infopersonal': aux[0]._id,
            'username': req.body.username,
            'password': req.body.password,
            'type_user': req.body.type_user,
            'ref': req.body.ref
        });
        await newUser.save();

        res.json({
            res: true,
            cod: 'S001'
        });

    } catch (e) {
        next(e);
    }

});

router.post('/newroot', async (req, res, next) => {
    try {

        console.log(`Body --> ${req.body}`)

        const validateNit = await (infopersonal.find({ 'nit': req.body.nit }))
        if (validateNit.length > 0) {
            return res.json({
                res: false,
                err: 'E001'
            })
        }

        const validateEmail = await (infopersonal.find({ 'email': req.body.email }))
        if (validateEmail.length > 0) {
            return res.json({
                res: false,
                err: 'E002'
            })
        }

        const validateUsername = await (infopersonal.find({ 'username': req.body.username }))
        if (validateUsername.length > 0) {
            return res.json({
                res: false,
                err: 'E003'
            })
        }

        const newInfoPersonal = new infopersonal({
            'name': req.body.name,
            'nit': req.body.nit,
            'email': req.body.email
        });
        await newInfoPersonal.save();

        const aux = await (infopersonal.find({ 'nit': req.body.nit }));
        const newUser = new user({
            'id_infopersonal': aux[0]._id,
            'username': req.body.username,
            'password': req.body.password,
            'type_user': req.body.type_user,
            'ref': req.body.nit
        });
        await newUser.save();

        res.json({
            res: true,
            cod: 'S001'
        });

    }catch(e){
        next(e);
    }
});


export default router