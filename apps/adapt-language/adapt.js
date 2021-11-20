if (localStorage.getItem("adapt")) {
	termAPI.write("Already adapted to current UDN language.");
} else {
	termAPI.write("Packages will adapt to your UDN language.");
	localStorage.setItem("adapt", "1");
}