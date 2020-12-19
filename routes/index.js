const routerx = require("express-promise-router");

const usuarioRouter = require("./usuarios");
const categoriaRouter = require("./categorias");
const articuloRouter = require("./articulo");

const router = routerx();
router.use("/usuario", usuarioRouter);
router.use("/categoria", categoriaRouter);
router.use("/articulo", articuloRouter);

module.exports = router;
