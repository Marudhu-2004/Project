// public/js/editor.js
import { db, storage, auth } from './firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const blogTitle = document.querySelector('.title');
const article = document.querySelector('.article');
const bannerInput = document.querySelector('#banner-upload');
const bannerDiv = document.querySelector('.banner');
const publishBtn = document.querySelector('.publish-btn');
const imageInput = document.querySelector('#image-upload');
const videoInput = document.querySelector('#video-url');
const categoryInput = document.querySelector('#category'); // ✅ category dropdown

let bannerPath = null;

// Upload image to Firebase Storage
async function uploadImage(file, type) {
    if (!file.type.includes('image')) {
        alert('Please select an image');
        return;
    }

    try {
        const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        if (type === 'banner') {
            bannerPath = url;
            bannerDiv.style.backgroundImage = `url("${url}")`;
        } else {
            insertImage(url, file.name);
        }
    } catch (err) {
        console.error("Upload failed:", err);
        alert("Image upload failed. Check console for details.");
    }
}

// Banner upload
bannerInput.addEventListener('change', () => {
    const file = bannerInput.files[0];
    if (file) uploadImage(file, 'banner');
});

// Inline image upload
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) uploadImage(file, 'image');
});

// Insert inline image markdown
function insertImage(url, alt) {
    const pos = article.selectionStart || 0;
    const text = `\n![${alt}](${url})\n`;
    article.value = article.value.slice(0, pos) + text + article.value.slice(pos);
}

// Publish blog
publishBtn.addEventListener('click', async () => {
    if (!blogTitle.value || !article.value) {
        alert('Add title and content');
        return;
    }

    const id = Math.random().toString(36).substring(2, 6);
    const docName = `${blogTitle.value.trim().split(" ").join("-")}-${id}`;
    const date = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    try {
        await setDoc(doc(db, "blogs", docName), {
            title: blogTitle.value,
            article: article.value,
            bannerImage: bannerPath || null,
            videoUrl: videoInput.value || null,
            category: categoryInput ? categoryInput.value : "general", // ✅ category stored
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        });
        alert("Blog published successfully!");
        location.href = `/${docName}`;
    } catch (e) {
        console.error(e);
        alert('Failed to publish blog');
    }
});

// Redirect to login if not authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "/login";
    }
});
