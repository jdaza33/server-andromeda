import express from 'express'
import support from '../model/support'
const router = express.Router();

router.get('/all', async (req, res) => {
    const aux = await (support.find());
    res.json({
        res: true,
        support: aux
    });
});

router.get('/ref/:ref', async (req, res) => {
    console.log(req.params.ref)
    const aux = await (support.find({ ref: req.params.ref}));
    res.json({
        support: aux,
        res: true
    });
});


router.post('/', async (req, res) => {
    const aux = new support(req.body);
    await aux.save();
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        res: true
    });
});


router.put('/changestatus/:id', async (req, res) => {
    await support.findByIdAndUpdate(req.params.id, req.body);
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        res: true
    });
});


export default router

