// === fetch non-authenticated resource ===
console.log("Fetching un-gated resource /foods")

fetch('http://localhost:4000/foods')
	.then(response => {
		console.log(response)
		return response.json()
	})
	.then(json => {
		console.log(json)
		document.getElementById('app').innerHTML = JSON.stringify(json);
	})