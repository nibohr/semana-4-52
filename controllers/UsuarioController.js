// const config = require("../secret/config.js");
const models = require("../models");
var bcrypt = require("bcryptjs");
const token = require("../services/token");

module.exports = {
  add: async (req, res, next) => {
    try {
      const pass = bcrypt.hashSync(req.body.password, 8);
      // const pass = req.body.password;
      const registro = await models.Usuario.create({
        nombre: req.body.nombre,
        email: req.body.email,
        rol: req.body.rol,
        password: pass,
        estado: req.body.estado,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json(registro);
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  query: async (req, res, next) => {
    try {
      const registro = await models.Usuario.findOne({
        where: { id: req.query.id },
      });
      if (!registro) {
        res.status(404).send({ message: "El usuario no existe =O" });
      } else {
        res.status(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const registro = await models.Usuario.findAll();
      res.status(200).json(registro);
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const pass = bcrypt.hashSync(req.body.password, 8);
      const registro = await models.Usuario.update(
        {
          nombre: req.body.nombre,
          rol: req.body.rol,
          email: req.body.email,
          password: pass,
        },
        { where: { id: req.body.id } }
      );
      if (!registro) {
        res.status(404).send({ message: "El usuario no existe" });
      } else {
        res.status(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const registro = await models.Usuario.destroy({
        where: { id: req.body.id },
      });
      if (!registro) {
        res.status(404).send({ message: "El usuario no existe" });
      } else {
        res.status(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
    }
  },
  activate: async (req, res, next) => {
    try {
      const registro = await models.Usuario.update(
        { estado: 1 },
        { where: { id: req.body.id } }
      );
      if (registro == 0) {
        res.status(404).send("El ususario no existe");
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
      const registro = await models.Usuario.update(
        { estado: 0 },
        { where: { id: req.body.id } }
      );
      if (registro == 0) {
        res.status(404).send("El ususario no existe");
      } else {
        res.status(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      let user = await models.Usuario.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let tokenReturn = await token.encode(user.id, user.rol);
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(401).send({ message: "Contraseña invalida" });
        }
      } else {
        res.status(404).send({ message: "El usuario no existe" });
      }
    } catch (error) {
      res.status(500).send({ message: "Algo malo ha sucedido =O" });
      next(error);
    }
  },
};
