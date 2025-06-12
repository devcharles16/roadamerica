// src/pages/Blog.jsx
import React from 'react';
import './styles/blog.css';

const blogPosts = [
  {
    title: 'Top Tips for Preparing Your Vehicle for Transport',
    excerpt: 'Make sure your vehicle is ready for shipping with these quick steps.',
    date: 'June 2025'
  },
  {
    title: 'Open vs. Enclosed Auto Transport',
    excerpt: 'Learn the difference between open and enclosed car shipping and which is right for you.',
    date: 'May 2025'
  },
  {
    title: 'What to Expect on Pickup and Delivery Day',
    excerpt: 'Understand the inspection and delivery process from start to finish.',
    date: 'April 2025'
  }
];

export default function Blog() {
  return (
    <div className="blog-container">
      <h2 className="blog-title">From the Road: Latest Articles</h2>
      <div className="blog-posts">
        {blogPosts.map((post, index) => (
          <div className="blog-card" key={index}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-date">{post.date}</p>
            <p className="post-excerpt">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
