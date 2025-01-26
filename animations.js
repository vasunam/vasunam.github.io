// Generate dynamic city buildings
function createBuildings() {
    const cityBackground = document.getElementById('cityBackground');
    const numberOfBuildings = 12; // Fewer, more distinctive buildings
    
    // Define iconic building heights
    const buildingTypes = [
        { type: 'empire', height: 400 },    // Empire State
        { type: 'chrysler', height: 380 },  // Chrysler
        { type: 'wtc', height: 420 },       // One WTC
    ];
    
    for (let i = 0; i < numberOfBuildings; i++) {
        const building = document.createElement('div');
        
        // Create iconic buildings at specific positions
        if (i === 3) {
            building.className = 'building empire';
            building.style.height = '400px';
        } else if (i === 6) {
            building.className = 'building chrysler';
            building.style.height = '380px';
        } else if (i === 9) {
            building.className = 'building wtc';
            building.style.height = '420px';
        } else {
            // Random regular buildings
            building.className = 'building';
            const height = Math.random() * 200 + 150;
            building.style.height = height + 'px';
            building.style.width = (Math.random() * 30 + 40) + 'px';
        }
        
        // Vary the building positions slightly
        const basePosition = (i * (100 / numberOfBuildings));
        const randomOffset = Math.random() * 4 - 2; // ±2% random offset
        const left = (basePosition + randomOffset) + '%';
        building.style.left = left;
        
        // Add windows with varying patterns
        const height = parseInt(building.style.height);
        const width = parseInt(building.style.width) || 70; // Default width for iconic buildings
        const numberOfFloors = Math.floor(height / 15);
        const windowsPerFloor = Math.floor(width / 12);
        
        for (let j = 0; j < numberOfFloors; j++) {
            const floor = document.createElement('div');
            floor.style.display = 'flex';
            floor.style.justifyContent = 'center';
            floor.style.gap = '4px';
            
            // Vary window patterns for different floors
            const actualWindows = j % 2 === 0 ? windowsPerFloor : windowsPerFloor - 1;
            
            for (let k = 0; k < actualWindows; k++) {
                const window = document.createElement('div');
                window.className = 'window';
                // Random initial state and timing
                window.style.animationDelay = (Math.random() * 15) + 's';
                window.style.opacity = Math.random() > 0.4 ? '1' : '0.1';
                floor.appendChild(window);
            }
            building.appendChild(floor);
        }
        
        cityBackground.appendChild(building);
    }
}

// Create animated taxis
function createTaxis() {
    const cityBackground = document.getElementById('cityBackground');
    setInterval(() => {
        const taxi = document.createElement('div');
        taxi.className = 'taxi floating-element';
        taxi.style.bottom = Math.random() * 100 + 20 + 'px';
        cityBackground.appendChild(taxi);
        
        setTimeout(() => {
            taxi.remove();
        }, 15000);
    }, 8000); // Less frequent taxis
}

// Create headlights effect
function createHeadlights() {
    const cityBackground = document.getElementById('cityBackground');
    setInterval(() => {
        const headlight = document.createElement('div');
        headlight.className = 'headlight';
        headlight.style.bottom = Math.random() * 100 + 20 + 'px';
        cityBackground.appendChild(headlight);
        
        setTimeout(() => {
            headlight.remove();
        }, 8000);
    }, 2000);
}

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createBuildings();
    createTaxis();
    createHeadlights();
});
