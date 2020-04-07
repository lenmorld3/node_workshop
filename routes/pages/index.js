const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
<<<<<<< HEAD
	res.sendFile(process.cwd() + '/views/index.html');
});

router.get("/page/about", (req, res) => {
	res.sendFile(process.cwd() + '/views/about.html');
=======
	// res.sendFile(__dirname + '/index.html');
	res.render('index');
});

router.get("/page/about", (req, res) => {
	// res.sendFile(__dirname + '/about.html');
	res.render('about');
>>>>>>> c5.1
});

module.exports = router; 