/**
 * Blog Module
 * Handles displaying and filtering blog posts
 */

const Blog = (function() {
    // Private variables and functions
    let posts = [];
    
    /**
     * Format date to readable string
     * @param {string} dateStr - Date string in YYYY-MM-DD format
     * @returns {string} Formatted date string
     */
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    /**
     * Create a post card element
     * @param {Object} post - Post object
     * @returns {HTMLElement} Post card element
     */
    function createPostCard(post) {
        const article = document.createElement('article');
        article.className = 'card';

        article.innerHTML = `
            <div class="flex flex-col gap-md">
                <h3 style="font-family: 'Spectral', serif;"><a href="${post.url}">${post.title}</a></h3>
                <div class="flex justify-between items-center">
                    <time datetime="${post.date}" class="text-sm" style="color: var(--color-grey-500); font-family: 'Lora', serif;">${formatDate(post.date)}</time>
                    <div class="flex gap-sm flex-wrap">
                        ${post.tags.map(tag => `<span class="tag" style="background-color: var(--color-grey-200); color: var(--color-grey-700); padding: 2px 8px; border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-family: 'Lora', serif;">${tag}</span>`).join('')}
                    </div>
                </div>
                <p style="margin-top: var(--spacing-xs); font-family: 'Lora', serif;">${post.description}</p>
            </div>
        `;

        return article;
    }
    
    /**
     * Display posts in the grid
     * @param {Array} filteredPosts - Array of post objects to display
     */
    function displayPosts(filteredPosts) {
        const grid = document.getElementById('postsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        if (filteredPosts.length === 0) {
            grid.innerHTML = '<p class="no-posts">No posts found matching your criteria.</p>';
            return;
        }

        filteredPosts.forEach(post => {
            grid.appendChild(createPostCard(post));
        });
    }
    
    /**
     * Filter posts based on active tag and search term
     * @param {string|null} activeTag - Active tag to filter by
     * @param {string} searchTerm - Search term to filter by
     * @returns {Array} Filtered posts
     */
    function filterPostsByTagAndSearch(activeTag, searchTerm) {
        let filteredPosts = posts;
        
        // Apply tag filter if active
        if (activeTag) {
            filteredPosts = filteredPosts.filter(post => post.tags.includes(activeTag));
        }
        
        // Apply search filter
        if (searchTerm) {
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.description.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        return filteredPosts;
    }
    
    /**
     * Handle tag button click
     * @param {string} tag - Tag to filter by
     */
    function handleTagClick(tag) {
        const buttons = document.querySelectorAll('.tag-button');
        let isActive = false;

        buttons.forEach(btn => {
            if (btn.textContent === tag) {
                // Toggle active state
                if (btn.getAttribute('data-active') === 'true') {
                    btn.setAttribute('data-active', 'false');
                    btn.style.backgroundColor = 'var(--color-grey-200)';
                    btn.style.color = 'var(--color-grey-700)';
                    btn.style.boxShadow = 'none';
                    isActive = false;
                } else {
                    btn.setAttribute('data-active', 'true');
                    btn.style.backgroundColor = 'var(--color-grey-300)';
                    btn.style.color = 'var(--color-grey-800)';
                    btn.style.boxShadow = 'var(--shadow-sm)';
                    isActive = true;
                }
            } else {
                // Reset other buttons
                btn.setAttribute('data-active', 'false');
                btn.style.backgroundColor = 'var(--color-grey-200)';
                btn.style.color = 'var(--color-grey-700)';
                btn.style.boxShadow = 'none';
            }
        });

        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const activeTag = isActive ? tag : null;
        
        displayPosts(filterPostsByTagAndSearch(activeTag, searchTerm));
    }
    
    /**
     * Initialize tag buttons
     * @param {Array} tags - Array of tag strings
     */
    function initializeTagButtons(tags) {
        const tagFilter = document.getElementById('tagFilter');
        if (!tagFilter) return;
        
        tagFilter.innerHTML = ''; // Clear existing tags
        
        tags.forEach(tag => {
            const tagBtn = document.createElement('button');
            tagBtn.className = 'tag-button';
            tagBtn.style.backgroundColor = 'var(--color-grey-200)';
            tagBtn.style.color = 'var(--color-grey-700)';
            tagBtn.style.border = 'var(--border-width-thin) solid var(--color-grey-300)';
            tagBtn.style.borderRadius = 'var(--radius-sm)';
            tagBtn.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
            tagBtn.style.margin = '0 var(--spacing-xs) var(--spacing-xs) 0';
            tagBtn.style.cursor = 'pointer';
            tagBtn.style.transition = 'all var(--transition-normal)';
            tagBtn.textContent = tag;
            tagBtn.onclick = () => handleTagClick(tag);
            tagFilter.appendChild(tagBtn);
        });
    }
    
    /**
     * Initialize search input
     */
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const activeTag = document.querySelector('.tag-button.tag-button--active')?.textContent;
            
            displayPosts(filterPostsByTagAndSearch(activeTag, searchTerm));
        });
    }
    
    /**
     * Get all unique tags from posts
     * @returns {Array} Array of unique tags
     */
    function getAllTags() {
        const tags = new Set();
        posts.forEach(post => {
            post.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }
    
    /**
     * Load posts data from JSON file
     * @returns {Promise} Promise that resolves when posts are loaded
     */
    function loadPosts() {
        console.log('Loading posts data...');
        return fetch('js/posts-data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Posts data loaded successfully:', data);
                posts = data;
                return posts;
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                return [];
            });
    }
    
    // Public methods
    return {
        /**
         * Initialize the blog
         */
        init: function() {
            loadPosts().then(() => {
                // Initialize tags
                initializeTagButtons(getAllTags());
                
                // Set up search handler
                initializeSearch();
                
                // Display all posts initially
                displayPosts(posts);
            });
        }
    };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking for postsGrid element...');
    const postsGrid = document.getElementById('postsGrid');
    console.log('postsGrid element found:', postsGrid);
    
    // Check if we're on the blog page
    if (postsGrid) {
        console.log('Initializing blog...');
        Blog.init();
    }
});

// Backward compatibility
function initializeBlog() {
    console.log('initializeBlog called');
    Blog.init();
}
