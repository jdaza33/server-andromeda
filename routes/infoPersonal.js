import express from 'express'
import infoPersonal from '../model/infoPersonal'
const router = express.Router();

router.get('/all', async (req, res) => {
    const aux = await (infoPersonal.find());
    res.json({
        res: true,
        infoPersonal: aux
    });
});

/*router.get('/', async (req, res) => {
    const aux = await (infoPersonal.findById(req.user.id_infopersonal));
    res.json({
        res: true,
        infoPersonal: aux
    });
});*/

router.get('/:id', async (req, res) => {
    const aux = await (infoPersonal.findById(req.params.id));
    console.log(req.params.id)
    res.json({
        infoPersonal: aux,
        res: true
    });
});

router.post('/', async (req, res) => {
    const aux = new infoPersonal(req.body);
    await aux.save();
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        res: true,
        status: "Datos guardados"
    });
});

router.put('/:id', async (req, res) => {
    await infoPersonal.findByIdAndUpdate(req.params.id,req.body);
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        res: true,
        status: "Datos actualizados"
    });
});

router.delete('/:id', async (req, res) => {
    await infoPersonal.findByIdAndRemove(req.params.id);
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        res: true,
        status: "Datos eliminados"
    });
});

export default router
