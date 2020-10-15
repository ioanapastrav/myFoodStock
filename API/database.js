const config = require("./config");
const knex = require("knex")(config);

//Users
exports.createUser = (name, email, password) => knex("users").insert({ name, email, password });

exports.findUserByEmail = async (email) => {
	const users = await knex.select("id", "name", "email", "password").where({ email }).from("users");

	return users.length === 0 ? undefined : users[0];
};

//Inverntory items
exports.listInventoryItems = (userId) =>
	knex
		.select("id", "storageTypeName", "name", "date_added", "expiry_date", "quantity", "measuring_units", "isBasic")
		.where({ userId })
		.from("inventory");

exports.createInventoryItems = (userId, storageTypeName, name, date_added, expiry_date, quantity, measuring_units, isBasic) =>
	knex("inventory").returning("id").insert({
		userId,
		storageTypeName,
		name,
		date_added,
		expiry_date,
		quantity,
		measuring_units,
		isBasic,
	});

exports.updateInventoryItems = (userId, id, name, quantity, measuring_units, isBasic) =>
	knex("inventory").where({ userId, id }).update({ name, quantity, measuring_units, isBasic });

exports.deleteInventoryItems = (userId, id) => knex("inventory").where({ userId, id }).delete();

//Requirements
exports.listRequirements = (userId) =>
	knex.select("id", "userId", "itemId", "storageTypeName", "quantity", "measuring_units").where({ userId }).from("requirements");

exports.filterRequirements = (userId, itemId) => 
	knex("requirements")
		.where({
			userId: userId,
			itemId: itemId,
		})
		.select("id", "userId", "itemId", "storageTypeName", "quantity", "measuring_units");

exports.createRequirement = (itemId, userId, storageTypeName, quantity, measuring_units) =>
	knex("requirements").insert({
		itemId,
		userId,
		storageTypeName,
		quantity,
		measuring_units,
	});

exports.updateRequirement = (userId, id, quantity, measuring_units) =>
	knex("requirements").where({ userId, id }).update({ quantity, measuring_units });

exports.deleteRequirement = (userId, id) => knex("requirements").where({ userId, id }).delete();
