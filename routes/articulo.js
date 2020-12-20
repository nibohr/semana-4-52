const routerx = require("express-promise-router");
const articuloController = require("../controllers/ArticuloController");
const auth = require("../middlewares/auth");

const router = routerx();

router.get("/list", articuloController.list);
router.post("/add", auth.verifyUsuario, articuloController.add);
router.put("/update", auth.verifyUsuario, articuloController.update);
router.delete("/delete", auth.verifyUsuario, articuloController.remove);
router.put("/activate", auth.verifyUsuario, articuloController.activate);
router.put("/deactivate", auth.verifyUsuario, articuloController.deactivate);

module.exports = router;
