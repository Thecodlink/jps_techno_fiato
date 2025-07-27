// Hyperspeed Effect Implementation
class HyperspeedEffect {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xFFFFFF,
                brokenLines: 0xFFFFFF,
                leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
                sticks: 0x03B3C3,
            },
            ...options
        };

        this.disposed = false;
        this.init();
    }

    init() {
        // Initialize Three.js scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.options.colors.background);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            this.options.fov,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            10000
        );
        this.camera.position.z = -5;
        this.camera.position.y = 8;
        this.camera.position.x = 0;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Fog setup
        let fog = new THREE.Fog(
            this.options.colors.background,
            this.options.length * 0.2,
            this.options.length * 500
        );
        this.scene.fog = fog;

        // Clock for animations
        this.clock = new THREE.Clock();
        
        // Animation state
        this.fovTarget = this.options.fov;
        this.speedUpTarget = 0;
        this.speedUp = 0;
        this.timeOffset = 0;

        // Initialize components
        this.initRoad();
        this.initCarLights();
        this.initLightSticks();

        // Event listeners
        this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.container.addEventListener('mouseout', this.onMouseUp.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Start animation loop
        this.animate();
    }

    initRoad() {
        const options = this.options;
        
        // Create road geometry
        const roadGeometry = new THREE.PlaneGeometry(options.roadWidth, options.length, 20, 100);
        const roadMaterial = new THREE.MeshBasicMaterial({ 
            color: options.colors.roadColor,
            transparent: true,
            opacity: 0.8
        });
        
        this.road = new THREE.Mesh(roadGeometry, roadMaterial);
        this.road.rotation.x = -Math.PI / 2;
        this.road.position.z = -options.length / 2;
        this.scene.add(this.road);

        // Create island
        const islandGeometry = new THREE.PlaneGeometry(options.islandWidth, options.length, 20, 100);
        const islandMaterial = new THREE.MeshBasicMaterial({ 
            color: options.colors.islandColor,
            transparent: true,
            opacity: 0.6
        });
        
        this.island = new THREE.Mesh(islandGeometry, islandMaterial);
        this.island.rotation.x = -Math.PI / 2;
        this.island.position.z = -options.length / 2;
        this.scene.add(this.island);
    }

    initCarLights() {
        const options = this.options;
        
        // Create car light geometries
        const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        
        // Left car lights
        this.leftCarLights = [];
        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
            const light = new THREE.Mesh(lightGeometry, new THREE.MeshBasicMaterial({ 
                color: options.colors.leftCars[Math.floor(Math.random() * options.colors.leftCars.length)],
                transparent: true,
                opacity: 0.8
            }));
            light.position.setX(-options.roadWidth / 2 - options.islandWidth / 2);
            light.position.setY(0.5);
            light.position.setZ(-i * 10);
            this.scene.add(light);
            this.leftCarLights.push(light);
        }

        // Right car lights
        this.rightCarLights = [];
        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
            const light = new THREE.Mesh(lightGeometry, new THREE.MeshBasicMaterial({ 
                color: options.colors.rightCars[Math.floor(Math.random() * options.colors.rightCars.length)],
                transparent: true,
                opacity: 0.8
            }));
            light.position.setX(options.roadWidth / 2 + options.islandWidth / 2);
            light.position.setY(0.5);
            light.position.setZ(-i * 10);
            this.scene.add(light);
            this.rightCarLights.push(light);
        }
    }

    initLightSticks() {
        const options = this.options;
        
        // Create light stick geometry
        const stickGeometry = new THREE.BoxGeometry(0.1, 2, 0.1);
        const stickMaterial = new THREE.MeshBasicMaterial({ 
            color: options.colors.sticks,
            transparent: true,
            opacity: 0.6
        });
        
        this.lightSticks = [];
        for (let i = 0; i < options.totalSideLightSticks; i++) {
            const stick = new THREE.Mesh(stickGeometry, stickMaterial);
            stick.position.setX(-(options.roadWidth + options.islandWidth / 2));
            stick.position.setY(1);
            stick.position.setZ(-i * 20);
            this.scene.add(stick);
            this.lightSticks.push(stick);
        }
    }

    onMouseDown(ev) {
        if (this.options.onSpeedUp) this.options.onSpeedUp(ev);
        this.fovTarget = this.options.fovSpeedUp;
        this.speedUpTarget = this.options.speedUp;
    }

    onMouseUp(ev) {
        if (this.options.onSlowDown) this.options.onSlowDown(ev);
        this.fovTarget = this.options.fov;
        this.speedUpTarget = 0;
    }

    onWindowResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    update(delta) {
        // Update speed
        const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
        this.speedUp += this.lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);
        this.timeOffset += this.speedUp * delta;

        const time = this.clock.elapsedTime + this.timeOffset;

        // Update car lights
        this.leftCarLights.forEach((light, index) => {
            light.position.z = -index * 10 - (time * 60) % (this.options.length);
            if (light.position.z > 0) {
                light.position.z -= this.options.length;
            }
        });

        this.rightCarLights.forEach((light, index) => {
            light.position.z = -index * 10 - (time * 80) % (this.options.length);
            if (light.position.z > 0) {
                light.position.z -= this.options.length;
            }
        });

        // Update light sticks
        this.lightSticks.forEach((stick, index) => {
            stick.position.z = -index * 20 - (time * 40) % (this.options.length);
            if (stick.position.z > 0) {
                stick.position.z -= this.options.length;
            }
        });

        // Update camera FOV
        const fovChange = this.lerp(this.camera.fov, this.fovTarget, lerpPercentage);
        if (fovChange !== 0) {
            this.camera.fov += fovChange * delta * 6;
            this.camera.updateProjectionMatrix();
        }

        // Add camera shake effect
        const shakeIntensity = this.speedUp * 0.1;
        this.camera.position.x = Math.sin(time * 10) * shakeIntensity;
        this.camera.position.y = 8 + Math.cos(time * 8) * shakeIntensity;
    }

    lerp(current, target, speed = 0.1, limit = 0.001) {
        let change = (target - current) * speed;
        if (Math.abs(change) < limit) {
            change = target - current;
        }
        return change;
    }

    animate() {
        if (this.disposed) return;
        
        const delta = this.clock.getDelta();
        this.update(delta);
        this.renderer.render(this.scene, this.camera);
        
        requestAnimationFrame(this.animate.bind(this));
    }

    dispose() {
        this.disposed = true;
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.scene) {
            this.scene.clear();
        }
        
        // Remove event listeners
        window.removeEventListener("resize", this.onWindowResize.bind(this));
        if (this.container) {
            this.container.removeEventListener("mousedown", this.onMouseDown);
            this.container.removeEventListener("mouseup", this.onMouseUp);
            this.container.removeEventListener("mouseout", this.onMouseUp);
        }
    }
}

// Initialize Hyperspeed effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hyperspeed-container');
    if (container) {
        const hyperspeed = new HyperspeedEffect(container, {
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xFFFFFF,
                brokenLines: 0xFFFFFF,
                leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
                sticks: 0x03B3C3,
            }
        });
    }
}); 