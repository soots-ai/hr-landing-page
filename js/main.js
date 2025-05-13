// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
        navLinks.classList.contains('active').toString()
    );
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && 
        !navLinks.contains(e.target) && 
        navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    themeToggle.checked = true;
    body.setAttribute('data-theme', 'dark');
}

// Process steps functionality
const processSteps = document.querySelectorAll('.process-step');
let currentStep = 0;

function activateStep(index) {
    processSteps.forEach((step, i) => {
        if (i <= index) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Auto advance steps every 2 seconds
function autoAdvanceSteps() {
    currentStep = (currentStep + 1) % processSteps.length;
    activateStep(currentStep);
}

let autoAdvanceInterval = setInterval(autoAdvanceSteps, 2000);

// Handle manual step clicks
processSteps.forEach((step, index) => {
    step.addEventListener('click', () => {
        clearInterval(autoAdvanceInterval);
        currentStep = index;
        activateStep(currentStep);
        autoAdvanceInterval = setInterval(autoAdvanceSteps, 2000);
    });
});

// Showcase tabs functionality
const showcaseTabs = document.querySelectorAll('.showcase-tab');
const showcaseContents = document.querySelectorAll('.showcase-tab-content');

let currentTabIndex = 0;

showcaseTabs.forEach((tab, index) => {
    if (tab.classList.contains('active')) {
        currentTabIndex = index;
    }
    
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        const newIndex = index;
        
        // Determine slide direction
        const direction = newIndex > currentTabIndex ? 'left' : 'right';
        
        // Remove active class from all tabs
        showcaseTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Handle content transition
        const targetContent = document.querySelector(`.showcase-tab-content[data-tab="${tabId}"]`);
        const currentContent = document.querySelector('.showcase-tab-content.active');
        
        if (currentContent) {
            // Slide current content out
            currentContent.classList.add(`slide-${direction}`);
            currentContent.style.opacity = '0';
            
            setTimeout(() => {
                currentContent.classList.remove('active');
                currentContent.classList.remove(`slide-${direction}`);
                
                // Prepare new content
                targetContent.classList.add(`slide-${direction === 'left' ? 'right' : 'left'}`);
                targetContent.classList.add('active');
                
                // Force reflow
                targetContent.offsetHeight;
                
                // Slide new content in
                targetContent.classList.remove(`slide-${direction === 'left' ? 'right' : 'left'}`);
                targetContent.style.opacity = '1';
            }, 300);
        } else {
            // First load - no animation needed
            targetContent.classList.add('active');
            targetContent.style.opacity = '1';
        }
        
        currentTabIndex = newIndex;
    });
});

// Start the process steps animation
activateStep(currentStep); 