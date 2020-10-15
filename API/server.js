const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const database = require("./database");
const accessToken = require("./accessToken");
const authMiddleware = require("./authMIddleware");

const app = express();
app.use(express.json());
app.use(cors());

//signUp and login
app.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 4);
	await database.createUser(name, email, hashedPassword);
	res.json();
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await database.findUserByEmail(email);

	if (!user) {
		res.status(401).json({ message: "Invalid credentials." });
		return;
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (isPasswordCorrect === false) {
		res.status(401).json({ message: "Invalid credentials" });
	}

	const authtoken = accessToken.createAccessToken(user);
	res.json({ user, authtoken });
});

//REQUIREMENTS
app.get("/requirements", authMiddleware, async (req, res) => {
	const requirements = await database.listRequirements(req.user.id);
	res.json(requirements);
});
app.post("/filter", authMiddleware, async (req, res) => {
	const itemId = req.body.itemId;
	const requirements = await database.filterRequirements(req.user.id, itemId);

	res.json(requirements);
});
app.post("/requirements", authMiddleware, async (req, res) => {
	const itemId = req.body.itemId;
	const storageTypeName = req.body.storageTypeName;
	const quantity = req.body.quantity;
	const measuring_units = req.body.measuring_units;

	await database.createRequirement(itemId, req.user.id, storageTypeName, quantity, measuring_units);
	res.json();
});
app.put("/requirements/:id", authMiddleware, async (req, res) => {
	const id = req.params.id;
	const quantity = req.body.quantity;
	const measuring_units = req.body.measuring_units;

	await database.updateRequirement(req.user.id, id, quantity, measuring_units);
	res.json();
});

app.delete("/requirements/:id", authMiddleware, async (req, res) => {
	const id = req.params.id;

	await database.deleteRequirement(req.user.id, id);
	res.json();
});

//INVENTORY
app.get("/inventory", authMiddleware, async (req, res) => {
	const inventory = await database.listInventoryItems(req.user.id);
	res.json(inventory);
});

app.post("/inventory", authMiddleware, async (req, res) => {
	const storageTypeName = req.body.storageTypeName;
	const name = req.body.name;
	const date_added = req.body.date_added;
	const expiry_date = req.body.expiry_date;
	const quantity = req.body.quantity;
	const measuring_units = req.body.measuring_units;
	const isBasic = req.body.isBasic;

	const itemId = await database.createInventoryItems(req.user.id, storageTypeName, name, date_added, expiry_date, quantity, measuring_units, isBasic);

	res.json(itemId);
});

app.put("/inventory/:id", authMiddleware, async (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const quantity = req.body.quantity;
	const measuring_units = req.body.measuring_units;
	const isBasic = req.body.isBasic;

	await database.updateInventoryItems(req.user.id, id, name, quantity, measuring_units, isBasic);
	res.json();
});

app.delete("/inventory/:id", authMiddleware, async (req, res) => {
	const id = req.params.id;

	await database.deleteInventoryItems(req.user.id, id);
	res.json();
});

app.listen(8080);
