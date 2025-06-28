const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

// Cypress test expects these exact URLs in this order
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages() {
  // Clear previous
  output.innerHTML = "";
  errorDiv.textContent = "";
  loadingDiv.style.display = "block";

  // Parallel load
  Promise.all(images.map(image => downloadImage(image.url)))
    .then(imgElements => {
      loadingDiv.style.display = "none";
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = err.message;
    });
}

if (btn) {
  btn.addEventListener("click", downloadImages);
}
