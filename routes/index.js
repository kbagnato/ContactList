var express = require('express');
var NodeGeocoder = require("node-geocoder");
var router = express.Router();

var ObjectId = require('mongodb').ObjectID;
var ensureLoggedIn = function(req, res, next) {
	if (req.user) {
		next();
	}
	else {
		res.redirect("/login");
	}
}

// -------------------- MAILER --------------------
/* GET mailer - send personal info submission form. */
router.get("/", function(req, res, next) {
	res.render("mailer", {title: "Create Contact"});
});

router.get("/mailer", function(req, res, next) {
	res.render("mailer", {title: "Create Contact"});
});

/* POST mailer - add person's info to database. */
router.post("/mailer", function(req, res, next) {
	// geocode using opencage
	var options = {
		provider: "opencage",
		apiKey: '856797c7561a4ea6b27ba4d7790366b7',
	};
	let address = req.body.street + " " + req.body.city + " " + req.body.state + " " + req.body.zip;
	let latitude, longitude;
	let geocoder = NodeGeocoder(options);
	geocoder.geocode(address)
		.then(function(result) {
			latitude = result[0].latitude;
			longitude = result[0].longitude;

			// get person's info from request and geocoder 
			let person = {
				"prefix" :  req.body.prefix,
				"firstName" : req.body.firstName,
				"lastName" : req.body.lastName,
				"street" : req.body.street,
				"city" : req.body.city,
				"state" : req.body.state,
				"zip" : req.body.zip,
				"phone" : req.body.phone,
				"email" : req.body.email,
				"contactPhone" : (req.body.contactPhone == null ? false : true),
				"contactMail" : (req.body.contactMail == null ? false : true),
				"contactEmail" : (req.body.contactEmail == null ? false : true),
				"latitude" : latitude,
				"longitude" : longitude
			}

			req.people.insertOne(person, function(err, newDoc) {
				if (err) {
					throw err;
				}
				console.log(newDoc);
			});
		})
		.catch(function(err) {
			console.log(err);
			res.render("Something went wrong with the geocoder.");
		});	
	res.redirect("/contacts");
});
// --------------------------------------------------

// -------------------- CONTACTS --------------------
/* GET contacts - display all contacts in database */
router.get("/contacts", ensureLoggedIn, function(req, res, next) {
	req.people.find({}).toArray(function(err, result) {
		if (err) {
			throw err;
		}
		res.render("contacts", {title: "Contacts", people: result});
	});
});
// --------------------------------------------------

// --------------------- UPDATE ---------------------
/* GET update - update the contact for a given ID */
router.get("/update", function(req, res, next) {
	
	if (!req.query.id) {
		res.redirect('/contacts');
	}
	
	let objID = new ObjectId(req.query.id);
	console.log('updating: ' + objID);



	// send person's info to view
	req.people.find({"_id" : objID}).toArray(function(err, result) {
		if (err) {
			throw err;
		}
		res.render('update', {title: "Update Contact", id: objID, person: JSON.stringify(result)});
	});
});

/* POST update - update the person in DB */
router.post('/update', function(req, res, next) {
	// geocode using opencage
	// geocode using opencage

	var options = {
		provider: "opencage",
		apiKey: '856797c7561a4ea6b27ba4d7790366b7',
	};
	let address = req.body.street + " " + req.body.city + " " + req.body.state + " " + req.body.zip;
	let latitude, longitude;
	let geocoder = NodeGeocoder(options);
	geocoder.geocode(address)
		.then(function(result) {
			latitude = result[0].latitude;
			longitude = result[0].longitude;

			// // get person's info from request and geocoder 
			// let person = {
			// 	"prefix" :  req.body.prefix,
			// 	"firstName" : req.body.firstName,
			// 	"lastName" : req.body.lastName,
			// 	"street" : req.body.street,
			// 	"city" : req.body.city,
			// 	"state" : req.body.state,
			// 	"zip" : req.body.zip,
			// 	"phone" : req.body.phone,
			// 	"email" : req.body.email,
			// 	"contactPhone" : (req.body.contactPhone == null ? false : true),
			// 	"contactMail" : (req.body.contactMail == null ? false : true),
			// 	"contactEmail" : (req.body.contactEmail == null ? false : true),
			// 	"latitude" : latitude,
			// 	"longitude" : longitude
			// }

			let objID = new ObjectId(req.body.id);
			console.log('updating: ' + objID);
			const query = { '_id' : objID };

			let newVals = { $set: {prefix: req.body.prefix, 
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				street: req.body.street,
				city: req.body.city,
				state: req.body.state,
				zip: req.body.zip,
				phone: req.body.phone,
				email: req.body.email,
				contactPhone: (req.body.contactPhone == null ? false : true),
				contactMail: (req.body.contactMail == null ? false : true),
				contactEmail: (req.body.contactEmail == null ? false : true),
				latitude: latitude,
				longitude: longitude
			}};

			req.people.updateOne(query, newVals, function(err, newDoc) {
				if (err) {
					throw err;
				}
				console.log(newDoc);
			});
		})
		.catch(function(err) {
			console.log(err);
			res.render("Something went wrong with the geocoder.");
		});	
	res.redirect("/contacts");
});
// --------------------------------------------------

// --------------------- DELETE ---------------------
/* POST delete - delete the given ID */
router.post("/delete", function(req, res, next) {
	let objID = new ObjectId(req.body.id);
	console.log('deleting: ' + objID);
	
	const query = { '_id' : objID };

	req.people.deleteOne(query)
		.then(result => console.log(`Deleted ${result.deletedCount} item.`))
		.catch(err => console.error(`Delete failed with error: ${err}`));

	res.redirect('/contacts');
});
// --------------------------------------------------


module.exports = router;
