document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('main-image');
  const thumbImages = document.querySelectorAll('.thumb-image');
  const backgroundImage = document.getElementById('background-image');
  const rotateLeftButton = document.getElementById('rotate-left');
  const rotateRightButton = document.getElementById('rotate-right');
  const zoomInButton = document.getElementById('zoom-in');
  const zoomOutButton = document.getElementById('zoom-out');
  const downloadButton = document.getElementById('download-button');
  const uploadImageInput = document.getElementById('upload-image');
  const uploadBackgroundInput = document.getElementById('upload-background');
  const blurOptionsContainer = document.querySelector('.blur-options');

  let currentRotation = 0;
  let currentScale = 1;

  // Upload Main Image
  uploadImageInput.addEventListener('change', () => {
      const file = uploadImageInput.files[0];
      if (file) {
          const url = URL.createObjectURL(file);
          mainImage.src = url;
          generateBlurOptions(url); // Generate blur options for the uploaded image
      }
  });

  // Upload Background Image
  uploadBackgroundInput.addEventListener('change', () => {
      const file = uploadBackgroundInput.files[0];
      if (file) {
          const url = URL.createObjectURL(file);
          backgroundImage.style.backgroundImage = `url(${url})`;
      }
  });

  // Image Selection (Change Background)
  thumbImages.forEach(thumb => {
      thumb.addEventListener('click', () => {
          const newImageSrc = thumb.getAttribute('data-image');
          backgroundImage.style.backgroundImage = `url(${newImageSrc})`;
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

  // Update Transform
  function updateTransform() {
      mainImage.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg) scale(${currentScale})`;
  }

  // Download Preview Image
  downloadButton.addEventListener('click', () => {
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
              context.restore();

              // Trigger download
              const link = document.createElement('a');
              link.href = canvas.toDataURL('image/png');
              link.download = 'preview-image.png';
              link.click();
          };
      };
  });

  // Generate Blur Options
  function generateBlurOptions(imageUrl) {
      blurOptionsContainer.innerHTML = ''; 

      const blurLevels = ['1px', '2px', '3px', '4px'];

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
      });
  }

  // Handle Blur Click
  blurOptionsContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('blur-option')) {
          const blur = event.target.dataset.blur;
          backgroundImage.style.filter = `blur(${blur})`;
      }
  });

  // Initialize with default image
  const defaultImageUrl = '/images/cat1.png';
  if (mainImage) {
    mainImage.src = defaultImageUrl;
    generateBlurOptions(defaultImageUrl);
  }

});
