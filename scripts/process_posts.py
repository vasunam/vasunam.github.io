import os
import yaml
import json
from datetime import datetime
from pathlib import Path
import markdown
import frontmatter

class Post:
    def __init__(self, filename, title, date, tags, description, content, html_content):
        self.filename = filename
        self.title = title
        self.date = date
        self.tags = tags
        self.description = description
        self.content = content
        self.html_content = html_content
        self.url = f"/posts/{os.path.splitext(filename)[0]}.html"

    def to_dict(self):
        return {
            "filename": self.filename,
            "title": self.title,
            "date": self.date.strftime("%Y-%m-%d"),
            "tags": self.tags,
            "description": self.description,
            "url": self.url,
            "html_content": self.html_content
        }

def process_posts(posts_dir):
    posts = []
    md = markdown.Markdown(extensions=['meta', 'fenced_code', 'codehilite'])
    
    for file in os.listdir(posts_dir):
        if not file.endswith('.md'):
            continue
            
        file_path = os.path.join(posts_dir, file)
        with open(file_path, 'r') as f:
            post = frontmatter.load(f)
            
        # Convert content to HTML
        html_content = md.convert(post.content)
        
        # Parse the date
        date = datetime.strptime(post['date'], "%Y-%m-%d")
        
        # Create Post object
        post_obj = Post(
            filename=file,
            title=post['title'],
            date=date,
            tags=post['tags'],
            description=post.get('description', ''),
            content=post.content,
            html_content=html_content
        )
        
        posts.append(post_obj)
    
    # Sort posts by date
    posts.sort(key=lambda x: x.date, reverse=True)
    
    return posts

def generate_post_pages(posts, template_dir, output_dir):
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Read the template
    with open(os.path.join(template_dir, 'post_template.html'), 'r') as f:
        template = f.read()
    
    # Generate individual post pages
    for post in posts:
        html_content = template.replace('{{title}}', post.title)\
                              .replace('{{date}}', post.date.strftime("%B %d, %Y"))\
                              .replace('{{content}}', post.html_content)\
                              .replace('{{description}}', post.description)\
                              .replace('{{tags}}', ', '.join(post.tags))
        
        output_file = os.path.join(output_dir, os.path.splitext(post.filename)[0] + '.html')
        with open(output_file, 'w') as f:
            f.write(html_content)

def generate_index(posts, output_file):
    # Create index data
    index_data = {
        "posts": [post.to_dict() for post in posts],
        "tags": sorted(list(set(tag for post in posts for tag in post.tags)))
    }
    
    # Write to JSON file
    with open(output_file, 'w') as f:
        json.dump(index_data, f, indent=2)

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    posts_dir = os.path.join(base_dir, 'content', 'posts')
    template_dir = os.path.join(base_dir, 'templates')
    output_dir = os.path.join(base_dir, 'posts')
    
    # Process all posts
    posts = process_posts(posts_dir)
    
    # Generate individual post pages
    generate_post_pages(posts, template_dir, output_dir)
    
    # Generate index file
    generate_index(posts, os.path.join(base_dir, 'posts_index.json'))

if __name__ == "__main__":
    main()
