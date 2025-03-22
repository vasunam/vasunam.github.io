/**
 * NYC Background Animations
 * This file contains all the animations for the NYC-themed background
 */

// City Background Animation Module
const CityBackground = (function() {
    // Private variables
    const buildingTypes = [
        { type: 'empire', height: 400 },    // Empire State
        { type: 'chrysler', height: 380 },  // Chrysler
        { type: 'wtc', height: 420 },       // One WTC
    ];
    
    /**
     * Create a window element with random animation properties
     * @returns {HTMLElement} The window element
     */
    function createWindow() {
        const window = document.createElement('div');
        window.className = 'window';
        // Random initial state and timing
        window.style.animationDelay = (Math.random() * 15) + 's';
        window.style.opacity = Math.random() > 0.4 ? '1' : '0.1';
        return window;
    }
    
    /**
     * Create a floor with windows for a building
     * @param {number} windowsPerFloor - Number of windows per floor
     * @param {number} floorIndex - Index of the floor
     * @returns {HTMLElement} The floor element
     */
    function createFloor(windowsPerFloor, floorIndex) {
        const floor = document.createElement('div');
        floor.style.display = 'flex';
        floor.style.justifyContent = 'center';
        floor.style.gap = '4px';
        
        // Vary window patterns for different floors
        const actualWindows = floorIndex % 2 === 0 ? windowsPerFloor : windowsPerFloor - 1;
        
        for (let k = 0; k < actualWindows; k++) {
            floor.appendChild(createWindow());
        }
        
        return floor;
    }
    
    /**
     * Create a building element
     * @param {number} index - Index of the building
     * @param {number} totalBuildings - Total number of buildings
     * @returns {HTMLElement} The building element
     */
    function createBuilding(index, totalBuildings) {
        const building = document.createElement('div');
        
        // Create iconic buildings at specific positions
        if (index === 3) {
            building.className = 'building empire';
            building.style.height = '400px';
        } else if (index === 6) {
            building.className = 'building chrysler';
            building.style.height = '380px';
        } else if (index === 9) {
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
        const basePosition = (index * (100 / totalBuildings));
        const randomOffset = Math.random() * 4 - 2; // ±2% random offset
        const left = (basePosition + randomOffset) + '%';
        building.style.left = left;
        
        // Add windows with varying patterns
        const height = parseInt(building.style.height);
        const width = parseInt(building.style.width) || 70; // Default width for iconic buildings
        const numberOfFloors = Math.floor(height / 15);
        const windowsPerFloor = Math.floor(width / 12);
        
        for (let j = 0; j < numberOfFloors; j++) {
            building.appendChild(createFloor(windowsPerFloor, j));
        }
        
        return building;
    }
    
    // Public methods
    return {
        /**
         * Generate dynamic city buildings
         */
        createBuildings: function() {
            const cityBackground = document.getElementById('cityBackground');
            if (!cityBackground) return;
            
            const numberOfBuildings = 12; // Fewer, more distinctive buildings
            
            for (let i = 0; i < numberOfBuildings; i++) {
                cityBackground.appendChild(createBuilding(i, numberOfBuildings));
            }
        },
        
        /**
         * Create animated taxis
         */
        createTaxis: function() {
            const cityBackground = document.getElementById('cityBackground');
            if (!cityBackground) return;
            
            setInterval(() => {
                const taxi = document.createElement('div');
                taxi.className = 'taxi floating-element';
                taxi.style.bottom = Math.random() * 100 + 20 + 'px';
                cityBackground.appendChild(taxi);
                
                setTimeout(() => {
                    taxi.remove();
                }, 15000);
            }, 8000); // Less frequent taxis
        },
        
        /**
         * Create headlights effect
         */
        createHeadlights: function() {
            const cityBackground = document.getElementById('cityBackground');
            if (!cityBackground) return;
            
            setInterval(() => {
                const headlight = document.createElement('div');
                headlight.className = 'headlight';
                headlight.style.bottom = Math.random() * 100 + 20 + 'px';
                cityBackground.appendChild(headlight);
                
                setTimeout(() => {
                    headlight.remove();
                }, 8000);
            }, 2000);
        },
        
        /**
         * Initialize all animations
         */
        init: function() {
            this.createBuildings();
            this.createTaxis();
            this.createHeadlights();
        }
    };
})();

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    CityBackground.init();
});

// Export functions for global access (for backward compatibility)
window.createBuildings = function() { CityBackground.createBuildings(); };
window.createTaxis = function() { CityBackground.createTaxis(); };
window.createHeadlights = function() { CityBackground.createHeadlights(); };
