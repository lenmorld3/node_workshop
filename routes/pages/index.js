const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	// res.sendFile(__dirname + '/index.html');
	res.render('index');
});

router.get("/page/about", (req, res) => {
	// res.sendFile(__dirname + '/about.html');
	res.render('about');
});

module.exports = router; 