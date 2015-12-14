//WareHouse13 - Item Manangement API
//Andre Tokunaga

var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());
var storage = [];

//server.verb(function(req,res,next){
//   next();
//})


/*
    Product Model: {id,name, quantity}

*/




// Get list of Products
//GET /api/storage
server.get("/api/storage", function(req,res,next){

    //Send ID, Name and Quantity
    res.send(200,storage);
    console.log("It's Working!");
    next();
});

// Get product by id
server.get("/api/storage/:productId" , function(req,res,next){
    
    if(req.params.productId < 1 || req.params.productId > storage.length)
    {
        res.send(400, {message: "Not such product found"});
    } 
    else 
    {
        res.send(storage[req.params.productId-1]);
    }
    
    next();
});

/*PUT: /api/storage/:productId */
server.put("/api/storage/:productId", function(req,res,next){

    var updateProduct = req.body;
    
    //if name exists
    storage[req.params.productId-1].name = updateProduct.name;
    //if quantity exists
    storage[req.params.productId-1].quantity = updateProduct.quantity;
    //if body exists
    storage[req.params.productId-1].body = updateProduct.body;
    
    res.send(200, updateProduct);
    next();
});

// Add a new Product
//POST /api/storage

server.post("/api/storage", function(req,res,next){
    //Verify the object
    var newProduct = req.body;
    
    //If there is no name for the product, do not post anything
    if(Object.keys(newProduct).indexOf("name") == -1)
    {
        res.send(400, {message:"No name found"});
    } 
    else 
    {
    
        //CREATE THE POST HERE
        var tempProduct = {};
        
        tempProduct.id = storage.length+1;
        tempProduct.name = newProduct.name;
        tempProduct.body = newProduct.body;
        tempProduct.quantity = newProduct.quantity;
        
        storage.push(tempProduct);
        res.send(200, tempProduct);
        
    }
    
    next();
});

server.get(/.*/, restify.serveStatic({
	"default": "index.html",
	"directory": "./public",
}))

//Remove Product
//DELETE /api/storage/:productid

server.listen(6565);