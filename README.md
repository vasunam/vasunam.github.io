# Personal Website

A clean and modern personal website with two main sections:
- About Me: A section to share your personal story and experiences
- Thoughts: A section to share your ideas and insights

## Structure
- `index.html`: The main webpage containing the site structure
- `styles.css`: Contains all the styling for the website

## Features
- Responsive design that works on both desktop and mobile devices
- Clean and modern UI with smooth transitions
- Fixed navigation bar for easy section access
- Optimized typography using Inter font family

## Blog System

### Creating a New Blog Post

1. **Copy the Template**
   - Copy `post-template.html` from the root directory to the `posts` directory
   - Name your file using kebab-case, e.g., `my-new-post.html`

2. **Update Metadata**
   ```html
   <meta name="post-date" content="YYYY-MM-DD">
   <meta name="post-tags" content="tag1,tag2,tag3">
   <meta name="post-description" content="Your post description">
   <title>Your Post Title - Namratha Vasu</title>
   ```

3. **Update Post Content**
   - Replace the title in the `<h1>` tag
   - Update the date and tags in the post header
   - Add your content in the `post-content` div
   - Use the following HTML structure for content:
     ```html
     <div class="post-content">
         <p>Introduction paragraph...</p>

         <h2>Section Heading</h2>
         <p>Section content...</p>

         <!-- For lists -->
         <ul>
             <li>List item 1</li>
             <li>List item 2</li>
         </ul>

         <!-- For code snippets -->
         <pre><code>Your code here</code></pre>
     </div>
     ```

4. **Add to Posts List**
   - Open `posts.js`
   - Add your post to the `posts` array:
     ```javascript
     {
         title: "Your Post Title",
         date: "YYYY-MM-DD",
         tags: ["tag1", "tag2"],
         description: "Your post description",
         url: "posts/your-file-name.html"
     }
     ```

### Post Guidelines
- Use descriptive tags that match existing categories when possible
- Keep the post description under 160 characters
- Use proper heading hierarchy (h1 for title, h2 for sections)
- Include relevant links and references where appropriate
- Optimize any images before adding them

## Getting Started
Simply open the `index.html` file in a web browser to view the website. To customize:
1. Edit the content in `index.html` to add your personal information
2. Modify `styles.css` to change the styling if desired
