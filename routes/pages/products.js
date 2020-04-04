server.get("/page/products", (req, res) => {
	res.sendFile(__dirname + '/products.html');
});
