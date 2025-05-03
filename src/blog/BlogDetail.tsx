import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import blogData from './blogData.json'; // Importing the local JSON file
import siteConfig from '@/config/siteConfig.json'; // Import siteConfig

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  meta_description: string;
  imageUrl?: string; // Add imageUrl field
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Remove the manual metadata useEffect
  // useEffect(() => {
  //     if (post) {
  //       document.title = post.title;
  //       const metaDescriptionTag = document.querySelector('meta[name="description"]');
  //       if (metaDescriptionTag) {
  //         metaDescriptionTag.setAttribute('content', post.meta_description);
  //       } else {
  //         const newMetaTag = document.createElement('meta');
  //         newMetaTag.name = 'description';
  //         newMetaTag.content = post.meta_description;
  //         document.head.appendChild(newMetaTag);
  //       }
  //     }
  //     return () => {
  //       document.title = "Blog"; // Or a default site title
  //       const metaDescriptionTag = document.querySelector('meta[name="description"]');
  //       if (metaDescriptionTag) {
  //          metaDescriptionTag.setAttribute('content', 'Default blog meta description'); // Or a default description
  //       }
  //     };
  //   }, [post]);

  useEffect(() => {
    console.log("BlogDetail component mounted. Slug:", slug); // Log the slug
    console.log("Blog data:", blogData); // Log the imported data

    // Simulate fetching data and finding the post by slug
    try {
      const foundPost = (blogData as BlogPost[]).find(p => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
      } else {
        setError('Blog post not found.');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load blog post.');
      setLoading(false);
    }
  }, [slug]); // Rerun effect if slug changes

  if (loading) {
    return <div>Loading blog post...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Blog post not found.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8">
      {post && (
        <Helmet>
          <title>{post.title} - {siteConfig.site.title}</title>
          <meta name="description" content={post.meta_description} />
        </Helmet>
      )}
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover mb-8 rounded-lg" />
      )}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-600 text-sm mb-4">
          By {post.author} on {new Date(post.date).toLocaleDateString()}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="text-gray-600 text-sm">
            Tags: {post.tags.join(', ')}
          </div>
        )}
      </header>
      <section className="prose lg:prose-xl max-w-none">
        {/* In a real app, you might use a library to render markdown or rich text */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>
    </article>
  );
};

export default BlogDetail;