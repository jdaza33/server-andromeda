import express from 'express'
import calendar from '../model/calendar'
const router = express.Router();

router.get('/host/:id', async (req, res) => {
    const aux = await (calendar.find({ "host": req.params.id }));
    console.log(req.params.id)
    res.json({
        calendar: aux,
        res: true
    });
});

router.get('/invited/:id', async (req, res) => {
    const aux = await (calendar.find({ "invited": req.params.id }));
    console.log(req.params.id)
    res.json({
        calendar: aux,
        res: true
    });
});

router.post('/', async (req, res) => {
    const aux = new calendar(req.body);
    await aux.save();
    res.json({
        res: true,
        status: "Datos guardados"
    });
});

router.put('/:id', async (req, res) => {
    await calendar.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        res: true,
        status: "Datos actualizados"
    });
});

export default router
