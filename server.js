const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));
app.use(fileupload());

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'home.html'));
});

// Editor page
app.get('/editor', (req, res) => {
    res.sendFile(path.join(publicPath, 'editor.html'));
});

// ✅ Login page (added)
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

// Upload images
app.post('/upload', (req, res) => {
    if (!req.files || !req.files.image) return res.status(400).json("No file uploaded");

    const file = req.files.image;
    const name = Date.now() + '-' + file.name;
    const uploadPath = path.join(publicPath, 'uploads', name);

    file.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Upload failed");
        }
        res.json(`uploads/${name}`);
    });
});

// Blog pages (keep this last, acts as catch-all for slugs)
app.get('/:blog', (req, res) => {
    res.sendFile(path.join(publicPath, 'blog.html'));
});

// 404
app.use((req, res) => res.status(404).json("404"));

// Start server
app.listen(8080, () => console.log('Server running on http://localhost:8080'));
