import express from 'express'
import report from '../model/report'
const router = express.Router();

/*router.get('/:id', async (req, res) => {
    const aux = await (report.findById(req.params.id));
    console.log(req.params.id)
    res.json({
        report: aux,
        res: true
    });
});*/

router.get('/ref/:ref', async (req, res) => {
    const aux = await (report.find({"ref": req.params.ref}));
    res.json({
        res: true,
        report: aux
    });
});

router.post('/', async (req, res) => {
    const aux = new report(req.body);
    await aux.save();
    res.json({
        res: true,
        status: "Datos guardados"
    });
});

router.put('/:id', async (req, res) => {
    await report.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        res: true,
        status: "Datos actualizados"
    });
});

export default router
