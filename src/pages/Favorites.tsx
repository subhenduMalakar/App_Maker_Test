
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DirectoryCard from "@/components/DirectoryCard";
import { Button } from "@/components/ui/button";
import { DirectoryItem } from "@/data/directoryData";
import directoryData from "@/data/directoryData.json";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import favoritesPageData from "@/data/pages/Favorites.json";

const Favorites = () => {
  const [favorites, setFavorites] = useState<DirectoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you would load favorites from localStorage or an API
    // For this example, we'll filter from the loaded directoryData
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoriteIds: number[] = JSON.parse(storedFavorites);
      const filteredFavorites = directoryData.filter(item => favoriteIds.includes(item.id));
      setFavorites(filteredFavorites);
    } else {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever favorites change
    localStorage.setItem('favorites', JSON.stringify(favorites.map(item => item.id)));
  }, [favorites]);
  
  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
    toast({
      title: "Removed from favorites",
      description: "The item has been removed from your favorites.",
    });
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{favoritesPageData.headerTitle}</h1>
          <p className="text-xl opacity-90 mb-8">
            {favoritesPageData.headerDescription}
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        {favorites.length > 0 ? (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {favorites.map(item => (
                <motion.div key={item.id} variants={itemVariants} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/80 hover:bg-white text-red-500 hover:text-red-600 backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromFavorites(item.id);
                      }}
                    >
                      {favoritesPageData.removeButtonText}
                    </Button>
                  </div>
                  <DirectoryCard item={item} />
                </motion.div>
              ))}
            </motion.div>
            
            <p className="text-center text-gray-600">
              {favoritesPageData.favoritesCountText.replace('{count}', favorites.length.toString()).replace('{count, plural, one {favorite} other {favorites}}', favorites.length === 1 ? 'favorite' : 'favorites')}
            </p>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{favoritesPageData.noFavoritesHeading}</h2>
            <p className="text-gray-500 mb-6">
              {favoritesPageData.noFavoritesMessage}
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {favoritesPageData.exploreButtonText}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
