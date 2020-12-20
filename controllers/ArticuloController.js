const models = require("../models");
module.exports = {
  add: async (req, res, next) => {
    try {
      const registro = await models.Articulo.create(req.body);
      if (!registro) {
        res.status(404).send({ message: "Error al crear articulo" });
      } else {
        res.status(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  query: async (req, res, next) => {},
  list: async (req, res, next) => {
    try {
      const registro = await models.Articulo.findAll({
        include: [{ model: models.Categoria, as: "categoria" }],
      });
      res.status(200).json(registro);
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const numRegistros = await models.Articulo.update(
        {
          codigo: req.body.codigo,
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          categoriaId: req.body.categoriaId,
        },
        { where: { id: req.body.id } }
      );
      if (numRegistros == 0) {
        res.status(404).send({ message: "El articulo no existe" });
      } else {
        res.status(200).json(numRegistros);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const registro = await models.Articulo.destroy({
        where: { id: req.body._id },
      });
      if (registro == 0) {
        res.status(404).send({ message: "El articulo no existe" });
      } else {
        res.status(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
    }
  },
  activate: async (req, res, next) => {
    try {
      const registro = await models.Articulo.update(
        { estado: 1 },
        { where: { id: req.body.id } }
      );
      if (registro == 0) {
        res.status(404).send("El articulo no existe");
      } else {
        res.status(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const registro = await models.Articulo.update(
        { estado: 0 },
        { where: { id: req.body.id } }
      );
      if (registro == 0) {
        res.status(404).send("El articulo no existe");
      } else {
        res.status(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
};
