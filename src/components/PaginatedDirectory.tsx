
import { useState, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import DirectoryCard from "@/components/DirectoryCard";
import { Search, Filter, Star, StarHalf, StarOff } from "lucide-react";
import { DirectoryItem } from "@/data/directoryData"; // Keep the interface import
import directoryData from "@/data/directoryData.json"; // Import from JSON
import { getPaginatedData, getPageNumbers } from "@/utils/pagination";
import { motion } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import siteConfig from "@/config/siteConfig.json";

interface PaginatedDirectoryProps {
  data: DirectoryItem[];
  categories: string[];
  searchTerm: string;
}

const PaginatedDirectory = ({ data, categories, searchTerm }: PaginatedDirectoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  const itemsPerPage = siteConfig.features.itemsPerPage;
  
  // Get unique features from all directory items
  const allFeatures = useMemo(() => {
    const featuresSet = new Set<string>();
    data.forEach(item => {
      if (item.features) {
        item.features.forEach(feature => {
          featuresSet.add(feature);
        });
      }
    });
    return Array.from(featuresSet).sort();
  }, [data]);
  
  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => {
      if (prev.includes(feature)) {
        return prev.filter(f => f !== feature);
      } else {
        return [...prev, feature];
      }
    });
    setCurrentPage(1); // Reset to first page when changing filters
  };
  
  // Filter data based on search term, category, rating and features
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesRating = item.rating >= minRating;
      
      // Filter by selected features
      const matchesFeatures = selectedFeatures.length === 0 || 
        (item.features && selectedFeatures.every(feature => item.features?.includes(feature)));
      
      return matchesSearch && matchesCategory && matchesRating && matchesFeatures;
    });
}, [data, searchTerm, selectedCategory, minRating, selectedFeatures]);
  
  // Get paginated data
  const { items: displayItems, paginationInfo } = getPaginatedData(
    filteredData,
    currentPage,
    itemsPerPage
  );
  
  // Generate page numbers for pagination navigation
  const pageNumbers = getPageNumbers(
    paginationInfo.currentPage,
    paginationInfo.totalPages
  );
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <div className="w-full">
      {/* Advanced Filters Section */}
      <div className="mb-6">
        <Collapsible
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          className="border rounded-lg shadow-sm bg-white p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" /> Filter Options
            </h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="mt-4 space-y-4">
            {/* Rating Filter */}
            {siteConfig.features.showRatingFilter && (
              <div>
                <h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[minRating]}
                    min={0}
                    max={5}
                    step={0.5}
                    onValueChange={(value) => {
                      setMinRating(value[0]);
                      setCurrentPage(1); // Reset to first page when changing filters
                    }}
                    className="w-full max-w-xs"
                  />
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="text-sm font-medium">{minRating}</span>
                    {minRating > 0 ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4 text-gray-300" />}
                  </div>
                </div>
              </div>
            )}
            
            {/* Features Filter */}
            {siteConfig.features.showFeaturesFilter && allFeatures.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {allFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox 
                        id={feature} 
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <label
                        htmlFor={feature}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to first page when changing filters
            }}
            className="mr-2 mb-2 transition-all duration-300"
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Results Count */}
      <p className="text-gray-600 mb-6">
        Showing {displayItems.length} of {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
      </p>
      
      {/* Directory Cards */}
      {displayItems.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <DirectoryCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-medium text-gray-500">No results found</h3>
          <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {/* Pagination */}
      {paginationInfo.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, paginationInfo.currentPage - 1))}
                  className={paginationInfo.currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {pageNumbers.map((pageNum, idx) => (
                pageNum === null ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === paginationInfo.currentPage}
                      onClick={() => handlePageChange(pageNum)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(paginationInfo.totalPages, paginationInfo.currentPage + 1))}
                  className={paginationInfo.currentPage === paginationInfo.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PaginatedDirectory;
