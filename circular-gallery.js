// CircularGallery Component - Vanilla JavaScript Version
// Using OGL library for 3D effects

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function lerp(p1, p2, t) {
    return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
    const proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach((key) => {
        if (key !== "constructor" && typeof instance[key] === "function") {
            instance[key] = instance[key].bind(instance);
        }
    });
}

function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
    canvas.width = textWidth + 20;
    canvas.height = textHeight + 20;
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new OGL.Texture(gl, { generateMipmaps: false });
    texture.image = canvas;
    return { texture, width: canvas.width, height: canvas.height };
}

// Initialize CircularGallery instances
function initCircularGalleries() {
    // Robotics Events Gallery
    const roboticsContainer = document.getElementById('robotics-gallery');
    if (roboticsContainer) {
        const roboticsItems = [
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/upscalemedia-transformed%20(5).jpeg?raw=true', text: "Robo Rumble", eventType: "roborumble" },
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/WhatsApp%20Image%202025-08-04%20at%2020.03.31.jpeg?raw=true', text: "Game of Bots", eventType: "gob" },
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/rl-terms-1200x800-1.jpg?raw=true', text: "Ballista", eventType: "ballista" },
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/cyber-2377718_1920.jpg?raw=true', text: "Craftekon", eventType: "craftekon" },
            { image: 'https://raw.githubusercontent.com/Thecodlink/jps_techno_fiato/refs/heads/main/line-follwer-1.webp', text: "Lux Linea", eventType: "luxlinea" },
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/innovation-2901928_1920.jpg?raw=true', text: "TechNova", eventType: "technova" },
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/r2.jpeg?raw=true', text: "Robo-Rash", eventType: "roborash" }
        ];
        
        // Simple gallery for now - will enhance later
        roboticsContainer.innerHTML = `
            <div class="gallery-items">
                ${roboticsItems.map(item => `
                    <div class="gallery-item" data-event="${item.eventType}">
                        <img src="${item.image}" alt="${item.text}">
                        <h3>${item.text}</h3>
                    </div>
                `).join('')}
            </div>
        `;
        // Add click handlers for redirecting to event page
        roboticsContainer.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const eventType = this.getAttribute('data-event');
                if (eventType) {
                    window.location.href = `event.html?event=${eventType}`;
                }
            });
        });
    }

    // Technology Events Gallery
    const techContainer = document.getElementById('tech-gallery');
    if (techContainer) {
        const techItems = [
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/model.png?raw=true', text: "Modulus Virtuo", eventType: "modulusvirtuo" },
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/man-5638146.jpg?raw=true', text: "Editra", eventType: "editra" },
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/code-1076536_1920.jpg?raw=true', text: "Bytecoder", eventType: "bytecoder" },
            { image: 'https://github.com/Thecodlink/jps_techno_fiato/blob/main/astronaut-6771896.jpg?raw=true', text: "Pixel Petra", eventType: "pixelpetra" }
        ];
        
        techContainer.innerHTML = `
            <div class="gallery-items">
                ${techItems.map(item => `
                    <div class="gallery-item" data-event="${item.eventType}">
                        <img src="${item.image}" alt="${item.text}">
                        <h3>${item.text}</h3>
                    </div>
                `).join('')}
            </div>
        `;
        // Add click handlers for redirecting to event page
        techContainer.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const eventType = this.getAttribute('data-event');
                if (eventType) {
                    window.location.href = `event.html?event=${eventType}`;
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCircularGalleries, 100);
}); 
