import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import blogData from '@/blog/blogData.json'; // Importing the local JSON file
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

interface BlogDetailProps {
  post: BlogPost | null;
}

const BlogDetail = ({ post }: BlogDetailProps) => {
  if (!post) {
    return <div>Blog post not found.</div>; // Or render a 404 page
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <Head>
        <title>{post.title} - {siteConfig.site.title}</title>
        <meta name="description" content={post.meta_description} />
      </Head>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover mb-8 rounded-lg" />
      )}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-600 text-sm mb-4">
          By {post.author} on {
            (() => {
              const date = new Date(post.date);
              const day = date.getDate().toString().padStart(2, '0');
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            })()
          }
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogData.map(post => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false }; // fallback: false means other routes will 404
};

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = blogData.find(p => p.slug === slug) || null;

  return {
    props: {
      post,
    },
  };
};

export default BlogDetail;