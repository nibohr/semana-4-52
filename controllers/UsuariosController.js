// const config = require("../secret/config.js");
const models = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
  add: async (req, res, next) => {
    try {
      const registro = await models.Usuario.create(req.body);
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
      const registro = await models.Usuario.update(
        {
          nombre: req.body.nombre,
          rol: req.body.rol,
          email: req.body.email,
          password: req.body.password,
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
      if (!registro) {
        res.statud(404).send("El ususario no existe");
      } else {
        res.statud(200).json(registro);
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
      if (!registro) {
        res.statud(404).send("El ususario no existe");
      } else {
        res.statud(200).json(registro);
      }
    } catch (error) {
      res.status(500).send({ message: "Algo ha salido mal =O" });
      next(error);
    }
  },
  login: async (req, res, next) => {
    models.Usuario.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send("El usuario no existe.");
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            tokenReturn: null,
            reason: "Contraseña invalida!",
          });
        }

        var token = jwt.sign(
          { id: user.id, name: user.name, email: user.email },
          'SuperSecreto',
          {
            expiresIn: 86400, // expires in 24 hours
          }
        );

        res.status(200).send({ auth: true, tokenReturn: token });
      })
      .catch((err) => {
        // res.status(500).send("Error -> " + err);
        res.status(500).send("Algo ha salido mal =O");
      });
  },
};
