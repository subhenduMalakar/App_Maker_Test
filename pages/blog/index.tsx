import Head from 'next/head';
import { useState } from 'react';
import BlogPostSummary from '@/blog/BlogPostSummary'; // Assuming BlogPostSummary is still in src/blog
import { GetServerSideProps } from 'next';
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
}

interface BlogListProps {
  allPosts: BlogPost[];
}

const BlogList = ({ allPosts }: BlogListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Number of posts per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  console.log('Current posts being rendered:', currentPosts); // Log the posts for the current page
  console.log('Current posts IDs:', currentPosts.map(post => post.id)); // Log the IDs of current posts

  // Change page
  const paginate = (pageNumber: number) => {
    console.log('Changing page to:', pageNumber);
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  console.log('Render - Current Page:', currentPage, 'Posts per page:', postsPerPage, 'Total Pages:', totalPages);
  console.log('Render - Index First Post:', indexOfFirstPost, 'Index Last Post:', indexOfLastPost, 'Current Posts Length:', currentPosts.length);


  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Blog - {siteConfig.site.title}</title>
        <meta name="description" content={`Read the latest blog posts from ${siteConfig.site.title}.`} />
      </Head>
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post, index) => (
          <BlogPostSummary key={index} post={post} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous Page
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(process.cwd(), 'src/blog/blogData.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const allPosts = JSON.parse(fileContent);

  return {
    props: {
      allPosts,
    },
  };
};

export default BlogList;