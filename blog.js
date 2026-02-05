// blog.js
import { db } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function loadBlog() {
    const blogId = location.pathname.split("/").pop();
    const docRef = doc(db, "blogs", blogId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();

        // Fill blog details
        const titleEl = document.querySelector(".title");
        const bannerEl = document.querySelector(".banner");
        const articleEl = document.querySelector(".article");
        const publishedEl = document.querySelector(".published");

        titleEl.innerText = data.title || "Untitled Blog";
        if (data.bannerImage) bannerEl.style.backgroundImage = `url(${data.bannerImage})`;
        articleEl.innerHTML = data.article || "";
        publishedEl.innerText = data.publishedAt || "";

        // Render video if exists
        if (data.videoUrl) {
            let embedUrl = "";
            // YouTube
            if (data.videoUrl.includes("youtube.com") || data.videoUrl.includes("youtu.be")) {
                const videoId = data.videoUrl.includes("v=") 
                    ? data.videoUrl.split("v=")[1].split("&")[0] 
                    : data.videoUrl.split("/").pop();
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }
            // Vimeo
            else if (data.videoUrl.includes("vimeo.com")) {
                const videoId = data.videoUrl.split("/").pop();
                embedUrl = `https://player.vimeo.com/video/${videoId}`;
            }

            if (embedUrl) {
                const videoContainer = document.createElement("div");
                videoContainer.classList.add("video-container");
                videoContainer.innerHTML = `
                    <iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
                `;
                articleEl.after(videoContainer);
            }
        }

    } else {
        document.body.innerHTML = "<h2>Blog not found</h2>";
    }
}

loadBlog();
