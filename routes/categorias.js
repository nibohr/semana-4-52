const routerx = require("express-promise-router");
const categoriaController = require("../controllers/CategoriasController");
const auth = require("../middlewares/auth");

const router = routerx();

router.get("/list", categoriaController.list);
router.post("/add", categoriaController.add);
router.put("/update", categoriaController.update);
router.delete("/delete", categoriaController.remove);
router.put("/activate", categoriaController.activate);
router.put("/deactivate", categoriaController.deactivate);

module.exports = router;
