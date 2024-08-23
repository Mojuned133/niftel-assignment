document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-image');
    const thumbImages = document.querySelectorAll('.thumb-image');
    const backgroundImage = document.getElementById('background-image');
    const rotateLeftButton = document.getElementById('rotate-left');
    const rotateRightButton = document.getElementById('rotate-right');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const downloadButton = document.getElementById('download-button');
    const resetButton = document.getElementById('reset-button'); // Reset button, currently commented out in HTML
    const uploadImageInput = document.getElementById('upload-image');
    const uploadBackgroundInput = document.getElementById('upload-background');
    const blurOptionsContainer = document.querySelector('.blur-options');

    let currentRotation = 0;
    let currentScale = 1;

    // Image Selection (Change Background)
    thumbImages.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newImageSrc = thumb.getAttribute('data-image');
        console.log('New Image Src:', newImageSrc); // Debug log
        if (newImageSrc) {
          backgroundImage.style.backgroundImage = `url(${newImageSrc})`;
        } else {
          console.error('No data-image attribute found on thumb image.');
        }
      });
    });

    // Rotate Image
    rotateLeftButton.addEventListener('click', () => {
      currentRotation -= 90;
      updateTransform();
    });

    rotateRightButton.addEventListener('click', () => {
      currentRotation += 90;
      updateTransform();
    });

    // Zoom In/Zoom Out Image
    zoomInButton.addEventListener('click', () => {
      currentScale += 0.1;
      updateTransform();
    });

    zoomOutButton.addEventListener('click', () => {
      if (currentScale > 0.1) {
        currentScale -= 0.1;
        updateTransform();
      }
    });

    // Reset Transformations
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        currentRotation = 0;
        currentScale = 1;
        updateTransform();
      });
    }

    // Update Transform
    function updateTransform() {
      if (mainImage) {
        mainImage.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg) scale(${currentScale})`;
      }
    }

    // Download Preview Image
    downloadButton.addEventListener('click', () => {
      if (mainImage && backgroundImage) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match the main image
        canvas.width = mainImage.naturalWidth;
        canvas.height = mainImage.naturalHeight;

        // Draw background image on canvas
        const backgroundImg = new Image();
        backgroundImg.src = getComputedStyle(backgroundImage).backgroundImage.replace(/url\(["']?([^"']*)["']?\)/gi, '$1');
        backgroundImg.onload = () => {
          context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

          // Apply transformations to the main image
          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.rotate(currentRotation * Math.PI / 180);
          context.scale(currentScale, currentScale);
          context.translate(-canvas.width / 2, -canvas.height / 2);

          // Draw main image on canvas
          const mainImg = new Image();
          mainImg.src = mainImage.src;
          mainImg.onload = () => {
            context.drawImage(mainImg, 0, 0, canvas.width, canvas.height);

            // Restore context state
            context.restore();

            // Trigger download
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'preview-image.png';
            link.click();
          };

          mainImg.onerror = () => {
            console.error('Error loading the main image for download.');
          };
        };

        backgroundImg.onerror = () => {
          console.error('Error loading the background image for download.');
        };
      } else {
        console.error('Main image or background image not found for download.');
      }
    });

    // Upload Main Image
    uploadImageInput.addEventListener('change', () => {
      const file = uploadImageInput.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        if (mainImage) {
          mainImage.src = url;
          generateBlurOptions(url); // Generate blur options for the uploaded image
        }
      } else {
        console.error('No file selected for upload.');
      }
    });

    // Upload Background Image
    uploadBackgroundInput.addEventListener('change', () => {
      const file = uploadBackgroundInput.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        if (backgroundImage) {
          backgroundImage.style.backgroundImage = `url(${url})`;
        }
      } else {
        console.error('No file selected for background upload.');
      }
    });

    // Generate Blur Options
    function generateBlurOptions(imageUrl) {
      if (blurOptionsContainer) {
        blurOptionsContainer.innerHTML = ''; // Clear existing options

        const blurLevels = ['0px', '2px', '4px', '6px'];

        blurLevels.forEach(blurLevel => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const img = new Image();

          img.src = imageUrl;
          img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            context.filter = `blur(${blurLevel})`;
            context.drawImage(img, 0, 0);

            const imgElement = document.createElement('img');
            imgElement.src = canvas.toDataURL();
            imgElement.alt = `Blur ${blurLevel}`;
            imgElement.classList.add('blur-option');
            imgElement.dataset.blur = blurLevel;

            blurOptionsContainer.appendChild(imgElement);
          };

          img.onerror = () => {
            console.error('Error loading the image for blur options.');
          };
        });
      }
    }

    // Handle Blur Click
    blurOptionsContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('blur-option')) {
        const blur = event.target.dataset.blur;
        if (backgroundImage) {
          backgroundImage.style.filter = `blur(${blur})`;
        }
      }
    });

    // Initialize with default image (optional)
    const defaultImageUrl = 'path/to/cute-cat-images-download-7.png'; // Replace with actual relative path
    if (mainImage) {
      mainImage.src = defaultImageUrl;
      generateBlurOptions(defaultImageUrl);
    }
  });
