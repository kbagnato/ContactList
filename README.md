# ContactList
This is my final project for my web application class at Ramapo College.

It is an Express-generated Node.js server connected to a local MongoDB collection. It uses Passport for user authentication to view the conteact list. It's stylized with Bootstrap.

The web app has a contact form for the user to submit their info (name, address, optional mailing list). Their information is then added to its MongoDB.
An admin can view the full list of contacts in the database as well as an interactive map with their locations. When the user clicks on a user in the list the map jumps to their submitted location. Hovering over the marker on the maap will show the relevant contact's info.
