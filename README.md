# Personal Website

A clean and modern personal website with two main sections:
- About Me: A section to share your personal story and experiences
- Thoughts: A section to share your ideas and insights

## Structure

### HTML Files
- `index.html`: The main webpage containing the about me section
- `thoughts.html`: The blog listing page
- `templates/post_template.html`: Template for individual blog posts

### CSS Files (Modular Structure)
- `css/main.css`: Main CSS file that imports all component CSS files
- `css/variables.css`: CSS variables for consistent theming
- `css/base.css`: Base styles and CSS reset
- `css/layout.css`: Layout styles for navigation, main content, and footer
- `css/background.css`: Styles for background effects and animations
- `css/content.css`: Styles for blog posts and content

### JavaScript Files
- `js/animations.js`: Handles the NYC-themed background animations
- `js/blog.js`: Manages blog post display and filtering
- `js/posts-data.json`: JSON data file containing blog post information

## Features
- Responsive design that works on both desktop and mobile devices
- Clean and modern UI with smooth transitions
- Fixed navigation bar for easy section access
- Optimized typography using Inter font family
- Modular CSS architecture for better maintainability
- Markdown-based blog post system for easy content creation
- Automated blog post generation using Python
- NYC-themed animated background with dynamic elements

## Blog System

### Creating a New Blog Post

1. **Create a Markdown File**
   - Create a new markdown file in the `content/posts` directory
   - Name your file using kebab-case, e.g., `my-new-post.md`

2. **Add Frontmatter**
   ```markdown
   ---
   title: Your Post Title
   date: YYYY-MM-DD
   tags: [tag1, tag2, tag3]
   description: Your post description
   ---
   ```

3. **Write Your Content in Markdown**
   ```markdown
   ## Introduction
   
   This is my new blog post about something interesting.
   
   ## Main Section
   
   Here's some content with **bold text** and *italics*.
   
   ### Subsection
   
   - List item 1
   - List item 2
   - List item 3
   
   ```python
   # Code example
   def hello_world():
       print("Hello, world!")
   ```
   ```

4. **Generate HTML using the Build Script**
   - Run the Python build script to convert your markdown to HTML:
   ```bash
   python scripts/build_posts.py
   ```
   - This will automatically:
     - Parse your markdown file and its frontmatter
     - Apply the post template
     - Generate an HTML file in the `posts` directory
     - Update the `js/posts-data.json` file with your new post

### Post Guidelines
- Use descriptive tags that match existing categories when possible
- Keep the post description under 160 characters
- Use proper heading hierarchy (h2 for main sections, h3 for subsections)
- Include relevant links and references where appropriate
- Optimize any images before adding them
- Use markdown syntax for formatting (bold, italics, lists, code blocks)
- Place any images in an `images` folder within the `content` directory

## Development Workflow

### Prerequisites
- Python 3.6 or higher
- Required Python packages (install using `pip install -r requirements.txt`):
  - markdown
  - pyyaml

### Local Development
1. Clone the repository
2. Make changes to HTML, CSS, or JavaScript files as needed
3. To add or edit blog posts, follow the blog post creation process above
4. Run the build script to generate HTML files from markdown:
   ```bash
   python scripts/build_posts.py
   ```
5. Open `index.html` in a web browser to view your changes

### CSS Customization
- To modify the site's appearance, edit the appropriate CSS file in the `css` directory:
  - For color scheme changes: `variables.css`
  - For typography and base styles: `base.css`
  - For layout and structure: `layout.css`
  - For background effects: `background.css`
  - For content styling: `content.css`
