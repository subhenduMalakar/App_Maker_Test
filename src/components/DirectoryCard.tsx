
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DirectoryItem } from "@/data/directoryData";
import { motion } from "framer-motion";
import Link from "next/link";

interface DirectoryCardProps {
  item: DirectoryItem;
}

const DirectoryCard = ({ item }: DirectoryCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/directory/${item.id}`} className="block h-full">
        <Card
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <CardContent className="pt-6 flex-grow">
            <div className="flex justify-between items-start mb-2">
              <Badge className="bg-purple-500 hover:bg-purple-600">{item.category}</Badge>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{item.rating}</span>
              </div>
            </div>

            <h3 className="font-bold text-xl mb-2 text-gray-900">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>

            {item.features && item.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {item.features.slice(0, 2).map(feature => (
                  <span key={feature} className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs">
                    {feature}
                  </span>
                ))}
                {item.features.length > 2 && (
                  <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs">
                    +{item.features.length - 2} more
                  </span>
                )}
              </div>
            )}

            {item.priceRange && (
              <div className="text-gray-700 font-medium">
                {item.priceRange}
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t pt-4 text-sm text-gray-500">
            <address className="not-italic text-left">{item.address}</address>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default DirectoryCard;
