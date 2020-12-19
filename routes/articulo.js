const routerx = require("express-promise-router");
const articuloController = require("../controllers/ArticulosController");
const auth = require("../middlewares/auth");

const router = routerx();

router.get("/list", articuloController.list);
router.post("/add", articuloController.add);
router.put("/update", articuloController.update);
router.delete("/delete", articuloController.remove);
router.put("/activate", articuloController.activate);
router.put("/deactivate", articuloController.deactivate);

module.exports = router;
