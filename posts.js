// List of all blog posts
const posts = [
    {
        title: "Building My Website with AI",
        date: "2025-01-25",
        tags: ["ai", "web-development", "windsurf"],
        description: "How I used Windsurf to create a personal website that reflects my style",
        url: "posts/building-with-ai.html"
    },
    {
        title: "My Favorite NYC Cafes of 2025",
        date: "2025-01-24",
        tags: ["cafes", "nyc", "coffee", "reviews"],
        description: "My top picks for the best coffee spots in New York City this year",
        url: "posts/favorite-cafes-2025.html"
    },
    {
        title: "The Future of Product Management in the AI Era",
        date: "2025-01-20",
        tags: ["product-management", "ai", "tech", "career"],
        description: "How AI is changing the landscape of product management and what it means for PMs",
        url: "posts/product-management-ai.html"
    }
];

// Get all unique tags from posts
function getAllTags() {
    const tags = new Set();
    posts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
}

// Display posts in the grid
function displayPosts(filteredPosts) {
    const grid = document.getElementById('postsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (filteredPosts.length === 0) {
        grid.innerHTML = '<p class="no-posts">No posts found matching your criteria.</p>';
        return;
    }

    filteredPosts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-card';

        article.innerHTML = `
            <div class="post-card-content">
                <h2><a href="${post.url}">${post.title}</a></h2>
                <div class="post-card-meta">
                    <time datetime="${post.date}">${formatDate(post.date)}</time>
                    <div class="post-card-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <p class="post-card-description">${post.description}</p>
            </div>
        `;

        grid.appendChild(article);
    });
}

// Format date to readable string
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Filter posts by tag
function filterPosts(tag) {
    const buttons = document.querySelectorAll('.tag-button');
    let isActive = false;

    buttons.forEach(btn => {
        if (btn.textContent === tag) {
            btn.classList.toggle('active');
            isActive = btn.classList.contains('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    let filteredPosts = posts;

    // Apply tag filter if active
    if (isActive) {
        filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
    }

    // Apply search filter
    if (searchTerm) {
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.description.toLowerCase().includes(searchTerm) ||
            post.tags.some(t => t.toLowerCase().includes(searchTerm))
        );
    }

    displayPosts(filteredPosts);
}

// Initialize the blog
function initializeBlog() {
    // Initialize tags
    const tagFilter = document.getElementById('tagFilter');
    if (tagFilter) {
        const allTags = getAllTags();
        tagFilter.innerHTML = ''; // Clear existing tags
        allTags.forEach(tag => {
            const tagBtn = document.createElement('button');
            tagBtn.className = 'tag-button';
            tagBtn.textContent = tag;
            tagBtn.onclick = () => filterPosts(tag);
            tagFilter.appendChild(tagBtn);
        });
    }

    // Set up search handler
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const activeTag = document.querySelector('.tag-button.active')?.textContent;
            let filteredPosts = posts;

            if (activeTag) {
                filteredPosts = filteredPosts.filter(post => post.tags.includes(activeTag));
            }

            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.description.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );

            displayPosts(filteredPosts);
        });
    }

    // Display all posts initially
    displayPosts(posts);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlog);
