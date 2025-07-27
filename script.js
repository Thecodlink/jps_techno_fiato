// GSAP ScrollTrigger Registration
gsap.registerPlugin(ScrollTrigger);

// Background themes for each event - minimal changes
const backgroundThemes = {
    hero: 'var(--bg-theme-1)',
    roborush: 'var(--bg-theme-1)',
    gob: 'var(--bg-theme-1)',
    ballista: 'var(--bg-theme-1)',
    labyrinx: 'var(--bg-theme-1)',
    luxlinea: 'var(--bg-theme-1)',
    technova: 'var(--bg-theme-1)',
    modelus: 'var(--bg-theme-1)',
    cineframe: 'var(--bg-theme-1)',
    assembyte: 'var(--bg-theme-1)',
    pixelpetra: 'var(--bg-theme-1)',
    registration: 'var(--bg-theme-1)'
};

// Event titles for sticky header
const eventTitles = {
    hero: 'Welcome to TECHNOFIATO',
    roborush: 'R³: RoboRush',
    gob: 'G.O.B: Game of Bots',
    ballista: 'BALLISTA: RoboSoccer',
    labyrinx: 'Labyrinx: Bot Maze',
    luxlinea: 'LuxLinea: Path Bot Race',
    technova: 'TechNova: Innovation Challenge',
    modelus: 'Modelus Virtuo',
    cineframe: 'Cine Frame',
    assembyte: 'Assembyte',
    pixelpetra: 'Pixel Petra',
    registration: 'Join TECHNOFIATO'
};

// Neon glow colors for dynamic effects
const neonColors = {
    roborush: 'var(--neon-cyan)',
    gob: 'var(--neon-magenta)',
    ballista: 'var(--neon-yellow)',
    labyrinx: 'var(--neon-green)',
    luxlinea: 'var(--neon-blue)',
    technova: 'var(--neon-orange)',
    modelus: 'var(--neon-purple)',
    cineframe: 'var(--neon-red)',
    assembyte: 'var(--neon-pink)',
    pixelpetra: 'var(--neon-lime)'
};

