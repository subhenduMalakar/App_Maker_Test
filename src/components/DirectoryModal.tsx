
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DirectoryItem } from "@/data/directoryData";
import { Facebook, Twitter, Instagram, Linkedin, ExternalLink, Phone, Mail, Clock, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface DirectoryModalProps {
  item: DirectoryItem;
  onClose: () => void;
}

const DirectoryModal = ({ item, onClose }: DirectoryModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
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
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isFavorite ? "bg-red-50 text-red-500" : ""}`}
                onClick={toggleFavorite}
              >
                <Heart className={isFavorite ? "fill-red-500 stroke-red-500" : ""} />
              </Button>
            </motion.div>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-lg">About</h3>
          <p className="mt-2 text-gray-700">{item.description}</p>
          
          {item.yearEstablished && (
            <p className="mt-2 text-gray-600">Established in {item.yearEstablished}</p>
          )}
        </div>
        
        {item.features && item.features.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium text-lg mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {item.features.map(feature => (
                <Badge key={feature} variant="outline" className="bg-gray-50 text-gray-700">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-2 flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <span className="font-medium mr-2 min-w-[80px]">Address:</span>
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
              Hours
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{item.hours}</p>
          </div>
        </div>
        
        {item.socialMedia && Object.keys(item.socialMedia).length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium text-lg mb-2">Social Media</h3>
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
        
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Contact</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DirectoryModal;
