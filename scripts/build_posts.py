#!/usr/bin/env python3

import os
import re
import json
import markdown
import yaml
from datetime import datetime
from pathlib import Path

# Configuration
CONTENT_DIR = Path('../content/posts')
OUTPUT_DIR = Path('../posts')
TEMPLATE_PATH = Path('../templates/post_template.html')
POSTS_JSON_PATH = Path('../js/posts-data.json')

# Ensure output directory exists
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load template
with open(TEMPLATE_PATH, 'r') as f:
    template = f.read()

# Function to extract frontmatter and content
def parse_markdown_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract frontmatter
    frontmatter_match = re.match(r'^---\n([\s\S]*?)\n---\n([\s\S]*)$', content)
    if not frontmatter_match:
        print(f"Warning: No frontmatter found in {file_path}")
        return None, content
    
    frontmatter_str, markdown_content = frontmatter_match.groups()
    try:
        frontmatter = yaml.safe_load(frontmatter_str)
    except yaml.YAMLError as e:
        print(f"Error parsing frontmatter in {file_path}: {e}")
        return None, markdown_content
    
    return frontmatter, markdown_content

# Function to format date
def format_date(date_str):
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        return date_obj.strftime('%B %d, %Y')
    except ValueError:
        return date_str

# Function to generate HTML from markdown
def generate_html(markdown_content):
    # Initialize Markdown with extensions
    md = markdown.Markdown(extensions=['extra', 'codehilite', 'meta'])
    return md.convert(markdown_content)

# Function to generate slug from title
def slugify(title):
    return title.lower().replace(' ', '-').replace('?', '').replace('!', '').replace('.', '').replace(',', '')

# Process all markdown files
def process_markdown_files():
    posts_data = []
    
    for md_file in CONTENT_DIR.glob('*.md'):
        print(f"Processing {md_file}...")
        
        # Parse markdown file
        frontmatter, markdown_content = parse_markdown_file(md_file)
        if not frontmatter:
            print(f"Skipping {md_file} due to missing or invalid frontmatter")
            continue
        
        # Extract metadata
        title = frontmatter.get('title', 'Untitled')
        date = frontmatter.get('date', '')
        tags = frontmatter.get('tags', [])
        description = frontmatter.get('description', '')
        
        # Generate HTML content
        html_content = generate_html(markdown_content)
        
        # Format tags for HTML
        tags_html = ''.join([f'<span class="post-tag">{tag}</span>' for tag in tags])
        
        # Replace template placeholders
        post_html = template
        post_html = post_html.replace('{{title}}', title)
        post_html = post_html.replace('{{date}}', date)
        post_html = post_html.replace('{{tags}}', tags_html)
        post_html = post_html.replace('{{description}}', description)
        post_html = post_html.replace('{{content}}', html_content)
        
        # Generate output filename
        slug = slugify(title)
        output_file = OUTPUT_DIR / f"{slug}.html"
        
        # Write HTML file
        with open(output_file, 'w') as f:
            f.write(post_html)
        
        # Add to posts data
        posts_data.append({
            'title': title,
            'date': date,
            'tags': tags,
            'description': description,
            'url': f"posts/{slug}.html"
        })
        
        print(f"Generated {output_file}")
    
    # Sort posts by date (newest first)
    posts_data.sort(key=lambda x: x['date'], reverse=True)
    
    # Write posts data to JSON file
    with open(POSTS_JSON_PATH, 'w') as f:
        json.dump(posts_data, f, indent=2)
    
    print(f"Generated posts data: {POSTS_JSON_PATH}")

if __name__ == "__main__":
    process_markdown_files()
    print("Build completed successfully!")
