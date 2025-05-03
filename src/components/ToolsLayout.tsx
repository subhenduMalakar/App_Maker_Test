import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { 
  FileText, 
  Presentation, 
  Table, 
  Mic, 
  Image as ImageIcon, 
  MessageCircle,
  Bot,
  BookText,
  Terminal,
  ChevronRight,
  Menu,
  X,
  Mail,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "./Layout";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface ToolsLayoutProps {
  children: ReactNode;
}

interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  category?: string; // Adding category to differentiate between regular and free tools
}

const ToolsLayout = ({ children }: ToolsLayoutProps) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    // Redirect to auth page if user is not logged in
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);
  
  // Define all tool categories
  const toolItems: ToolItem[] = [
    {
      id: 'documents',
      name: 'Documents',
      description: 'Create and edit documents with AI assistance',
      icon: <FileText className="h-5 w-5" />,
      path: "/tools/documents",
      category: 'regular'
    },
    {
      id: 'presentations',
      name: 'Presentations',
      description: 'Create beautiful presentations with AI',
      icon: <Presentation className="h-5 w-5" />,
      path: "/tools/presentations",
      category: 'regular'
    },
    {
      id: 'spreadsheets',
      name: 'Spreadsheets',
      description: 'Create and analyze spreadsheets with AI',
      icon: <Table className="h-5 w-5" />,
      path: "/tools/spreadsheets",
      category: 'regular'
    },
    {
      id: 'voiceovers',
      name: 'Voiceovers',
      description: 'Generate natural-sounding voiceovers',
      icon: <Mic className="h-5 w-5" />,
      path: "/tools/voiceovers",
      category: 'regular'
    },
    {
      id: 'images',
      name: 'Images',
      description: 'Create and edit images with AI',
      icon: <ImageIcon className="h-5 w-5" />,
      path: "/tools/images",
      category: 'regular'
    },
    {
      id: 'chat',
      name: 'Chat',
      description: 'Chat with our AI assistant',
      icon: <MessageCircle className="h-5 w-5" />,
      path: "/tools/chat",
      category: 'regular'
    },
    {
      id: 'ai-text-generator',
      name: 'AI Text Generator',
      description: 'Generate high-quality text content',
      icon: <Terminal className="h-5 w-5" />,
      path: "/tools/ai-text-generator",
      category: 'regular'
    },
    {
      id: 'ai-story-generator',
      name: 'AI Story Generator',
      description: 'Create compelling stories and narratives',
      icon: <BookText className="h-5 w-5" />,
      path: "/tools/ai-story-generator",
      category: 'regular'
    },
    // Free AI Tools
    {
      id: 'free-ai-document',
      name: 'Free AI Document Creator',
      description: 'Create professional documents, essays, and articles with our free AI document tool.',
      icon: <FileText className="h-5 w-5" />,
      path: "/tools/free-ai-document",
      category: 'free'
    },
    {
      id: 'free-ai-text',
      name: 'Free AI Text Generator',
      description: 'Generate high-quality text content for any purpose with our free AI text generator.',
      icon: <Terminal className="h-5 w-5" />,
      path: "/tools/free-ai-text",
      category: 'free'
    },
    {
      id: 'free-ai-presentation',
      name: 'Free AI Presentation Maker',
      description: 'Create stunning presentations and PowerPoint slides with our free AI presentation tools.',
      icon: <Presentation className="h-5 w-5" />,
      path: "/tools/free-ai-presentation",
      category: 'free'
    },
    {
      id: 'free-ai-image',
      name: 'Free AI Image Generator',
      description: 'Generate beautiful images and graphics with our free AI image creation tools.',
      icon: <ImageIcon className="h-5 w-5" />,
      path: "/tools/free-ai-image",
      category: 'free'
    },
    {
      id: 'free-ai-email',
      name: 'Free AI Email Generator',
      description: 'Draft professional emails quickly with our free AI email generation tool.',
      icon: <Mail className="h-5 w-5" />,
      path: "/tools/free-ai-email",
      category: 'free'
    },
    {
      id: 'free-ai-story',
      name: 'Free AI Story Generator',
      description: 'Create engaging stories and narratives with our free AI story generation tool.',
      icon: <BookText className="h-5 w-5" />,
      path: "/tools/free-ai-story",
      category: 'free'
    },
    {
      id: 'free-ai-voice',
      name: 'Free AI Voice Generator',
      description: 'Convert text to natural-sounding voice overs with our free AI voice generation tool.',
      icon: <Mic className="h-5 w-5" />,
      path: "/tools/free-ai-voice",
      category: 'free'
    },
    {
      id: 'free-ai-spreadsheet',
      name: 'Free AI Spreadsheet Maker',
      description: 'Create and analyze data with our free AI spreadsheet generation tools.',
      icon: <Table className="h-5 w-5" />,
      path: "/tools/free-ai-spreadsheet",
      category: 'free'
    }
  ];
  
  // Group tools by category
  const regularTools = toolItems.filter(tool => tool.category === 'regular');
  const freeTools = toolItems.filter(tool => tool.category === 'free');
    
  // Find the current active tool
  const currentTool = toolItems.find(tool => currentPath === tool.path);
  
  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-200px)]">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-purple-600" />
              <h2 className="font-semibold">{currentTool?.name || "AI Tools"}</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Sidebar - Tools Navigation */}
        <div 
          className={cn(
            "w-full md:w-64 bg-gray-50 border-r overflow-y-auto transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-96" : "max-h-0 md:max-h-full hidden md:block"
          )}
        >
          <div className="hidden md:flex items-center p-4 border-b">
            <Bot className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="font-semibold">AI Tools</h2>
          </div>
          
          <nav className="py-2">
            {/* Regular AI Tools Section */}
            <div className="mb-4">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500">Premium Tools</div>
              <ul>
                {regularTools.map((tool) => (
                  <li key={tool.id}>
                    <Link 
                      href={tool.path}
                      className={cn(
                        "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100",
                        currentPath === tool.path && "bg-purple-50 text-purple-700 border-l-4 border-purple-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3 text-gray-500">{tool.icon}</span>
                      <span className="font-medium">{tool.name}</span>
                      {currentPath === tool.path && <ChevronRight className="ml-auto h-4 w-4 text-purple-600" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Free AI Tools Section */}
            <div>
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 flex items-center">
                <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
                Free AI Tools
              </div>
              <ul>
                {freeTools.map((tool) => (
                  <li key={tool.id}>
                    <Link 
                      href={tool.path}
                      className={cn(
                        "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100",
                        currentPath === tool.path && "bg-purple-50 text-purple-700 border-l-4 border-purple-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3 text-gray-500">{tool.icon}</span>
                      <span className="font-medium">{tool.name}</span>
                      {currentPath === tool.path && <ChevronRight className="ml-auto h-4 w-4 text-purple-600" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
          {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ToolsLayout;
