import express from 'express'
import payment from '../model/payments'
const router = express.Router();

router.get('/:id', async (req, res) => {
    const aux = await (payment.findById(req.params.id));
    console.log(req.params.id)
    res.json({
        payment: aux,
        res: true
    });
});

router.get('/bill/:id', async (req, res) => {
    const aux = await (payment.find({"id_bill": req.params.id}));
    console.log(req.params.id)
    res.json({
        payment: aux,
        res: true
    });
});


router.get('/nro/:nro', async (req, res) => {
    const aux = await (payment.find({"nro": req.params.nro}));
    res.json({
        res: true,
        payment: aux
    });
});

router.post('/', async (req, res) => {
    const aux = new payment(req.body);
    await aux.save();
    res.json({
        res: true,
        status: "Datos guardados"
    });
});

router.put('/:id', async (req, res) => {
    await payment.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        res: true,
        status: "Datos actualizados"
    });
});

export default router
