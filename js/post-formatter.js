/**
 * post-formatter.js
 * 
 * This script automatically applies consistent styling to all blog posts.
 * It works by looking for a page with the .blog-post class and then transforms
 * the content to match the site's design pattern.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only run on blog post pages
    if (!document.body.classList.contains('blog-post')) return;
    
    // Get the main elements
    const main = document.querySelector('main');
    const article = document.querySelector('article');
    const header = article.querySelector('header');
    const content = article.querySelector('.content');
    
    // Restructure the main element
    main.className = 'main';
    
    // Create a section element
    const section = document.createElement('section');
    section.className = 'section';
    
    // Create a card wrapper
    const card = document.createElement('div');
    card.className = 'card depth-shadow';
    
    // Format the header
    header.className = 'post-header';
    header.style.padding = 'var(--spacing-md)';
    
    // Format the h1
    const h1 = header.querySelector('h1');
    if (h1) {
        h1.style.marginTop = '0';
        h1.style.color = 'var(--color-grey-800)';
    }
    
    // Format the meta section
    const meta = header.querySelector('.meta');
    if (meta) {
        meta.className = 'post-meta';
        meta.style.textAlign = 'left';  // Align left instead of center for better tag display
        meta.style.display = 'flex';
        meta.style.flexDirection = 'column';
        meta.style.gap = 'var(--spacing-sm)';
    }
    
    // Format the tags
    const tagsContainer = header.querySelector('.tags');
    if (tagsContainer) {
        tagsContainer.className = 'post-tags';
        
        // Ensure tags display properly
        const tags = tagsContainer.querySelectorAll('.tag');
        tags.forEach(tag => {
            // Limit very long tags
            if (tag.textContent.length > 20) {
                tag.textContent = tag.textContent.substring(0, 17) + '...';
            }
            
            // Apply styling to ensure proper display
            tag.style.display = 'inline-block';
            tag.style.whiteSpace = 'nowrap';
            tag.style.margin = 'var(--spacing-xs) var(--spacing-xs) var(--spacing-xs) 0';
        });
    }
    
    // Format the content
    if (content) {
        content.className = 'post-content section-divided';
        content.style.padding = 'var(--spacing-md)';
        
        // Group content sections
        let sections = [];
        let currentSection = null;
        let hasDropCap = false; // Track if we've already applied a drop cap
        
        // Find all h2 elements and group content that follows until the next h2
        Array.from(content.children).forEach(child => {
            if (child.tagName === 'H2') {
                // Save previous section if exists
                if (currentSection) {
                    sections.push(currentSection);
                }
                // Start a new section
                currentSection = document.createElement('div');
                currentSection.appendChild(child.cloneNode(true));
            } else if (currentSection) {
                const childClone = child.cloneNode(true);
                
                // If child is a paragraph and we haven't applied drop cap yet,
                // check if it has sufficient text content for a drop cap
                if (!hasDropCap && child.tagName === 'P' && child.textContent.trim().length > 20) {
                    // Add drop cap class for CSS styling
                    childClone.classList.add('drop-cap');
                    hasDropCap = true;
                }
                
                currentSection.appendChild(childClone);
            } else {
                // Content before first h2 stays outside sections
                const childClone = child.cloneNode(true);
                
                // If child is a paragraph and we haven't applied drop cap yet
                if (!hasDropCap && child.tagName === 'P' && child.textContent.trim().length > 20) {
                    childClone.classList.add('drop-cap');
                    hasDropCap = true;
                }
                
                sections.push(childClone);
            }
        });
        
        // Add the last section if it exists
        if (currentSection) {
            sections.push(currentSection);
        }
        
        // Clear content and add formatted sections
        content.innerHTML = '';
        sections.forEach(section => {
            content.appendChild(section);
        });
        
        // Apply drop cap styling with JavaScript to ensure only first character is affected
        const dropCapParagraph = content.querySelector('.drop-cap');
        if (dropCapParagraph && dropCapParagraph.textContent.length > 0) {
            // Create a completely new paragraph element to avoid any CSS inheritance issues
            const newParagraph = document.createElement('p');
            
            // Get the text content and split into first letter and rest
            const text = dropCapParagraph.textContent.trim();
            const firstLetter = text.charAt(0); // Explicitly get only the first character
            const restOfText = text.slice(1);   // Get everything after the first character
            
            // Create the drop cap span for just the first letter
            const dropCapSpan = document.createElement('span');
            dropCapSpan.className = 'first-letter';
            dropCapSpan.textContent = firstLetter; // Only one character
            
            // Create a span for the rest of the text
            const textSpan = document.createElement('span');
            textSpan.textContent = restOfText;
            
            // Build the new paragraph
            newParagraph.appendChild(dropCapSpan);
            newParagraph.appendChild(textSpan);
            
            // Replace the original paragraph with our new one
            dropCapParagraph.parentNode.replaceChild(newParagraph, dropCapParagraph);
        }
    }
    
    // Restructure the DOM
    main.innerHTML = '';
    card.appendChild(article);
    section.appendChild(card);
    main.appendChild(section);
    
    // Format the footer
    const footer = document.querySelector('footer');
    if (footer) footer.className = 'footer';
});
