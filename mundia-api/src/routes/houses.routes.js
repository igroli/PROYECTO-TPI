import { Router } from "express";

const router = Router();

router.get('/houses', (req, res) => {
    res.send("Obteniendo propiedades")
});

router.get('/house/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Obteniendo propiedad con id: ${id}`);
})

router.post('/houses', (req, res) => {
    res.send("Creando propiedad")
})

router.put('/houses/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Actualizando propiedad con id: ${id}`);
})

router.delete('/houses/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Borrando propiedad con id: ${id}`);
})
export default router;