import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();

app.set("view engine", "ejs");          // Which rendering engine we're using
app.use(express.static("public"));      // Where we will store static content (images, css, etc)

// Run this anonymous function at the home page
app.get('/', async(req, res) => {
    let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;

    // Render the whole index page
    res.render('index', {"image":randomImage});
});

app.get('/earth', (req, res) => {
    let planetEarth = planets.getEarth();
    console.log(planetEarth);
    res.render('earth', {planetEarth});
});

app.get('/mars', (req, res) => {
    let planetMars = planets.getMars();
    console.log(planetMars);
    res.render('mars', {planetMars});
});

// Send information at the port 3000
app.listen(3000, () => {
    console.log("server started");
});

app.get('/planet', (req, res) => {
   let planetName = req.query.planetName;
   let planetInfo = planets[`get${planetName}`]();
   console.log(planetInfo);
   res.render('planet', {planetInfo, planetName}); 
});