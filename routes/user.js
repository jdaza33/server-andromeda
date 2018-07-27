import express from 'express'
import user from '../model/user'
const router = express.Router();

router.get('/all', async (req, res) => {
    const aux = await (user.find());
    res.json({
        res: true,
        user: aux
    });
});

/*router.get('/', async (req, res) => {
    const aux = await (user.findById(req.user._id));
    res.json({
        res: true,
        user: aux
    });
});*/

router.get('/:id', async (req, res) => {
    const aux = await (user.findById(req.params.id));
    res.json({
        user: aux,
        res: true
    });
});

router.get('/ref/:ref', async (req, res) => {
    console.log(req.params.ref)
    const aux = await (user.find({ ref: req.params.ref }));
    res.json({
        user: aux,
        res: true
    });
});


router.post('/', async (req, res) => {
    const aux = new user(req.body);
    await aux.save();
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        res:true,
        status: "Usuario guardado"
    });
});

router.put('/:id', async (req, res) => {
    await user.findByIdAndUpdate(req.params.id, req.body);
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        res: true,
        status: "Usuario actualizado"
    });
});

router.put('/changestatus/:id', async (req, res) => {
    await user.findByIdAndUpdate(req.params.id, req.body);
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        res: true
    });
});



export default router

