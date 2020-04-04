// init. environment variables
const dotenv = require('dotenv');
dotenv.config();
if (!process.env.PORT) {
	console.error("*****.env file missing! See README.md *****")
} else {
	console.log(`*****ENV PORT: ${process.env.PORT} *****`);
}

// import built-in Node packages
const express = require('express'); // import express
const server = express();
const body_parser = require('body-parser');
server.use(body_parser.json()); // parse JSON (application/json content-type)

let users = require('./users');
let products = require('./products');
let foods = require('./foods');

console.log(users[0]);

const port = process.env.PORT || 4000;

const getNextId = (_users) => {
	// solution 1: based on users length
	// return users.length + 1;

	// solution 2: based on max user.id
	let maxId = 1;

	_users.forEach(_user => {
		if (_user.id > maxId) {
			maxId = _user.id;
		}
	});

	return maxId + 1;
}

// ### HTML routes ###
server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.get("/page/products", (req, res) => {
	res.sendFile(__dirname + '/products.html');
});

server.get("/page/about", (req, res) => {
	res.sendFile(__dirname + '/about.html');
});

// ### JSON routes ### 
server.get("/json", (req, res) => {
	res.send((JSON.stringify({ name: "Lenny" })));
});

// # Products REST API

// GET all products
server.get("/products", (req, res) => {
	res.json(products);
});

// GET one product identified by id
server.get("/products/:id", (req, res) => {
	const productId = Number(req.params.id);
	const product = products.find(_product => _product.id === productId);
	if (!product) {
		res.json({
			error: "Product not found"
		})
	} else {
		// SUCCESS!
		res.json(product);
	}
});

// POST (create) a product 
server.post("/products", (req, res) => {
	const product = req.body;
	console.log('Adding new product: ', product);

	if (!product.id) {
		res.json({
			error: "id required"
		})
	} else if (products.find(_product => _product.id === product.id)) {
		res.json({
			error: "Product already exists"
		})
	} else {
		// SUCCESS!
		// add new product to products array
		products.push(product)

		// return updated list
		res.json(products);
	}
});

// PUT (update) a product
server.put("/products/:id", (req, res) => {
	const productId = Number(req.params.id);
	const updatedProduct = req.body;
	console.log("Editing product ", productId, " to be ", updatedProduct);

	const updatedListProducts = [];
	let found = false;

	// loop through list to find and replace one product
	products.forEach(oldProduct => {
		if (oldProduct.id === productId) {
			found = true;
			// spread oldProduct properties
			// then overwrite with product properties
			const modifiedProduct = {
				...oldProduct,
				...updatedProduct
			};
			updatedListProducts.push(modifiedProduct);
		} else {
			updatedListProducts.push(oldProduct);
		}
	});

	if (!found) {
		res.json({
			error: 'Product not found'
		});
	} else {
		// SUCCESS!!
		// replace old list with new one
		products = updatedListProducts;

		// return updated list
		res.json(products);
	}
});

// DELETE a product
server.delete("/products/:id", (req, res) => {
	const productId = Number(req.params.id);
	console.log("Delete product with id: ", productId);

	// filter list copy, by excluding item to delete
	const filteredList = products.filter(_product => _product.id !== productId);

	if (filteredList.length === products.length) {
		res.json({
			error: 'Product not found'
		})
	} else {
		// SUCCESS!
		products = filteredList;
		res.json(products);
	}
});

// # Foods REST API


// GET all foods
server.get("/foods", (req, res) => {
	res.json(foods);
})

// GET one food identified by id
server.get("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	const food = foods.find(_food => _food.id === foodId);
	if (!food) {
		res.json({
			error: "Food not found"
		})
	} else {
		// SUCCESS!
		res.json(food);
	}
});

// POST (create) a food 
server.post("/foods", (req, res) => {
	const food = req.body;
	console.log('Adding new food: ', food);

	if (!food.id) {
		res.json({
			error: "id required"
		})
	} else if (foods.find(_food => _food.id === food.id)) {
		res.json({
			error: "Food already exists"
		})
	} else {
		// SUCCESS!
		// add new food to foods array
		foods.push(food)

		// return updated list
		res.json(foods);
	}
});

// PUT (update) a food
server.put("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	const updatedFood = req.body;
	console.log("Editing food ", foodId, " to be ", updatedFood);

	const updatedListFoods = [];
	let found = false;

	// loop through list to find and replace one food
	foods.forEach(oldFood => {
		if (oldFood.id === foodId) {
			found = true;
			// spread oldFood properties
			// then overwrite with food properties
			const modifiedFood = {
				...oldFood,
				...updatedFood
			};
			updatedListFoods.push(modifiedFood);
		} else {
			updatedListFoods.push(oldFood);
		}
	});

	if (!found) {
		res.json({
			error: 'Food not found'
		});
	} else {
		// SUCCESS!!
		// replace old list with new one
		foods = updatedListFoods;

		// return updated list
		res.json(foods);
	}
});

// DELETE a food
server.delete("/foods/:id", (req, res) => {
	const foodId = Number(req.params.id);
	console.log("Delete food with id: ", foodId);

	// filter list copy, by excluding item to delete
	const filteredList = foods.filter(_food => _food.id !== foodId);

	if (filteredList.length === foods.length) {
		res.json({
			error: 'Food not found'
		})
	} else {
		// SUCCESS!
		foods = filteredList;
		res.json(foods);
	}
});

// # Users REST API

// GET all users
server.get("/users", (req, res) => {
	res.json(users);
});

// GET one user identified by id
server.get("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	const user = users.find(_user => _user.id === userId);
	if (!user) {
		res.json({
			error: "User not found"
		})
	} else {
		// SUCCESS!
		res.json(user);
	}
});

// POST (create) a user 
server.post("/users", (req, res) => {
	const user = req.body;
	console.log('Adding new user: ', user);

	if (users.find(_user => _user.id === user.id)) {
		res.json({
			error: "User already exists"
		})
	} else {
		// SUCCESS!
		// add new user to users array
		users.push({
			...user,
			id: getNextId(users),
		})

		// return updated list
		res.json(users);
	}
});

// PUT (update) a user
server.put("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	const updatedUser = req.body;
	console.log("Editing user ", userId, " to be ", updatedUser);

	const updatedListUsers = [];
	let found = false;

	// loop through list to find and replace one user
	users.forEach(oldUser => {
		if (oldUser.id === userId) {
			found = true;
			// spread oldUser properties
			// then overwrite with user properties
			const modifiedUser = {
				...oldUser,
				...updatedUser
			};
			updatedListUsers.push(modifiedUser);
		} else {
			updatedListUsers.push(oldUser);
		}
	});

	if (!found) {
		res.json({
			error: 'User not found'
		});
	} else {
		// SUCCESS!!
		// replace old list with new one
		users = updatedListUsers;

		// return updated list
		res.json(users);
	}
});

// DELETE a user
server.delete("/users/:id", (req, res) => {
	const userId = Number(req.params.id);
	console.log("Delete user with id: ", userId);

	// filter list copy, by excluding item to delete
	const filteredList = users.filter(_user => _user.id !== userId);

	if (filteredList.length === users.length) {
		res.json({
			error: 'User not found'
		})
	} else {
		// SUCCESS!
		users = filteredList;
		res.json(users);
	}
});


server.listen(port, () => { // Callback function in ES6
	console.log(`Server listening at ${port}`);
});
