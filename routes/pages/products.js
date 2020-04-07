<<<<<<< HEAD
const express = require('express');
const router = express.Router();

router.get("/page/products", (req, res) => {
	res.sendFile(process.cwd() + '/views/products.html');
});

module.exports = router; 
=======
server.get("/page/products", (req, res) => {
	res.sendFile(__dirname + '/products.html');
});
>>>>>>> c5.1
