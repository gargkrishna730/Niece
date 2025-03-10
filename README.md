# Baby Photo Gallery

A beautiful animated photo gallery with background music, designed as a special gift to showcase your niece's precious moments.

## Features

- 💫 Animated photo transitions with beautiful effects
- 🎵 Background music that can be toggled on/off
- 👶 Modern and cute design perfect for baby photos
- 📱 Fully responsive design that works on all devices
- 🖼️ Thumbnail navigation for easy browsing
- ❤️ Cute floating heart animations

## How to Use

### Basic Setup

1. Download all the files in this repository
2. Replace the placeholder photos with your actual baby photos
3. Replace the background music with a lullaby or song of your choice
4. Open `index.html` in a web browser to view the gallery

### Adding Your Photos

To add your own photos, edit the `script.js` file. Look for the `imageData` array near the top of the file:

```javascript
const imageData = [
    {
        src: 'path/to/your/photo1.jpg',
        caption: 'Welcome to the world, little angel!'
    },
    // Add more photos here
];
```

Replace the placeholder URLs with the paths to your actual photos. For each photo, you can also customize the caption text.

### Adding Your Background Music

1. Add your own MP3 file to the website folder
2. Edit the `index.html` file and update the audio source:

```html
<audio id="background-music" loop>
    <source src="your-music-file.mp3" type="audio/mp3">
    Your browser does not support the audio element.
</audio>
```

## Customization

### Changing Colors

You can easily customize the color scheme by editing the CSS variables in the `styles.css` file:

```css
:root {
    --primary-color: #ff9fb5;
    --secondary-color: #a5d8f3;
    --accent-color: #f3c5ff;
    /* More color variables */
}
```

### Changing the Title

Edit the header section in `index.html` to customize the title and subtitle:

```html
<header>
    <h1 class="gallery-title">Your Custom Title Here</h1>
    <p class="gallery-subtitle">Your custom subtitle here</p>
</header>
```

### Adjusting Animation Speed

You can change how long each slide appears by modifying the `animationDelay` variable in `script.js`:

```javascript
const animationDelay = 4000; // Time in milliseconds (4 seconds)
```

## Usage Tips

- Press the spacebar to play/pause the slideshow
- Press the left/right arrow keys to navigate between photos
- Press "M" to toggle the background music
- Click on any thumbnail to jump directly to that photo

## Technical Details

This gallery uses:
- HTML5 for structure
- CSS3 for styling and animations
- JavaScript for interactivity
- Font Awesome icons

No external libraries or frameworks are required, making it easy to host anywhere.

## Hosting Suggestions

For the best experience when sharing with family, consider hosting this gallery on:
- GitHub Pages (free and easy)
- Netlify (free with simple drag-and-drop deployment)
- Any web hosting service you already use

Enjoy sharing these precious memories! 💕 