if (!localStorage.getItem("adapt")) {
	termAPI.write("You didn't adapt your UDN language!");
} else {
	termAPI.write("Packages will no longer adapt to your UDN language.");
	localStorage.removeItem("adapt");
}