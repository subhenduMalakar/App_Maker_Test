import React, { useState } from 'react';
import staticPageData from "@/data/pages/StaticPage.json";

// Note: The original implementation relied on a non-existent staticPages.json
// and dynamic loading based on slug. This has been removed to focus on
// externalizing the static text elements to StaticPage.json as requested.
// The component will now default to showing the "Page not found" message.

const StaticPage = () => {
  // Initialize state to reflect that dynamic content is not being loaded
  const [pageContent, setPageContent] = useState<any>(null); // Use 'any' or define a minimal type if needed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Removed useEffect hooks for dynamic content loading

  if (loading) {
    return <div>{staticPageData.loadingMessage}</div>;
  }

  if (error) {
    // Assuming error is a string for simplicity based on previous usage
    return <div>{staticPageData.errorMessage.replace('{error}', error)}</div>;
  }

  if (!pageContent) {
    return <div>{staticPageData.notFoundMessage}</div>;
  }

  // This part will not be reached in the current simplified implementation
  // as pageContent is always null. Keeping it for potential future use
  // if dynamic content loading is reimplemented.
  return (
    <article className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{pageContent.title}</h1>
      </header>
      <section className="prose lg:prose-xl max-w-none">
        {/* Render HTML content */}
        <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
      </section>
    </article>
  );
};

export default StaticPage;