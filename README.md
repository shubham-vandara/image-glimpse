# Image Glimpse

A React application that allows users to search and view images from Unsplash with a dynamic gradient background. Users can favorite images and view them in a separate section.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Key](#api-key)
- [Acknowledgements](#acknowledgements)
- [Author](#author)

## Features

- Search for images using the Unsplash API.
- Infinite scrolling to load more images as you scroll down.
- Dynamic gradient background using a canvas element.
- Favorite images and view them in a separate favorites section.
- Responsive design for optimal viewing on various devices.
- Download images directly from the gallery.
- Toast notifications for user actions.

## Technologies Used

- React
- Vite
- Tailwind CSS
- Unsplash API

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/shubham-vandara/image-glimpse.git
   ```
2. Navigate to the project directory:
   ```bash
   cd image-glimpse-react
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173` to view the application.

## API Key

To use the Unsplash API, you need to obtain an API key:

1. Sign up at [Unsplash Developers](https://unsplash.com/developers).
2. Create a new application to get your access key.
3. Replace the placeholder in `src/components/ImageGallery.jsx` with your actual access key.

```javascript
const accessKey = "YOUR_UNSPLASH_API_KEY"; // Put your key here 🔑
```

## Acknowledgements

- [Unsplash](https://unsplash.com/) for providing a great API for images.
- [Vite](https://vite.dev/) for the fast development environment.
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.

## Author

[Shubham Vandara](https://github.com/shubham-vandara)
