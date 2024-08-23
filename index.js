const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure the `files` directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}


app.get('/', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'images');
    const images = fs.readdirSync(imagesDir).filter(file => {
        return file.endsWith('.jpg') || file.endsWith('.png'); 
    });

    res.render('index', { images: images });
  });


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
