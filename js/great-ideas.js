document.addEventListener('DOMContentLoaded', function() {
  // Set up search functionality
  const searchInput = document.getElementById('searchInput');
  const postsGrid = document.getElementById('postsGrid');
  let originalPosts = [];
  
  if (postsGrid) {
    originalPosts = [...postsGrid.children];
  }
  
  if (searchInput && postsGrid) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      
      // Clear the grid
      postsGrid.innerHTML = '';
      
      // Filter and display posts
      const filteredPosts = originalPosts.filter(post => {
        const title = post.querySelector('h3 a').textContent.toLowerCase();
        const description = post.querySelector('.post-description')?.textContent.toLowerCase() || '';
        const tags = [...post.querySelectorAll('.tag')].map(tag => tag.textContent.toLowerCase());
        const source = post.querySelector('.idea-source')?.textContent.toLowerCase() || '';
        
        return title.includes(searchTerm) || 
               description.includes(searchTerm) || 
               source.includes(searchTerm) ||
               tags.some(tag => tag.includes(searchTerm));
      });
      
      if (filteredPosts.length === 0) {
        postsGrid.innerHTML = '<div class="card depth-shadow"><p style="padding: var(--spacing-md); font-family: \'Lora\', serif;">No ideas found matching your criteria.</p></div>';
        return;
      }
      
      filteredPosts.forEach(post => {
        postsGrid.appendChild(post);
      });
    });
  }
  
  // Set up stage filter functionality
  const stageFilters = document.querySelectorAll('.stage-filter-button');
  
  if (stageFilters.length > 0 && postsGrid) {
    stageFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        const stage = this.dataset.stage;
        
        // Toggle active class
        stageFilters.forEach(btn => btn.classList.remove('active'));
        if (stage !== 'all') {
          this.classList.add('active');
        }
        
        // Filter posts
        postsGrid.innerHTML = '';
        
        const filteredPosts = stage === 'all' 
          ? originalPosts 
          : originalPosts.filter(post => {
              return post.querySelector(`.stage-${stage}`) !== null;
            });
        
        if (filteredPosts.length === 0) {
          postsGrid.innerHTML = `<div class="card depth-shadow"><p style="padding: var(--spacing-md); font-family: 'Lora', serif;">No ideas found in the "${stage}" stage.</p></div>`;
          return;
        }
        
        filteredPosts.forEach(post => {
          postsGrid.appendChild(post);
        });
      });
    });
  }
  
  // Set up card expansion functionality
  const ideaCards = document.querySelectorAll('.idea-card');
  
  ideaCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't expand if clicking on a link
      if (e.target.tagName === 'A') return;
      
      const expandedContent = this.querySelector('.idea-expanded');
      
      if (expandedContent) {
        // Toggle expanded view
        const isExpanded = expandedContent.style.display === 'block';
        expandedContent.style.display = isExpanded ? 'none' : 'block';
        
        // Set up stage navigation
        const stageNavButtons = expandedContent.querySelectorAll('.stage-nav-button');
        const stageContents = expandedContent.querySelectorAll('.idea-stage');
        
        stageNavButtons.forEach(button => {
          button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card from collapsing
            
            const targetStage = this.dataset.target;
            
            // Hide all stages
            stageContents.forEach(content => {
              content.style.display = 'none';
            });
            
            // Show target stage
            expandedContent.querySelector(`#${targetStage}`).style.display = 'block';
            
            // Update active button
            stageNavButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
          });
        });
        
        // Show first stage by default if expanding
        if (!isExpanded && stageContents.length > 0) {
          stageContents.forEach(content => {
            content.style.display = 'none';
          });
          stageContents[0].style.display = 'block';
          
          if (stageNavButtons.length > 0) {
            stageNavButtons.forEach(btn => btn.classList.remove('active'));
            stageNavButtons[0].classList.add('active');
          }
        }
      }
    });
  });
});
