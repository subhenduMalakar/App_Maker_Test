import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Upload, X, FileImage, FileAudio, FileVideo, FileArchive, FilePlus, Eye, List, Download, Search, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

const DocumentUploadViewer = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [activeDocument, setActiveDocument] = useState<UploadedDocument | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState<UploadedDocument[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocuments: UploadedDocument[] = Array.from(files).map(file => {
      const newDoc = {
        id: Math.random().toString(36).substring(2, 9), // Simple ID generation
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: file.size,
        uploadedAt: new Date()
      };
      return newDoc;
    });
    
    setUploadedDocuments(prev => [...prev, ...newDocuments]);
    if (newDocuments.length > 0 && !activeDocument) {
      setActiveDocument(newDocuments[0]);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Filter documents based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDocuments(uploadedDocuments);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = uploadedDocuments.filter(doc => 
      doc.name.toLowerCase().includes(query) || 
      doc.type.toLowerCase().includes(query)
    );
    
    setFilteredDocuments(filtered);
  }, [searchQuery, uploadedDocuments]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDocuments(uploadedDocuments);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = uploadedDocuments.filter(doc => 
      doc.name.toLowerCase().includes(query) || 
      doc.type.toLowerCase().includes(query)
    );
    
    setFilteredDocuments(filtered);
  }, [searchQuery, uploadedDocuments]);

  const handleDeleteDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
    if (activeDocument?.id === id) {
      setActiveDocument(uploadedDocuments.length > 1 ? 
        uploadedDocuments.find(doc => doc.id !== id) || null : null);
    }
  };
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  // Get appropriate icon based on file type
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    if (type.includes('image')) return <FileImage className="h-5 w-5 text-blue-500" />;
    if (type.includes('audio')) return <FileAudio className="h-5 w-5 text-yellow-500" />;
    if (type.includes('video')) return <FileVideo className="h-5 w-5 text-purple-500" />;
    if (type.includes('zip') || type.includes('rar')) return <FileArchive className="h-5 w-5 text-green-500" />;
    if (type.includes('doc') || type.includes('word')) return <FileText className="h-5 w-5 text-blue-600" />;
    if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return <FileText className="h-5 w-5 text-green-600" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  // Get colorful background based on file type
  const getFileBackground = (type: string) => {
    if (type.includes('pdf')) return 'from-red-100 to-pink-100';
    if (type.includes('image')) return 'from-blue-100 to-indigo-100';
    if (type.includes('audio')) return 'from-yellow-100 to-amber-100';
    if (type.includes('video')) return 'from-purple-100 to-fuchsia-100';
    if (type.includes('zip') || type.includes('rar')) return 'from-green-100 to-emerald-100';
    if (type.includes('doc') || type.includes('word')) return 'from-blue-100 to-sky-100';
    if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return 'from-green-100 to-teal-100';
    return 'from-gray-100 to-gray-200';
  };

  // Handle document share
  const handleShareDocument = (doc: UploadedDocument) => {
    if (navigator.share) {
      navigator
        .share({
          title: doc.name,
          text: `Check out this document: ${doc.name}`,
          url: doc.url
        })
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(doc.url)
        .then(() => alert('Document link copied to clipboard!'))
        .catch((error) => console.log('Error copying to clipboard', error));
    }
  };
  return (
    <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm border p-6">      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-75 blur-sm"></div>
          <FilePlus className="h-7 w-7 text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-1 relative" />
        </div>
        <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
          Document Upload & Viewer
        </span>
      </h2>        <div className="mb-6">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg,.gif"
          className="hidden"
          multiple
        />
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={triggerFileUpload}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-white opacity-30 rounded-full blur-[1px]"></div>
                <Upload className="h-4 w-4 relative" />
              </div>
              Upload Document
            </Button>
          </motion.div>
          
          {uploadedDocuments.length > 0 && (
            <motion.div 
              className="relative w-full md:w-64 lg:w-72"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-indigo-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 border-indigo-200 focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-40 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          )}
        </div>
        <p className="text-sm text-indigo-600 mt-2 ml-1">
          Supported formats: PDF, DOC, DOCX, TXT, RTF, PNG, JPG, JPEG, GIF
        </p>
      </div>{uploadedDocuments.length > 0 ? (        <div className="mt-6 bg-white rounded-lg p-4 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow duration-300">
          <Tabs defaultValue="viewer" className="w-full"><TabsList className="mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 p-1 border border-indigo-200 rounded-lg shadow-sm">
              <TabsTrigger 
                value="viewer" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Document Viewer
                </div>
              </TabsTrigger>              
              <TabsTrigger 
                value="list" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <div className="flex items-center">
                  <List className="h-4 w-4 mr-2" />
                  All Documents ({uploadedDocuments.length})
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viewer" className="space-y-4">
              {uploadedDocuments.length > 0 && (
                activeDocument ? (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-2">
                        {getFileIcon(activeDocument.type)}
                        <span className="font-medium truncate max-w-md text-indigo-900">{activeDocument.name}</span>
                        <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">({formatFileSize(activeDocument.size)})</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShareDocument(activeDocument)}
                          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDocument(activeDocument.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>                    <motion.div
                        className="border border-indigo-100 rounded-lg overflow-hidden bg-white h-[500px] shadow-md hover:shadow-lg transition-shadow duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                      {activeDocument.type.includes('pdf') ? (
                        <iframe
                          src={`${activeDocument.url}#toolbar=0`}
                          className="w-full h-full"
                          title={activeDocument.name}
                        />
                      ) : activeDocument.type.includes('image') ? (
                        <div className="flex items-center justify-center h-full bg-gray-50">
                          <img
                            src={activeDocument.url}
                            alt={activeDocument.name}
                            className="max-w-full max-h-full object-contain mx-auto shadow-lg"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <motion.div
                            className="text-center text-gray-600 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg max-w-md mx-auto"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <FileText className="h-12 w-12 text-indigo-400 mx-auto mb-3" />
                            <p className="mb-3">Preview not available for this file type.</p>
                            <a
                              href={activeDocument.url}
                              download={activeDocument.name}
                              className="mt-3 inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download {activeDocument.name}
                            </a>
                          </motion.div>
                        </div>
                      )}
                      </motion.div>
                  </div>
                ) : (                <motion.div
                    className="text-center py-12 text-gray-600 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FileText className="h-12 w-12 text-indigo-400 mx-auto mb-3" />
                    <p>No document selected. Upload a document to view it here.</p>
                  </motion.div>
                )
              )}
           </TabsContent>
            <TabsContent value="list">              <div className="bg-white rounded-lg border border-indigo-100 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="grid grid-cols-5 p-3 bg-gradient-to-r from-indigo-100 to-purple-100 border-b font-medium text-sm text-indigo-900">
                  <div className="col-span-2">Filename</div>
                  <div>Type</div>
                  <div>Size</div>
                  <div>Actions</div>
                </div>
                {searchQuery && filteredDocuments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center text-gray-500 bg-gradient-to-r from-indigo-50 to-purple-50"
                  >
                    <Search className="h-12 w-12 text-indigo-300 mx-auto mb-3" />
                    <p className="font-medium text-indigo-700">No documents match your search</p>
                    <p className="text-sm mt-1">Try a different search term or upload new documents</p>
                  </motion.div>
                ) : (                  <div className="divide-y divide-indigo-100">
                    <AnimatePresence>
                      {filteredDocuments.map(doc => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className={`grid grid-cols-5 p-3 text-sm hover:bg-indigo-50 transition-colors ${activeDocument?.id === doc.id ? `bg-gradient-to-r ${getFileBackground(doc.type)}` : ''}`}
                        >
                          <div
                            className="col-span-2 truncate cursor-pointer text-indigo-700 hover:text-indigo-900 flex items-center"
                            onClick={() => setActiveDocument(doc)}
                          >
                            {getFileIcon(doc.type)}
                            <span className="ml-2">{doc.name}</span>
                          </div>                          <div className="truncate">
                            {doc.type.includes('pdf') && (
                              <span className="px-2 py-1 bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200 rounded-full text-xs font-medium">
                                PDF
                              </span>
                            )}
                            {doc.type.includes('image') && (
                              <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 rounded-full text-xs font-medium">
                                IMAGE
                              </span>
                            )}
                            {doc.type.includes('word') || doc.type.includes('doc') && (
                              <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-sky-100 text-sky-800 border border-blue-200 rounded-full text-xs font-medium">
                                DOCUMENT
                              </span>
                            )}
                            {doc.type.includes('sheet') || doc.type.includes('excel') || doc.type.includes('csv') && (
                              <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 rounded-full text-xs font-medium">
                                SPREADSHEET
                              </span>
                            )}
                            {!doc.type.includes('pdf') && !doc.type.includes('image') && !doc.type.includes('word') && !doc.type.includes('doc') && !doc.type.includes('sheet') && !doc.type.includes('excel') && !doc.type.includes('csv') && (
                              <span className="px-2 py-1 bg-gradient-to-r from-gray-100 to-slate-100 text-slate-800 border border-gray-200 rounded-full text-xs font-medium">
                                {doc.type.split('/')[1]?.toUpperCase() || doc.type}
                              </span>
                            )}
                          </div>
                          <div className="text-indigo-700">{formatFileSize(doc.size)}</div>
                          <div className="flex gap-1">                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setActiveDocument(doc)}
                              className="text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 p-1 h-auto rounded-full transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="text-red-500 hover:bg-red-50 hover:text-red-600 p-1 h-auto rounded-full transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>      ) : (        <motion.div
          className="text-center py-12 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-lg border-2 border-dashed border-indigo-200 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-purple-200 to-indigo-200 rounded-full opacity-20 blur-2xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-t from-blue-200 to-purple-200 rounded-full opacity-20 blur-2xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="relative mx-auto w-fit mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-75 blur-md"></div>
                <FileText className="h-16 w-16 text-white bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full relative" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-indigo-800 font-medium mb-2 text-lg">No documents uploaded yet</p>
              <p className="text-indigo-600 mb-6">Upload a document to get started</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={triggerFileUpload}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white mx-auto shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Upload className="h-4 w-4" />
                Browse Files
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentUploadViewer;
