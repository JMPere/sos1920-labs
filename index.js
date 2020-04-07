const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser=require("body-parser");

var app = express();

app.use(bodyParser.json());

app.use("/", express.static("./public"));

app.get("/cool", (request, response) => {
		response.send("<html>"+cool()+"</html>");
		
		});

var contacts = [
	{
		name: "pedro",
		phone: 123321313
	},
	{
		name: "mario",
		phone: 132323142
	},
];

const BASE_API_URL="/api/v1";

//GET CONTACTS
app.get(BASE_API_URL+"/contacts",(req, res)=>{
	res.send(JSON.stringify(contacts, null, 2));
});

//POST CONTACTS
app.post(BASE_API_URL+"/contacts",(req, res)=>{
			contacts.push(req.body);
			res.sendStatus(201, "CREATED");
});


//GET CONTACTS/XXXX
app.get(BASE_API_URL+"/contacts/:name",(req, res)=>{
	var name = req.params.name;
	var nameFilter = contacts.filter(c => c.name == name);
	
	if(nameFilter.length>=1){
	   	res.send(nameFilter[0]);
	   }else{
		   res.sendStatus(404,"CONTACT NOT FOUND");
	   }
	
});

//PUT CONTACTS/XXXX

//DELETE CONTACTS/XXXX
app.delete(BASE_API_URL+"/contacts/:name", (req, res)=>{
	var name=req.params.name;
	var filteredContacts= contacts.filter((c)=>{
		return (c.name != name);
	})
	
	if(filteredContacts.length<contacts.length){
		contacts = filteredContacts;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
})


/*app.delete(BASE_API_URL+"/contacts/:name",(req, res)=>{
	var name = req.params.name;
	var contactsFilter = contacts.filter((c)=>{
		return (c.name != name);
	});
	
	
	if(contactsFilter.length < contacts.length){
		contacts=contactsFilter;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
})*/


app.listen(80, () =>{
	console.log("Server ready");
});

console.log("Starting server...");