const mongoose = require("mongoose");
const dataModel = require("../models/model");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
let saltRounds = 10;
const add = async (req, resp) => {
  console.log(req.file);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return resp.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    let data = new dataModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      password: hash,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
      email: req.body.email,
      profile_pic: req.file.filename,
    });
    let result = await data.save();
    resp.status(200).send({ result });
    console.log(result);
  });
};
const show = async (req, resp) => {
  let { page, size } = req.query;
  const limit = parseInt(size);
  const skip = parseInt(page - 1) * size;

  let result = await dataModel.aggregate([]).skip(skip).limit(limit);
  resp.status(200).send({ result });
  console.log(result);
};
const update = async (req, resp) => {
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    if (req.file) {
      let data = await dataModel.updateOne(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pinCode: req.body.pinCode,
        email: req.body.email,
        profile_pic: req.file.filename,
      });
      resp.status(200).send({ data });
      console.log(data);
    } else {
      let data = await dataModel.updateOne(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pinCode: req.body.pinCode,
        email: req.body.email,
      });
      resp.status(200).send({ data });
      console.log(data);
    }
  });
};
const remove = async (req, resp) => {
  let data = await dataModel.deleteOne(req.params);
  resp.status(200).send(data);
  console.log(data);
};
module.exports = { add, show, update, remove };
