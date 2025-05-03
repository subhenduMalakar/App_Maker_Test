import Link from 'next/link';

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

interface BlogPostSummaryProps {
  post: BlogPost;
}

const BlogPostSummary = ({ post }: BlogPostSummaryProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="text-sm text-gray-500 mb-4">
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
          <div className="text-sm text-gray-500">
            Tags: {post.tags.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostSummary;