const express = require('express');
const { Booking } = require('../db');

function create(req,res,next){
    const date = req.body.date;
    const member_id = req.body.member_id;
    const copy_id = req.body.copy_id;

    Booking.create({
        date: date,
        member_id: member_id,
        copy_id: copy_id
    }).then(object => res.json(object))
    .catch(err => res.send(err));
}

function list(req,res,next){
    Copy.findAll({include:['member','copy']})
    .then(objects => res.json(objects))
    .catch(err => res.send(err));
}

function index(req,res,next){
    const id = req.params.id;
    Booking.findByPk(id)
    .then(object => res.json(object))
    .catch(err => res.send(err));
}

function replace(req,res,next){
    const id = req.params.id;
    Booking.findByPk(id)
    .then(object => {
        const date = req.body.date ? req.body.date : "";
        const member_id = req.body.member_id ? req.body.member_id : "";
        const copy_id = req.body.copy_id ? req.body.copy_id : "";
        object.update({
            date: date,
            member_id: member_id,
            copy_id: copy_id
        }).then(obj => res.json(obj))
        .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

function update(req,res,next){
    const id = req.params.id;
    Booking.findByPk(id)
    .then(object => {
        const date = req.body.date ? req.body.date : object.date;
        const member_id = req.body.member_id ? req.body.member_id : object.member_id;
        const copy_id = req.body.copy_id ? req.body.copy_id : object.copy_id;
        object.update({
            date: date,
            member_id: member_id,
            copy_id: copy_id
        }).then(obj => res.json(obj))
        .catch(err => res.send(err));
    }).catch(err => res.send(err));
}

function destroy(req,res,next){
    const id = req.params.id;
    Booking.destroy({ where: {id: id}})
    .then(object => res.json(object))
    .catch(err => res.send(err));
}

module.exports = {
    list, index, create, replace, update, destroy
};