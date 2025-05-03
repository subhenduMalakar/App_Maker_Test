import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download, Edit, Share2 } from 'lucide-react';
import { CV, sampleCV } from '@/data/cvData';
import { CVPreview } from '@/components/CVPreview';
import { downloadCV } from '@/lib/cvUtils';
import { ExportFormat } from '@/types/exportTypes';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function CVPreviewPage() {
  const router = useRouter();
  const { id } = router.query;
  const [cv, setCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // In a real application, we would fetch the CV from the database by ID
    // For now, we'll just use the sample CV
    setCV(sampleCV);
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    router.back();
  };  const handleEdit = () => {
    if (cv) {
      router.push(`/builder?mode=edit&id=${cv.id}`);
    }
  };

  const handleDownload = async (format: ExportFormat = 'pdf') => {
    if (cv) {
      try {
        await downloadCV(cv, format);
      } catch (error) {
        console.error('Error downloading CV:', error);
        alert('There was an error downloading your CV. Please try again.');
      }
    }
  };

  // Button click handlers for each format
  const handleDownloadPDF = () => cv && downloadCV(cv, 'pdf');
  const handleDownloadDOCX = () => cv && downloadCV(cv, 'docx');
  const handleDownloadJPG = () => cv && downloadCV(cv, 'jpg');

  const handleShare = () => {
    // For demonstration purposes only - in a real app, you might implement
    // a more sophisticated sharing mechanism
    if (cv) {
      const shareUrl = `${window.location.origin}/preview/${cv.id}`;
      if (navigator.share) {
        navigator.share({
          title: `${cv.personalInfo.firstName} ${cv.personalInfo.lastName} - CV`,
          text: `Check out this CV for ${cv.personalInfo.firstName} ${cv.personalInfo.lastName}`,
          url: shareUrl,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        alert(`Share this URL: ${shareUrl}`);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!cv) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-8">
            <h1 className="text-2xl font-bold mb-4">CV Not Found</h1>
            <p className="text-gray-600 mb-6">The CV you are looking for does not exist or has been removed.</p>
            <Button onClick={() => router.push('/')}>Go Home</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Head>
        <title>{cv.personalInfo.firstName} {cv.personalInfo.lastName} - CV | CV Maker Pro</title>
      </Head>

      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => cv && downloadCV(cv, 'pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>        <CVPreview 
          cv={cv} 
          onBack={handleBack}
          onExport={async (format: ExportFormat) => cv && await downloadCV(cv, format)}
        />
      </div>
    </div>
  );
}
