import express from 'express'
import bill from '../model/bill'
const router = express.Router();

router.get('/:id', async (req, res) => {
    const aux = await (bill.findById(req.params.id));
    console.log(req.params.id)
    res.json({
        bill: aux,
        res: true
    });
});

router.get('/ref/:ref', async (req, res) => {
    const aux = await (bill.find({ ref: req.params.ref}));
    res.json({
        bill: aux,
        res: true
    });
});

router.get('/nro/:nro', async (req, res) => {
    const aux = await (bill.find({ nro: req.params.nro }));
    res.json({
        bill: aux,
        res: true
    });
});

router.get('/client/:id', async (req, res) => {
    const aux = await (bill.find({ id_client: req.params.id }));
    res.json({
        bill: aux,
        res: true
    });
});

router.post('/', async (req, res) => {
    const aux = new bill(req.body);
    await aux.save();
    res.json({
        res: true,
        status: "Datos guardados"
    });
});

router.put('/:id', async (req, res) => {
    await bill.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        res: true,
        status: "Datos actualizados"
    });
});

export default router
