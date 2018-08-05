import express from 'express'
import record from '../model/record'
const router = express.Router();

router.get('/nro/:nro', async (req, res) => {
    const aux = await (record.find({"nro_support": req.params.nro}));
    res.json({
        record: aux,
        res: true
    });
});

router.get('/hourserv/:nro', async (req, res) => {
    const aux = await (record.find({ "nro_support": req.params.nro }));

    let totalh = 0
    for (let i in aux[0].activities) {
        if (/^([0-9]){1,}$/.test(aux[0].activities[i].hours_service)) {
            totalh = totalh + parseInt(aux[0].activities[i].hours_service)
            console.log(parseInt(aux[0].activities[i].hours_service))
        }
    }
    console.log('--------')
    let totals = 0
    for (let j in aux[0].activities) {
        if (aux[0].activities[j].hours_service == 'Servicio') {
            console.log(aux[0].activities[j].hours_service)
            totals = totals + 1
        }
    }

    res.json({
        total_hours: totalh,
        total_service: totals,
        res: true
    });
});

router.post('/', async (req, res) => {
    const aux = new record(req.body);
    await aux.save();
    res.json({
        res: true,
        status: "Datos guardados"
    });
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id)
    await record.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        res: true,
        status: "Datos actualizados"
    });
});


export default router
