const Joi = require("joi");

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = schema.validate({ param: req["params"][name] });
      if (result.error) {
        return res.status(400).json(result.error.details[0].message);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["params"]) req.value["params"] = {};

        req.value["params"][name] = result.value.param;
        next();
      }
    };
  },
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error.details[0].message);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["body"]) req.value["body"] = {};

        req.value["body"] = result.value;
        next();
      }
    };
  },
  schemas: {
    userLoginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
    userSchema: Joi.object().keys({
      fullName: Joi.string().min(2).max(255).required(),
      employeeId: Joi.string().min(8).max(8).required(),
      email: Joi.string().email().max(255).required(),
      password: Joi.string().min(6).max(255).required(),
    }),
    userOptionalSchema: Joi.object().keys({
      fullName: Joi.string().min(2).max(255),
      employeeId: Joi.string().min(8).max(8),
      email: Joi.string().email().max(255),
      password: Joi.string().min(6).max(255),
    }),
    userOptionalSchemaFind: Joi.object().keys({
      fullName: Joi.string().min(2).max(255),
      employeeId: Joi.string().min(8).max(8),
      email: Joi.string().email().max(255),
    }),
    customerSchema: Joi.object().keys({
      name: Joi.string().min(2).max(255).required(),
      lastName: Joi.string().min(2).max(255).required(),
      email: Joi.string().email().max(255).required(),
      phone: Joi.string().max(20).required(),
      address: Joi.string().max(255).required(),
      city: Joi.string().max(255).required(),
      state: Joi.string().max(255).required(),
      zip: Joi.string().max(5).min(5).required(),
    }),
    customerOptionalSchema: Joi.object().keys({
      name: Joi.string().min(2).max(255),
      lastName: Joi.string().min(2).max(255),
      email: Joi.string().email().max(255),
      phone: Joi.string().max(20),
      address: Joi.string().max(255),
      city: Joi.string().max(255),
      state: Joi.string().max(255),
      zip: Joi.string().max(5).min(5),
    }),
    productSchema: Joi.object().keys({
      name: Joi.string().max(30).required(),
      productNumber: Joi.string().max(8).min(8).required(),
      boxSize: Joi.string().max(255).required(),
      weight: Joi.string().max(255).required(),
      description: Joi.string().max(255).required(),
    }),
    productSchemaOptional: Joi.object().keys({
      name: Joi.string().max(30),
      productNumber: Joi.string().max(8).min(8),
      boxSize: Joi.string().max(255),
      weight: Joi.string().max(255),
      description: Joi.string().max(255),
    }),
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  },
};
