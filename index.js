const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure the correct path

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'images');
    const images = fs.readdirSync(imagesDir).filter(file => /\.(jpg|png)$/.test(file));
    res.render('index', { images });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
