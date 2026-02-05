// public/js/home.js
import { db } from './firebase.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const blogsSection = document.querySelector('.blogs-section');
const searchInput = document.querySelector('#search-input');
const categoryFilter = document.querySelector('#category-filter');
const searchBtn = document.querySelector('#search-btn');

async function loadBlogs(category = "all", keyword = "") {
    blogsSection.innerHTML = 'Loading...';

    // Fetch all blogs
    const snapshot = await getDocs(collection(db, "blogs"));
    blogsSection.innerHTML = "";

    snapshot.forEach(docItem => {
        const blog = docItem.data();

        // Filtering by category
        if (category !== "all" && blog.category !== category) return;

        // Filtering by keyword
        if (keyword && !(
            blog.title.toLowerCase().includes(keyword.toLowerCase()) ||
            blog.article.toLowerCase().includes(keyword.toLowerCase())
        )) return;

        blogsSection.innerHTML += `
            <div class="blog-card">
                <img src="${blog.bannerImage || 'img/default.png'}" class="blog-image" alt="">
                <h1 class="blog-title">${blog.title}</h1>
                <p class="blog-overview">${blog.article.substring(0,100)}...</p>
                <p class="blog-category"><b>Category:</b> ${blog.category || "general"}</p>
                <a href="/${docItem.id}" class="btn dark">Read</a>
            </div>
        `;
    });
}

// Event listener for search
searchBtn.addEventListener('click', () => {
    loadBlogs(categoryFilter.value, searchInput.value.trim());
});

// Load all blogs initially
loadBlogs();
