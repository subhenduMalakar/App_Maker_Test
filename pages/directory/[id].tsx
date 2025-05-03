import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import directoryDetailsPageData from "@/data/pages/DirectoryDetails.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { directoryData, DirectoryItem } from "@/data/directoryData"; // Import DirectoryItem interface
import { Facebook, Twitter, Instagram, Linkedin, ExternalLink, Phone, Mail, Clock, MapPin, Heart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import dynamic from 'next/dynamic';

interface DirectoryDetailsProps {
  item: DirectoryItem | undefined;
}

const DirectoryDetails = ({ item }: DirectoryDetailsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    // Check if the current item is in favorites on load
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites && item) {
      const favoriteIds: number[] = JSON.parse(storedFavorites);
      setIsFavorite(favoriteIds.includes(item.id));
    }
  }, [item]); // Add item to dependency array

  const toggleFavorite = () => {
    if (!item) return; // Ensure item exists

    const storedFavorites = localStorage.getItem('favorites');
    let favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      // Remove from favorites
      favoriteIds = favoriteIds.filter(favId => favId !== item.id);
      toast({
        title: "Removed from favorites",
        description: "The item has been removed from your favorites.",
      });
    } else {
      // Add to favorites
      favoriteIds.push(item.id);
      toast({
        title: "Added to favorites",
        description: "The item has been added to your favorites.",
      });
    }

    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
    setIsFavorite(!isFavorite);
  };

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">{directoryDetailsPageData.notFoundTitle}</h1>
        <p className="mb-6">{directoryDetailsPageData.notFoundMessage}</p>
        <Link href="/">
          <Button>{directoryDetailsPageData.returnButtonText}</Button>
        </Link>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{item.name}</title> {/* You might want a more descriptive title */}
        <meta name="description" content={item.description} /> {/* Use item description for meta description */}
        {/* Canonical tag - In Next.js, you might handle this differently or rely on Next.js's default */}
        {/* <link rel="canonical" href={window.location.href} /> */}
      </Head>
      <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {directoryDetailsPageData.backButtonText}
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full bg-white/80 ${isFavorite ? "bg-red-50 text-red-500" : ""}`}
                onClick={toggleFavorite}
              >
                <Heart className={isFavorite ? "fill-red-500 stroke-red-500" : ""} />
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{item.name}</h1>
              <div className="flex items-center mt-2">
                <Badge className="mr-2 bg-purple-500 hover:bg-purple-600">{item.category}</Badge>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{item.rating}</span>
                </div>
                {item.priceRange && (
                  <span className="ml-3 text-gray-700">{item.priceRange}</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-lg">{directoryDetailsPageData.aboutHeading}</h3>
            <p className="mt-2 text-gray-700">{item.description}</p>

            {item.yearEstablished && (
              <p className="mt-2 text-gray-600">Established in {item.yearEstablished}</p>
            )}
          </div>

          {item.features && item.features.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-lg mb-2">{directoryDetailsPageData.featuresHeading}</h3>
              <div className="flex flex-wrap gap-2">
                {item.features.map(feature => (
                  <Badge key={feature} variant="outline" className="bg-gray-50 text-gray-700">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {directoryDetailsPageData.contactInfoHeading}
              </h3>
              <div className="space-y-3">
                <p className="flex items-start">
                  <span className="font-medium mr-2 min-w-[80px]">{directoryDetailsPageData.addressLabel}</span>
                  <span className="text-gray-700">{item.address}</span>
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-gray-500" />
                  <a href={`tel:${item.phone}`} className="text-blue-600 hover:underline">
                    {item.phone}
                  </a>
                </p>
                <p className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4 text-gray-500" />
                  <a
                    href={`https://${item.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.website}
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <a
                    href={`mailto:${item.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.email}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {directoryDetailsPageData.hoursHeading}
              </h3>
              <p className="text-gray-700 whitespace-pre-line">{item.hours}</p>
            </div>
          </div>

          {item.socialMedia && Object.keys(item.socialMedia).length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-2">{directoryDetailsPageData.socialMediaHeading}</h3>
              <div className="flex space-x-2">
                {item.socialMedia.facebook && (
                  <a
                    href={`https://${item.socialMedia.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </a>
                )}
                {item.socialMedia.twitter && (
                  <a
                    href={`https://${item.socialMedia.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-blue-400" />
                  </a>
                )}
                {item.socialMedia.instagram && (
                  <a
                    href={`https://${item.socialMedia.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </a>
                )}
                {item.socialMedia.linkedin && (
                  <a
                    href={`https://${item.socialMedia.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-blue-800" />
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Button className="bg-purple-600 hover:bg-purple-700 w-full">
              <Phone className="mr-2 h-4 w-4" /> {directoryDetailsPageData.contactButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = directoryData.map(item => ({
    params: { id: item.id.toString() }, // Ensure ID is a string
  }));

  return { paths, fallback: false }; // fallback: false means other routes will 404
};

export const getStaticProps: GetStaticProps<DirectoryDetailsProps> = async ({ params }) => {
  const id = Number(params?.id);
  let item = directoryData.find(item => item.id === id) || undefined;

  if (item) {
    // Recursively replace undefined values with null
    const replaceUndefinedWithNull = (obj: any): any => {
      if (obj === undefined) {
        return null;
      }
      if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj[key] = replaceUndefinedWithNull(obj[key]);
          }
        }
      }
      return obj;
    };

    item = replaceUndefinedWithNull(item);
  }

  return {
    props: {
      item,
    },
  };
};

const DirectoryDetailsWithNoSSR = dynamic(() => Promise.resolve(DirectoryDetails), {
  ssr: false
});

export default DirectoryDetailsWithNoSSR;