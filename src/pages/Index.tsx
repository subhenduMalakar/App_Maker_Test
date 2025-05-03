
import { Helmet } from 'react-helmet-async';

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { categories } from "@/data/directoryData";
import directoryData from "@/data/directoryData.json";
import PaginatedDirectory from "@/components/PaginatedDirectory";
import { useState } from "react";
import siteConfig from "@/config/siteConfig.json";
import indexPageData from "@/data/pages/Index.json";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search term is already tracked in state and passed to child components
    // This function is here to prevent form submission refresh
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{siteConfig.site.title}</title>
        <meta name="description" content={siteConfig.site.description} />
      </Helmet>
      {/* Header Section */}
      <header className={`${siteConfig.site.headerBackground} text-white py-16`}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{siteConfig.site.title}</h1>
          <p className="text-xl opacity-90 mb-8">{siteConfig.site.description}</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl bg-white rounded-full overflow-hidden flex items-center p-1 shadow-lg">
            <Search className="ml-4 text-gray-400" />
            <input
              type="text"
              placeholder={indexPageData.searchPlaceholder}
              className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ color: 'black', zIndex: 10 }}
              value={searchTerm}
              onChange={(e) => {
                console.log('Input change event:', e.target.value);
                setSearchTerm(e.target.value);
              }}
            />
            <Button type="submit" className="rounded-full">{indexPageData.searchButtonText}</Button>
          </form>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <PaginatedDirectory data={directoryData} categories={categories} searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default Index;
