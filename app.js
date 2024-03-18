// INITIALIZE VARIABLES AND SELECT ELEMENTS
// Initialize access key for Unsplash API
const accessKey = "YOUR_API_KEY";
// Select form, image container, search input, and load more button elements
const searchForm = document.querySelector("form");
const imageContainer = document.querySelector(".image-container");
const searchInput = document.querySelector(".search-input");
const loadMoreButton = document.querySelector(".loadMoreButton");

// INITIALIZE PAGE COUNTER
// Initialize page counter for pagination
let page = 1;

// FUNCTION TO FETCH IMAGES
// Fetch images from Unsplash API based on search query and page number
const fetchImages = async (query, pageNo) => {
  try {
    // If it's the first page, clear existing images in the container
    if (page === 1) {
      imageContainer.innerHTML = "";
    }
    // Set maximum width for the image container
    imageContainer.style.maxWidth = "90%";
    // Construct URL for Unsplash API request
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=24&page=${pageNo}&client_id=${accessKey}`;
    // Fetch data from Unsplash API
    const response = await axios.get(url);
    // Extract image data from the response
    const imageArray = response.data.results;

    // If images are found, append them to the container
    if (imageArray.length > 0) {
      imageArray.forEach((element) => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${element.urls.regular}" alt="${element.alt_description}">`;
        imageContainer.appendChild(imageElement);
      });
      // Show or hide the "Load More" button based on pagination
      loadMoreButton.style.display =
        response.data.total_pages === pageNo ? "none" : "block";
    } else {
      // If no images are found, display a message
      imageContainer.innerHTML =
        "<h2>No images found for the given keyword. Please try using a different search term.</h2>";
      imageContainer.style.maxWidth = "100%";
      document.querySelector(".spinner").classList.add("hidden");
    }
  } catch (error) {
    // If an error occurs during fetching, display an appropriate message
    console.error("Error fetching images:", error);
    imageContainer.innerHTML =
      "<h2>Failed to fetch images. You've exceeded the rate limit for API requests. Please try again later.</h2>";
  }
};

// EVENT LISTENER FOR FORM SUBMISSION
// Add event listener for form submission to trigger image search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  // If search query is provided, fetch images; otherwise, display a message
  if (inputText) {
    page = 1;
    fetchImages(inputText, page);
    // Store search query in local storage
    localStorage.setItem("searchQuery", inputText);
  } else {
    imageContainer.innerHTML =
      "<h2>Please enter a search query to find images! 😊</h2>";
    imageContainer.style.maxWidth = "100%";
    loadMoreButton.style.display = "none";
  }
});

// EVENT LISTENER FOR "LOAD MORE" BUTTON
// Add event listener for "Load More" button to fetch more images
loadMoreButton.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});

// FETCH IMAGES BASED ON PREVIOUS SEARCH QUERY
// Fetch images based on the previous search query stored in local storage
window.addEventListener("load", () => {
  const storedQuery = localStorage.getItem("searchQuery");
  if (storedQuery) {
    searchInput.value = storedQuery;
    fetchImages(storedQuery, page);
  }
});
