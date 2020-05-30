const axios = require('axios');
const express = require('express');
const router = express.Router();

// external API routes
router.get("/services/posts/:id", function (req, res) {
	const id = req.params.id;
	axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
		.then(result => {
			res.json(result.data);
		}).catch(err => {
			throw err;
		});
});


// http://localhost:4000/services/jobs?location=new%20york&description=javascript&titleContains=developer&year=2018
router.get("/services/jobs", function (req, res) {
	const { description, location, titleContains, year } = req.query;
	let requestUrl = "https://jobs.github.com/positions.json";

	if (description || location) {
		const descriptionParam = description ? `description=${description}&` : '';
		const locationParam = location ? `location=${location}&` : '';
		requestUrl = `${requestUrl}?${descriptionParam}${locationParam}`;
	}

	axios(requestUrl).then(result => {
		// psot-processing of results
		const results = result.data;
		const matches = results.filter(r => {
			const { title, created_at } = r;
			const titleParam = titleContains ? titleContains.toLowerCase() : '';
			const yearParam = year || '';
			return title.toLowerCase().includes(titleParam) && created_at.includes(yearParam);
		});
		res.json(matches);
	}).catch(err => {
		throw err;
	});
});



module.exports = router;