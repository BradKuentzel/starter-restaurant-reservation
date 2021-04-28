const knex = require("../db/connection");

const list = (date) =>
	knex("reservations")
		.select()
		.whereNot("status", "finished")
		.andWhere("reservation_date", date)
		.orderBy("reservation_time");

const create = (newReserve) =>
	knex("reservations").insert(newReserve).returning("*");

const read = (reservation_id) =>
	knex("reservations").select().where("reservation_id", reservation_id).first();

const updateStatus = (reservation_id, status) =>
	knex("reservations")
		.where("reservation_id", reservation_id)
		.update({ status: status })
		.returning("status");

const update = (updatedReservation) =>
	knex("reservations")
		.select("*")
		.where({ reservation_id: updatedReservation.reservation_id })
		.update(updatedReservation, "*");

const search = (mobile_number) =>
	knex("reservations")
		.whereRaw(
			"translate(mobile_number, '() -', '') like ?",
			`%${mobile_number.replace(/\D/g, "")}%`
		)
		.orderBy("reservation_date");

module.exports = {
	list,
	create,
	read,
	updateStatus,
	search,
	update,
};
