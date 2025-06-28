const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function that returns a promise for loading an image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

// Main function to download all images using Promise.all
function downloadImages() {
  // Clear previous output/error
  output.innerHTML = "";
  errorDiv.innerText = "";

  // Show loading
  loadingDiv.style.display = "block";

  // Create an array of promises
  const promises = images.map(image => downloadImage(image.url));

  // Wait for all to resolve or any to reject
  Promise.all(promises)
    .then(loadedImages => {
      loadingDiv.style.display = "none";
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loadingDiv.style.display = "none";
      errorDiv.innerText = err.message;
    });
}

// Attach button click listener
btn.addEventListener("click", downloadImages);