// Initialize GSAP animations
function initAnimations() {
    // Animate hero card on scroll
    gsap.fromTo('.hero-card', 
        {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotationX: 45
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.hero-card',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Scroll Reveal for .scroll-reveal-block
    document.querySelectorAll('.scroll-reveal-block').forEach((el) => {
        gsap.to(el, {
            opacity: 1,
            filter: 'blur(0px)',
            rotate: 0,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse',
                onEnter: () => el.classList.add('revealed'),
                onLeaveBack: () => el.classList.remove('revealed')
            }
        });
    });

    // Animate event cards on horizontal scroll
    gsap.utils.toArray('.events-scroll-container .event-card').forEach((card, index) => {
        gsap.fromTo(card, 
            {
                opacity: 0,
                x: 100,
                scale: 0.8,
                rotationY: 45
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "left 80%",
                    end: "right 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Hover animations with dynamic glow
        card.addEventListener('mouseenter', () => {
            const eventType = card.getAttribute('data-event');
            const neonColor = neonColors[eventType];
            
            gsap.to(card, {
                y: -20,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (neonColor) {
                gsap.to(card, {
                    boxShadow: neonColor,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            const eventType = card.getAttribute('data-event');
            const neonColor = neonColors[eventType];
            
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            if (neonColor) {
                gsap.to(card, {
                    boxShadow: neonColor,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });

    // Sticky header animations
    gsap.to('.sticky-header', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const progress = self.progress;
                if (progress > 0.1) {
                    gsap.to('.sticky-header', {
                        background: 'rgba(10, 10, 10, 0.98)',
                        duration: 0.3
                    });
                } else {
                    gsap.to('.sticky-header', {
                        background: 'rgba(10, 10, 10, 0.95)',
                        duration: 0.3
                    });
                }
            }
        }
    });
}

// Horizontal scroll functionality
function initHorizontalScroll() {
    const scrollContainer = document.querySelector('.events-scroll-container');
    
    if (scrollContainer) {
        // Add scroll indicators
        const leftIndicator = document.createElement('div');
        leftIndicator.className = 'scroll-indicator left';
        leftIndicator.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const rightIndicator = document.createElement('div');
        rightIndicator.className = 'scroll-indicator right';
        rightIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        const eventsContainer = document.querySelector('.events-container');
        eventsContainer.appendChild(leftIndicator);
        eventsContainer.appendChild(rightIndicator);
        
        // Scroll functionality
        leftIndicator.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        });
        
        rightIndicator.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        });
        
        // Update indicators based on scroll position
        scrollContainer.addEventListener('scroll', () => {
            const isAtStart = scrollContainer.scrollLeft === 0;
            const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth;
            
            leftIndicator.style.opacity = isAtStart ? '0.3' : '1';
            rightIndicator.style.opacity = isAtEnd ? '0.3' : '1';
        });
        
        // Initialize indicators
        leftIndicator.style.opacity = '0.3';
    }
}

// Dynamic background transitions - minimal changes
function initBackgroundTransitions() {
    const sections = gsap.utils.toArray('.event-section');
    
    sections.forEach((section, index) => {
        const eventType = section.getAttribute('data-event');
        const bgLayer1 = document.querySelector('.bg-layer-1');
        
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                // Update current event title
                const eventTitle = document.querySelector('.event-title');
                if (eventTitle && eventTitles[eventType]) {
                    gsap.to(eventTitle, {
                        text: eventTitles[eventType],
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }

                // Minimal background transition - keep it black
                const theme = backgroundThemes[eventType];
                if (theme) {
                    gsap.to(bgLayer1, {
                        background: theme,
                        duration: 0.8,
                        ease: "power2.inOut"
                    });
                }
            },
            onEnterBack: () => {
                // Update current event title
                const eventTitle = document.querySelector('.event-title');
                if (eventTitle && eventTitles[eventType]) {
                    gsap.to(eventTitle, {
                        text: eventTitles[eventType],
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }

                // Minimal background transition - keep it black
                const theme = backgroundThemes[eventType];
                if (theme) {
                    gsap.to(bgLayer1, {
                        background: theme,
                        duration: 0.8,
                        ease: "power2.inOut"
                    });
                }
            }
        });
    });
}

// Particle.js Configuration
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00ffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.3,
                random: false,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ffff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Event Data for Modals
const eventData = {
    roborush: {
        title: "R³: RoboRush",
        icon: "fas fa-robot",
        overview: "Control your robot through a wild obstacle course with strategic challenges. Complete the obstacle fastest to win!",
        rules: [
            "Max 2 participants per team",
            "Bot max size: 25cm x 25cm",
            "Manual control (wired or wireless)",
            "Time penalties for going off-track: +15 sec",
            "Skipping steps: +20 sec",
            "Touching your bot: +10 sec",
            "Fastest completion wins"
        ],
        specs: [
            "Bot dimensions: 25cm x 25cm maximum",
            "Power: Wired or wireless control",
            "Control: Manual remote operation",
            "Arena: Obstacle course with ramps and curves"
        ],
        judging: [
            "Completion time (primary)",
            "Number of penalties",
            "Control precision",
            "Strategic navigation"
        ]
    },
    gob: {
        title: "G.O.B: Game of Bots",
        icon: "fas fa-fist-raised",
        overview: "Bot vs Bot in a circular arena, gaining points through strategic hits, knockouts, and survival. A dynamic arena-style setup for intense combat action!",
        rules: [
            "1v1 or Team-based bot matches",
            "Points awarded for strategic hits",
            "Points awarded for knockouts",
            "Wired or wireless bots allowed",
            "Add-ons allowed but checked by core team",
            "Ring size: Circular combat arena",
            "Match duration: 3 minutes per round"
        ],
        specs: [
            "Bot dimensions: 25cm x 25cm maximum",
            "Weight limit: 3kg maximum",
            "Power: Wired or wireless",
            "Weapons: No flame or liquid-based components"
        ],
        judging: [
            "Total points scored",
            "Control precision",
            "Engineering design",
            "Strategic gameplay"
        ]
    },
    ballista: {
        title: "BALLISTA: RoboSoccer",
        icon: "fas fa-futbol",
        overview: "Two teams go head-to-head in a fast-paced soccer match using remote-controlled bots to push/pull a lightweight ball into the opponent's goalpost.",
        rules: [
            "Max 2 participants per team",
            "Arena has fixed goalposts and smooth boundary",
            "Ball size and weight specified on match day",
            "Only remote-controlled bots allowed",
            "No weapons, flame, or liquid-based components",
            "Match duration: 4 minutes per game (2 mins per half)",
            "No intentional ramming/damaging opponent's bot",
            "Teams must remain behind control zone line",
            "Scoring: 1 point per goal, knockout format"
        ],
        specs: [
            "Bot dimensions: 25cm x 25cm maximum",
            "Weight limit: 3kg maximum",
            "Power: Wired (through battery) or wireless (RC module)",
            "Control: Remote operation only"
        ],
        judging: [
            "Goals scored",
            "Team coordination",
            "Bot maneuverability",
            "Strategic gameplay"
        ]
    },
    labyrinx: {
        title: "Labyrinx: Bot Maze",
        icon: "fas fa-route",
        overview: "Navigate your bot through a challenging maze filled with dead ends, detours, and checkpoints. Speed and precision both matter in this autonomous challenge.",
        rules: [
            "Max 2 members per team",
            "Maze path revealed only 2 minutes before run",
            "Checkpoints may be present; missing one results in time penalties",
            "Bot must not touch walls more than 3 times",
            "Max time limit: 5 minutes per run",
            "Fastest bot with least penalties wins"
        ],
        specs: [
            "Bot dimensions: 20cm x 20cm maximum",
            "Power: On-board batteries only",
            "Control: Autonomous operation",
            "Sensors: IR/reflective sensors for wall detection"
        ],
        judging: [
            "Completion time",
            "Number of wall touches",
            "Checkpoint accuracy",
            "Path optimization"
        ]
    },
    luxlinea: {
        title: "LuxLinea: Path Bot Race",
        icon: "fas fa-road",
        overview: "An autonomous Arduino bot must follow a black path on a white surface and complete the course as fast as possible. Pure autonomous navigation challenge!",
        rules: [
            "Max 2 participants per team",
            "Bot must be Arduino-based",
            "Only IR/reflective sensors allowed for path detection",
            "Path may include curves, 90° turns, T-junctions, and mild inclines",
            "Off-track = Time penalty or disqualification (after 3 attempts)",
            "Time limit: 3 minutes per bot",
            "Fastest and most accurate bot wins"
        ],
        specs: [
            "Bot dimensions: 20cm x 20cm maximum",
            "No human control after start",
            "On-board power only",
            "Sensors: IR/reflective sensors only"
        ],
        judging: [
            "Completion time",
            "Path following accuracy",
            "Speed optimization",
            "Autonomous performance"
        ]
    },
    technova: {
        title: "TechNova: Innovation Challenge",
        icon: "fas fa-lightbulb",
        overview: "Teams will present a working model using sensors and Arduino or basic robotics kits aimed at solving daily-life problems. Innovation meets practicality!",
        rules: [
            "Max 3 members per team",
            "Pre-built models must be presented at venue",
            "5 minutes for demo + 2 minutes Q&A by judges",
            "Models must use at least 1 sensor (IR, ultrasonic, temperature, etc.)",
            "Models must be working (functional demo required)",
            "Bonus awarded for sustainable or eco-friendly projects"
        ],
        specs: [
            "Hardware: Arduino or basic robotics kits",
            "Sensors: Minimum 1 sensor required",
            "Power: Self-contained power source",
            "Size: Portable and demo-friendly"
        ],
        judging: [
            "Innovation and creativity",
            "Practicality and real-world application",
            "Technical implementation",
            "Presentation quality",
            "Bonus: Sustainability factor"
        ]
    },
    modelus: {
        title: "Modelus Virtuo: 3D Modeling Showdown",
        icon: "fas fa-cube",
        overview: "Participants will use Blender to create a detailed 3D model based on a theme disclosed at the start of the event. This could be a product design, architectural model, character, or futuristic object.",
        rules: [
            "Solo or Teams of 2 (Grades 9-12)",
            "Only Blender software allowed (pre-installed in school labs)",
            "Time limit: 2.5 hours",
            "No external asset imports or textures",
            "Internet usage strictly prohibited",
            "All renders must be original and made during the event"
        ],
        specs: [
            "Software: Blender only",
            "Hardware: School computer lab equipment",
            "Theme: Disclosed at event start",
            "Output: Rendered images and 3D model file"
        ],
        judging: [
            "Complexity and detailing",
            "Creativity and relevance to theme",
            "Lighting and rendering techniques",
            "Mesh cleanliness and topology",
            "Realism or stylization as per theme"
        ]
    },
    cineframe: {
        title: "Cine Frame: Movie Making + Editing Challenge",
        icon: "fas fa-video",
        overview: "A three-member team is required to shoot and edit a new video clip providing event coverage. The video must incorporate dialogue, transitions, and sound, using only the tools provided.",
        rules: [
            "Teams of 3 students from Grades 9-12",
            "Internet access not allowed",
            "No presets, templates, or stock footage from online sources",
            "Must use only inbuilt effects, music, and transitions",
            "Video must be rendered and submitted within specified time",
            "Folder with presets, sound effects, and stock overlays provided"
        ],
        specs: [
            "Software: Adobe Premiere Pro, Filmora, Adobe After Effects, Adobe Photoshop",
            "Equipment: School computer lab",
            "Duration: Event-specified time limit",
            "Output: Final rendered video file"
        ],
        judging: [
            "Storyline and theme alignment",
            "Cinematic quality (angles and transitions)",
            "Editing skill and originality",
            "Sound design and music usage"
        ]
    },
    assembyte: {
        title: "Assembyte: Hardware Assembly Showdown",
        icon: "fas fa-tools",
        overview: "Participants will be tested on hardware skills, including assembling, disassembling, and diagnosing a PC. Bonus rounds may include identifying dummy faults or upgrading components.",
        rules: [
            "Solo event (Grades 9-12)",
            "School provides PC parts and workspace",
            "Rounds include: Fastest Full Assembly, Fault Identification, Cable management, Peripheral compatibility",
            "Technical knowledge tested through MCQs or viva",
            "Safety and ESD protocol awareness required"
        ],
        specs: [
            "Hardware: PC components provided by school",
            "Tools: Basic assembly tools available",
            "Time: Event-specified time limits per round",
            "Workspace: Dedicated assembly area"
        ],
        judging: [
            "Speed and accuracy",
            "Correct cable management",
            "Technical knowledge (MCQs or viva)",
            "Safety and ESD protocol awareness"
        ]
    },
    pixelpetra: {
        title: "Pixel Petra: MS Paint Design Sprint",
        icon: "fas fa-palette",
        overview: "Participants will use MS Paint to create art on a given theme (e.g., 'Future Tech,' 'Space City,' 'Eco World') in a limited time. Pure creativity challenge!",
        rules: [
            "Solo event (Grades 6-8)",
            "Software: Microsoft Paint only",
            "Time limit: 1 hour",
            "No internet or references allowed",
            "Theme announced just before the event"
        ],
        specs: [
            "Software: Microsoft Paint",
            "Hardware: School computer lab",
            "Theme: Disclosed at event start",
            "Output: Digital artwork file"
        ],
        judging: [
            "Creativity and imagination",
            "Use of MS Paint tools",
            "Relevance to theme",
            "Coloring and line work"
        ]
    }
};

// Modal functionality
function openEventModal(eventType) {
    const modal = document.getElementById('event-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalIcon = document.querySelector('.modal-icon');
    const eventOverview = document.querySelector('.event-overview');
    const eventRules = document.querySelector('.event-rules');
    const eventSpecs = document.querySelector('.event-specs');
    const eventJudging = document.querySelector('.event-judging');
    const closeBtn = document.querySelector('.close');
    
    const event = eventData[eventType];
    
    if (event) {
        modalTitle.textContent = event.title;
        modalIcon.innerHTML = `<i class="${event.icon}"></i>`;
        
        eventOverview.innerHTML = `
            <h3>Overview</h3>
            <p>${event.overview}</p>
        `;
        
        eventRules.innerHTML = `
            <h3>Rules</h3>
            <ul>
                ${event.rules.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
        `;
        
        eventSpecs.innerHTML = `
            <h3>Specifications</h3>
            <ul>
                ${event.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
        `;
        
        eventJudging.innerHTML = `
            <h3>Judging Criteria</h3>
            <ul>
                ${event.judging.map(criterion => `<li>${criterion}</li>`).join('')}
            </ul>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animate modal entrance
        gsap.fromTo('.modal-content', 
            {
                opacity: 0,
                scale: 0.8,
                y: 50
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out"
            }
        );
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('event-modal');
    gsap.to('.modal-content', {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    initBackgroundTransitions();
    initHorizontalScroll();
    initParticles();
    initCountUpAnimations();
    initScheduleAnimations();
    
    // Modal event listeners
    const modal = document.getElementById('event-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Form submission
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.teamName || !data.school || !data.email || !data.phone) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            
            // Simulate form submission
            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Registration submitted successfully! We will contact you soon.');
                registrationForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 100
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
});

// CountUp Animation Component
class CountUp {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            from: 0,
            to: parseInt(element.getAttribute('data-count')) || 0,
            suffix: element.getAttribute('data-suffix') || '',
            duration: 2,
            delay: 0,
            ...options
        };
        
        this.current = this.options.from;
        this.startTime = null;
        this.isAnimating = false;
        this.hasAnimated = false;
    }

    start() {
        if (this.isAnimating || this.hasAnimated) return;
        
        this.isAnimating = true;
        this.startTime = performance.now();
        this.animate();
    }

    animate() {
        if (!this.isAnimating) return;

        const elapsed = (performance.now() - this.startTime) / 1000;
        const progress = Math.min(elapsed / this.options.duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        this.current = this.options.from + (this.options.to - this.options.from) * easeOut;
        
        // Update the element
        this.element.textContent = Math.floor(this.current) + this.options.suffix;
        
        if (progress < 1) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.isAnimating = false;
            this.hasAnimated = true;
        }
    }

    reset() {
        this.current = this.options.from;
        this.hasAnimated = false;
        this.isAnimating = false;
        this.element.textContent = this.options.from + this.options.suffix;
    }
}

// Initialize CountUp animations
function initCountUpAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const countUps = [];

    // Create CountUp instances
    statNumbers.forEach((element, index) => {
        const countUp = new CountUp(element, {
            delay: index * 0.2 // Stagger the animations
        });
        countUps.push(countUp);
    });

    // Intersection Observer to trigger animations when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(statNumbers).indexOf(entry.target);
                if (index !== -1 && countUps[index]) {
                    countUps[index].start();
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe each stat number
    statNumbers.forEach(element => {
        observer.observe(element);
    });
}

// Schedule Timeline Animations
function initScheduleAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Make openEventModal globally available
window.openEventModal = openEventModal; 