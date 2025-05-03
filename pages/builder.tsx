import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { CVBuilder } from '@/components/CVBuilder';
import { CVUploader } from '@/components/CVUploader';
import { CVPreview } from '@/components/CVPreview';
import { useAuth } from '@/context/AuthContext';
import { createNewCV } from '@/lib/cvUtils';
import { downloadCV } from '@/lib/cvUtils';
import { ExportFormat } from '@/types/exportTypes';

enum BuilderMode {
  LIST = 'list',
  CREATE = 'create',
  EDIT = 'edit',
  PREVIEW = 'preview',
  UPLOAD = 'upload'
}

export default function Builder() {
  const router = useRouter();
  const { user } = useAuth();
  const [mode, setMode] = useState<BuilderMode>(BuilderMode.LIST);
  const [currentCV, setCurrentCV] = useState<any | null>(null);
  const [myCVs, setMyCVs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/auth');
      return;
    }

    // Load saved CVs (would come from database in real implementation)
    // For now using sample data
    // setMyCVs([sampleCV]); // Removed due to missing cvData
    setMyCVs([]); // Initialize with empty array
    setLoading(false);
  }, [user, router]);

  // Create a new CV
  const handleCreateCV = () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    
    const newCV = createNewCV(user.id);
    setCurrentCV(newCV);
    setMode(BuilderMode.CREATE);
  };

  // Edit an existing CV
  const handleEditCV = (cv: any) => {
    setCurrentCV(cv);
    setMode(BuilderMode.EDIT);
  };

  // Save CV changes
  const handleSaveCV = (cv: any) => {
    // In a real implementation, this would save to the database
    const isExisting = myCVs.some(existing => existing.id === cv.id);
    
    if (isExisting) {
      // Update existing CV
      setMyCVs(myCVs.map(existing => 
        existing.id === cv.id ? cv : existing
      ));
    } else {
      // Add new CV
      setMyCVs([...myCVs, cv]);
    }
    
    setCurrentCV(null);
    setMode(BuilderMode.LIST);
  };

  // Delete a CV
  const handleDeleteCV = (id: string) => {
    // In a real implementation, this would delete from the database
    setMyCVs(myCVs.filter(cv => cv.id !== id));
  };
  // View a CV
  const handleViewCV = (cv: any) => {
    setCurrentCV(cv);
    setMode(BuilderMode.PREVIEW);
  };

  // Export a CV
  const handleExportCV = async (cv: any, format: ExportFormat): Promise<void> => {
    try {
      await downloadCV(cv, format);
    } catch (error) {
      console.error('Error exporting CV:', error);
      alert('There was an error exporting your CV. Please try again.');
    }
  };

  // Handle upload complete
  const handleUploadComplete = (cvData: Partial<any>) => {
    // In a real implementation, this would process the uploaded CV
    // and extract information
    const newCV = createNewCV(user?.id || 'guest');
    setCurrentCV({
      ...newCV,
      ...cvData,
      name: 'Imported CV',
    } as any);
    
    setMode(BuilderMode.EDIT);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Head>
        <title>CV Builder | CV Maker Pro</title>
      </Head>

      <div className="container mx-auto max-w-7xl">
        {mode === BuilderMode.LIST && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">My CVs</h1>
              {/* <CreateCVButton onCreate={handleCreateCV} /> Removed due to missing component */}
            </div>

            {myCVs.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Create Your First CV</h2>
                <p className="text-gray-600 mb-6">Get started by creating a professional CV in minutes.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleCreateCV}>
                    Create From Scratch
                  </Button>
                  <Button variant="outline" onClick={() => setMode(BuilderMode.UPLOAD)}>
                    Upload Existing CV
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myCVs.map(cv => (
                  <div key={cv.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2">{cv.name}</h2>
                      <p className="text-gray-600 mb-4">
                        {cv.personalInfo.firstName} {cv.personalInfo.lastName}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Last updated: {new Date(cv.updatedAt).toLocaleDateString()}
                      </p>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleViewCV(cv)}>
                          View
                        </Button>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditCV(cv)}>
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500" 
                            onClick={() => handleDeleteCV(cv.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New CV Card */}
                <div 
                  className="bg-gray-50 rounded-lg border-2 border-dashed flex flex-col justify-center items-center p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={handleCreateCV}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl font-bold">+</span>
                  </div>
                  <p className="font-medium text-gray-700">Create New CV</p>
                </div>
              </div>
            )}
          </div>
        )}

        {(mode === BuilderMode.CREATE || mode === BuilderMode.EDIT) && currentCV && (
          <CVBuilder 
            cv={currentCV}
            onSave={handleSaveCV}
            onCancel={() => {
              setCurrentCV(null);
              setMode(BuilderMode.LIST);
            }}
            onExport={handleExportCV}
          />
        )}        {mode === BuilderMode.PREVIEW && currentCV && (
          <CVPreview 
            cv={currentCV}
            onBack={() => setMode(BuilderMode.LIST)}
            onExport={async (format: ExportFormat) => handleExportCV(currentCV, format)}
          />
        )}

        {mode === BuilderMode.UPLOAD && (
          <CVUploader 
            userId={user?.id || 'guest'}
            onUploadComplete={handleUploadComplete}
            onCancel={() => setMode(BuilderMode.LIST)}
          />
        )}
      </div>
    </div>
  );
}
