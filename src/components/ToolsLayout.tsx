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
  Sparkles,
  Star
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
  color?: string; // Adding color property for icon styling
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
  const toolItems: ToolItem[] = [    {
      id: 'documents',
      name: 'Documents',
      description: 'Create and edit documents with AI assistance',
      icon: <FileText className="h-5 w-5 text-purple-600" />,
      path: "/tools/documents",
      category: 'regular',
      color: 'purple'
    },
    {
      id: 'presentations',
      name: 'Presentations',
      description: 'Create beautiful presentations with AI',
      icon: <Presentation className="h-5 w-5 text-blue-600" />,
      path: "/tools/presentations",
      category: 'regular',
      color: 'blue'
    },
    {
      id: 'spreadsheets',
      name: 'Spreadsheets',
      description: 'Create and analyze spreadsheets with AI',
      icon: <Table className="h-5 w-5 text-green-600" />,
      path: "/tools/spreadsheets",
      category: 'regular',
      color: 'green'
    },
    {
      id: 'voiceovers',
      name: 'Voiceovers',
      description: 'Generate natural-sounding voiceovers',
      icon: <Mic className="h-5 w-5 text-cyan-600" />,
      path: "/tools/voiceovers",
      category: 'regular',
      color: 'cyan'
    },
    {
      id: 'images',
      name: 'Images',
      description: 'Create and edit images with AI',
      icon: <ImageIcon className="h-5 w-5 text-indigo-600" />,
      path: "/tools/images",
      category: 'regular',
      color: 'indigo'
    },
    {
      id: 'chat',
      name: 'Chat',
      description: 'Chat with our AI assistant',
      icon: <MessageCircle className="h-5 w-5 text-amber-600" />,
      path: "/tools/chat",
      category: 'regular',
      color: 'amber'
    },    {
      id: 'ai-text-generator',
      name: 'AI Text Generator',
      description: 'Generate high-quality text content',
      icon: <Terminal className="h-5 w-5 text-cyan-600" />,
      path: "/tools/ai-text-generator",
      category: 'regular',
      color: 'cyan'
    },
    {
      id: 'ai-story-generator',
      name: 'AI Story Generator',
      description: 'Create compelling stories and narratives',
      icon: <BookText className="h-5 w-5 text-pink-600" />,
      path: "/tools/ai-story-generator",
      category: 'regular',
      color: 'pink'
    },// Free AI Tools
    {
      id: 'free-ai-document',
      name: 'Free AI Document Creator',
      description: 'Create professional documents, essays, and articles with our free AI document tool.',
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      path: "/tools/free-ai-document",
      category: 'free',
      color: 'purple'
    },
    {
      id: 'free-ai-text',
      name: 'Free AI Text Generator',
      description: 'Generate high-quality text content for any purpose with our free AI text generator.',
      icon: <Terminal className="h-5 w-5 text-cyan-500" />,
      path: "/tools/free-ai-text",
      category: 'free',
      color: 'cyan'
    },
    {
      id: 'free-ai-presentation',
      name: 'Free AI Presentation Maker',
      description: 'Create stunning presentations and PowerPoint slides with our free AI presentation tools.',
      icon: <Presentation className="h-5 w-5 text-blue-500" />,
      path: "/tools/free-ai-presentation",
      category: 'free',
      color: 'blue'
    },
    {
      id: 'free-ai-image',
      name: 'Free AI Image Generator',
      description: 'Generate beautiful images and graphics with our free AI image creation tools.',
      icon: <ImageIcon className="h-5 w-5 text-indigo-500" />,
      path: "/tools/free-ai-image",
      category: 'free',
      color: 'indigo'
    },    {
      id: 'free-ai-email',
      name: 'Free AI Email Generator',
      description: 'Draft professional emails quickly with our free AI email generation tool.',
      icon: <Mail className="h-5 w-5 text-blue-400" />,
      path: "/tools/free-ai-email",
      category: 'free',
      color: 'blue'
    },
    {
      id: 'free-ai-story',
      name: 'Free AI Story Generator',
      description: 'Create engaging stories and narratives with our free AI story generation tool.',
      icon: <BookText className="h-5 w-5 text-pink-500" />,
      path: "/tools/free-ai-story",
      category: 'free',
      color: 'pink'
    },
    {
      id: 'free-ai-voice',
      name: 'Free AI Voice Generator',
      description: 'Convert text to natural-sounding voice overs with our free AI voice generation tool.',
      icon: <Mic className="h-5 w-5 text-red-500" />,
      path: "/tools/free-ai-voice",
      category: 'free',
      color: 'red'
    },
    {
      id: 'free-ai-spreadsheet',
      name: 'Free AI Spreadsheet Maker',
      description: 'Create and analyze data with our free AI spreadsheet generation tools.',
      icon: <Table className="h-5 w-5 text-green-500" />,
      path: "/tools/free-ai-spreadsheet",
      category: 'free',
      color: 'green'
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
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-75 blur-sm"></div>
                <Bot className="h-6 w-6 text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-1 relative" />
              </div>
              <h2 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                {currentTool?.name || "AI Tools"}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-purple-600 hover:bg-purple-50"
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
        >          <div className="hidden md:flex items-center p-4 border-b">
            <div className="relative mr-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-75 blur-sm"></div>
              <Bot className="h-6 w-6 text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-1 relative" />
            </div>
            <h2 className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">AI Tools</h2>
          </div>
          
          <nav className="py-2">
            {/* Regular AI Tools Section */}            <div className="mb-4">
              <div className="px-4 py-2 text-sm font-semibold flex items-center">
                <div className="relative mr-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-300 to-indigo-400 rounded-full opacity-75 blur-[1px]"></div>
                  <Star className="h-4 w-4 text-white bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full p-0.5 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Premium Tools</span>
              </div>
              <ul>
                {/* Document Tools */}
                <div className="mb-2">
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">Document Tools</div>                  {regularTools
                    .filter(tool => tool.id === 'documents' || tool.id === 'ai-text-generator' || tool.id === 'ai-story-generator')
                    .map((tool) => {
                    // Define color classes based on the tool's color
                    const activeClassMap = {
                      'purple': 'bg-purple-50 text-purple-700 border-l-4 border-purple-600',
                      'blue': 'bg-blue-50 text-blue-700 border-l-4 border-blue-600',
                      'green': 'bg-green-50 text-green-700 border-l-4 border-green-600',
                      'red': 'bg-red-50 text-red-700 border-l-4 border-red-600',
                      'indigo': 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600',
                      'amber': 'bg-amber-50 text-amber-700 border-l-4 border-amber-600',
                      'cyan': 'bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600',
                      'pink': 'bg-pink-50 text-pink-700 border-l-4 border-pink-600',
                    };
                    
                    const iconBgClassMap = {
                      'purple': 'bg-purple-100 text-purple-700',
                      'blue': 'bg-blue-100 text-blue-700',
                      'green': 'bg-green-100 text-green-700',
                      'red': 'bg-red-100 text-red-700',
                      'indigo': 'bg-indigo-100 text-indigo-700',
                      'amber': 'bg-amber-100 text-amber-700',
                      'cyan': 'bg-cyan-100 text-cyan-700',
                      'pink': 'bg-pink-100 text-pink-700',
                    };
                    
                    const chevronClassMap = {
                      'purple': 'text-purple-600',
                      'blue': 'text-blue-600',
                      'green': 'text-green-600',
                      'red': 'text-red-600',
                      'indigo': 'text-indigo-600',
                      'amber': 'text-amber-600',
                      'cyan': 'text-cyan-600',
                      'pink': 'text-pink-600',
                    };
                    
                    const isActive = currentPath === tool.path;
                    const activeClass = tool.color ? activeClassMap[tool.color] : 'bg-purple-50 text-purple-700 border-l-4 border-purple-600';
                    const iconBgClass = tool.color && isActive ? iconBgClassMap[tool.color] : 'bg-gray-100 group-hover:bg-gray-200';
                    const chevronClass = tool.color ? chevronClassMap[tool.color] : 'text-purple-600';
                    
                    return (
                      <li key={tool.id}>
                        <Link 
                          href={tool.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group",
                            isActive && activeClass
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "mr-3 flex items-center justify-center rounded-full w-7 h-7 transition-colors",
                            iconBgClass
                          )}>
                            {tool.icon}
                          </div>
                          <span className="font-medium">{tool.name}</span>
                          {isActive && <ChevronRight className={`ml-auto h-4 w-4 ${chevronClass}`} />}
                        </Link>
                      </li>
                    );
                  })}
                </div>
                
                {/* Presentation & Visual Tools */}
                <div className="mb-2">
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">Presentation & Visual</div>
                  {regularTools
                    .filter(tool => tool.id === 'presentations' || tool.id === 'images')
                    .map((tool) => {
                    // Define color classes based on the tool's color
                    const activeClassMap = {
                      'purple': 'bg-purple-50 text-purple-700 border-l-4 border-purple-600',
                      'blue': 'bg-blue-50 text-blue-700 border-l-4 border-blue-600',
                      'green': 'bg-green-50 text-green-700 border-l-4 border-green-600',
                      'red': 'bg-red-50 text-red-700 border-l-4 border-red-600',
                      'indigo': 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600',
                      'amber': 'bg-amber-50 text-amber-700 border-l-4 border-amber-600',
                      'cyan': 'bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600',
                      'pink': 'bg-pink-50 text-pink-700 border-l-4 border-pink-600',
                    };
                    
                    const iconBgClassMap = {
                      'purple': 'bg-purple-100 text-purple-700',
                      'blue': 'bg-blue-100 text-blue-700',
                      'green': 'bg-green-100 text-green-700',
                      'red': 'bg-red-100 text-red-700',
                      'indigo': 'bg-indigo-100 text-indigo-700',
                      'amber': 'bg-amber-100 text-amber-700',
                      'cyan': 'bg-cyan-100 text-cyan-700',
                      'pink': 'bg-pink-100 text-pink-700',
                    };
                    
                    const chevronClassMap = {
                      'purple': 'text-purple-600',
                      'blue': 'text-blue-600',
                      'green': 'text-green-600',
                      'red': 'text-red-600',
                      'indigo': 'text-indigo-600',
                      'amber': 'text-amber-600',
                      'cyan': 'text-cyan-600',
                      'pink': 'text-pink-600',
                    };
                    
                    const isActive = currentPath === tool.path;
                    const activeClass = tool.color ? activeClassMap[tool.color] : 'bg-purple-50 text-purple-700 border-l-4 border-purple-600';
                    const iconBgClass = tool.color && isActive ? iconBgClassMap[tool.color] : 'bg-gray-100 group-hover:bg-gray-200';
                    const chevronClass = tool.color ? chevronClassMap[tool.color] : 'text-purple-600';
                    
                    return (
                      <li key={tool.id}>
                        <Link 
                          href={tool.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group",
                            isActive && activeClass
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "mr-3 flex items-center justify-center rounded-full w-7 h-7 transition-colors",
                            iconBgClass
                          )}>
                            {tool.icon}
                          </div>
                          <span className="font-medium">{tool.name}</span>
                          {isActive && <ChevronRight className={`ml-auto h-4 w-4 ${chevronClass}`} />}
                        </Link>
                      </li>
                    );
                  })}
                </div>
                
                {/* Data & Communication Tools */}
                <div className="mb-2">
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">Data & Communication</div>
                  {regularTools
                    .filter(tool => tool.id === 'spreadsheets' || tool.id === 'voiceovers' || tool.id === 'chat')
                    .map((tool) => {
                    // Define color classes based on the tool's color
                    const activeClassMap = {
                      'purple': 'bg-purple-50 text-purple-700 border-l-4 border-purple-600',
                      'blue': 'bg-blue-50 text-blue-700 border-l-4 border-blue-600',
                      'green': 'bg-green-50 text-green-700 border-l-4 border-green-600',
                      'red': 'bg-red-50 text-red-700 border-l-4 border-red-600',
                      'indigo': 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600',
                      'amber': 'bg-amber-50 text-amber-700 border-l-4 border-amber-600',
                      'cyan': 'bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600',
                      'pink': 'bg-pink-50 text-pink-700 border-l-4 border-pink-600',
                    };
                    
                    const iconBgClassMap = {
                      'purple': 'bg-purple-100 text-purple-700',
                      'blue': 'bg-blue-100 text-blue-700',
                      'green': 'bg-green-100 text-green-700',
                      'red': 'bg-red-100 text-red-700',
                      'indigo': 'bg-indigo-100 text-indigo-700',
                      'amber': 'bg-amber-100 text-amber-700',
                      'cyan': 'bg-cyan-100 text-cyan-700',
                      'pink': 'bg-pink-100 text-pink-700',
                    };
                    
                    const chevronClassMap = {
                      'purple': 'text-purple-600',
                      'blue': 'text-blue-600',
                      'green': 'text-green-600',
                      'red': 'text-red-600',
                      'indigo': 'text-indigo-600',
                      'amber': 'text-amber-600',
                      'cyan': 'text-cyan-600',
                      'pink': 'text-pink-600',
                    };
                    
                    const isActive = currentPath === tool.path;
                    const activeClass = tool.color ? activeClassMap[tool.color] : 'bg-purple-50 text-purple-700 border-l-4 border-purple-600';
                    const iconBgClass = tool.color && isActive ? iconBgClassMap[tool.color] : 'bg-gray-100 group-hover:bg-gray-200';
                    const chevronClass = tool.color ? chevronClassMap[tool.color] : 'text-purple-600';
                    
                    return (
                      <li key={tool.id}>
                        <Link 
                          href={tool.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group",
                            isActive && activeClass
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "mr-3 flex items-center justify-center rounded-full w-7 h-7 transition-colors",
                            iconBgClass
                          )}>
                            {tool.icon}
                          </div>
                          <span className="font-medium">{tool.name}</span>
                          {isActive && <ChevronRight className={`ml-auto h-4 w-4 ${chevronClass}`} />}
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
            
            {/* Free AI Tools Section */}
            <div>              <div className="px-4 py-2 text-sm font-semibold flex items-center">
                <div className="relative mr-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full opacity-75 blur-[1px]"></div>
                  <Sparkles className="h-4 w-4 text-white bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full p-0.5 relative" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600">Free AI Tools</span>
              </div>              <ul>
                {/* Document & Text Tools */}
                <div className="mb-2">
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">Documents & Text</div>
                  {freeTools
                    .filter(tool => 
                      tool.id === 'free-ai-document' || 
                      tool.id === 'free-ai-text' || 
                      tool.id === 'free-ai-story' ||
                      tool.id === 'free-ai-email'
                    )
                    .map((tool) => {
                    // Define color classes based on the tool's color
                    const activeClassMap = {
                      'purple': 'bg-purple-50 text-purple-700 border-l-4 border-purple-600',
                      'blue': 'bg-blue-50 text-blue-700 border-l-4 border-blue-600',
                      'green': 'bg-green-50 text-green-700 border-l-4 border-green-600',
                      'red': 'bg-red-50 text-red-700 border-l-4 border-red-600',
                      'indigo': 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600',
                      'amber': 'bg-amber-50 text-amber-700 border-l-4 border-amber-600',
                      'cyan': 'bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600',
                      'pink': 'bg-pink-50 text-pink-700 border-l-4 border-pink-600',
                    };
                    
                    const iconBgClassMap = {
                      'purple': 'bg-purple-100 text-purple-700',
                      'blue': 'bg-blue-100 text-blue-700',
                      'green': 'bg-green-100 text-green-700',
                      'red': 'bg-red-100 text-red-700',
                      'indigo': 'bg-indigo-100 text-indigo-700',
                      'amber': 'bg-amber-100 text-amber-700',
                      'cyan': 'bg-cyan-100 text-cyan-700',
                      'pink': 'bg-pink-100 text-pink-700',
                    };
                    
                    const chevronClassMap = {
                      'purple': 'text-purple-600',
                      'blue': 'text-blue-600',
                      'green': 'text-green-600',
                      'red': 'text-red-600',
                      'indigo': 'text-indigo-600',
                      'amber': 'text-amber-600',
                      'cyan': 'text-cyan-600',
                      'pink': 'text-pink-600',
                    };
                    
                    const isActive = currentPath === tool.path;
                    const activeClass = tool.color ? activeClassMap[tool.color] : 'bg-purple-50 text-purple-700 border-l-4 border-purple-600';
                    const iconBgClass = tool.color && isActive ? iconBgClassMap[tool.color] : 'bg-gray-100 group-hover:bg-gray-200';
                    const chevronClass = tool.color ? chevronClassMap[tool.color] : 'text-purple-600';
                    
                    return (
                      <li key={tool.id}>
                        <Link 
                          href={tool.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group",
                            isActive && activeClass
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "mr-3 flex items-center justify-center rounded-full w-7 h-7 transition-colors",
                            iconBgClass
                          )}>
                            {tool.icon}
                          </div>
                          <span className="font-medium">{tool.name}</span>
                          {isActive && <ChevronRight className={`ml-auto h-4 w-4 ${chevronClass}`} />}
                        </Link>
                      </li>
                    );
                  })}
                </div>
                
                {/* Visual & Presentation Tools */}
                <div className="mb-2">
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">Visual & Presentation</div>
                  {freeTools
                    .filter(tool => 
                      tool.id === 'free-ai-presentation' || 
                      tool.id === 'free-ai-image'
                    )
                    .map((tool) => {
                    // Define color classes based on the tool's color
                    const activeClassMap = {
                      'purple': 'bg-purple-50 text-purple-700 border-l-4 border-purple-600',
                      'blue': 'bg-blue-50 text-blue-700 border-l-4 border-blue-600',
                      'green': 'bg-green-50 text-green-700 border-l-4 border-green-600',
                      'red': 'bg-red-50 text-red-700 border-l-4 border-red-600',
                      'indigo': 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600',
                      'amber': 'bg-amber-50 text-amber-700 border-l-4 border-amber-600',
                      'cyan': 'bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600',
                      'pink': 'bg-pink-50 text-pink-700 border-l-4 border-pink-600',
                    };
                    
                    const iconBgClassMap = {
                      'purple': 'bg-purple-100 text-purple-700',
                      'blue': 'bg-blue-100 text-blue-700',
                      'green': 'bg-green-100 text-green-700',
                      'red': 'bg-red-100 text-red-700',
                      'indigo': 'bg-indigo-100 text-indigo-700',
                      'amber': 'bg-amber-100 text-amber-700',
                      'cyan': 'bg-cyan-100 text-cyan-700',
                      'pink': 'bg-pink-100 text-pink-700',
                    };
                    
                    const chevronClassMap = {
                      'purple': 'text-purple-600',
                      'blue': 'text-blue-600',
                      'green': 'text-green-600',
                      'red': 'text-red-600',
                      'indigo': 'text-indigo-600',
                      'amber': 'text-amber-600',
                      'cyan': 'text-cyan-600',
                      'pink': 'text-pink-600',
                    };
                    
                    const isActive = currentPath === tool.path;
                    const activeClass = tool.color ? activeClassMap[tool.color] : 'bg-purple-50 text-purple-700 border-l-4 border-purple-600';
                    const iconBgClass = tool.color && isActive ? iconBgClassMap[tool.color] : 'bg-gray-100 group-hover:bg-gray-200';
                    const chevronClass = tool.color ? chevronClassMap[tool.color] : 'text-purple-600';
                    
                    return (
                      <li key={tool.id}>
                        <Link 
                          href={tool.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group",
                            isActive && activeClass
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "mr-3 flex items-center justify-center rounded-full w-7 h-7 transition-colors",
                            iconBgClass
                          )}>
                            {tool.icon}
                          </div>
                          <span className="font-medium">{tool.name}</span>
                          {isActive && <ChevronRight className={`ml-auto h-4 w-4 ${chevronClass}`} />}
                        </Link>
                      </li>
                    );
                  })}
                </div>
                
                {/* Data & Media Tools */}
                <div>
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">Data & Media</div>
                  {freeTools
                    .filter(tool => 
                      tool.id === 'free-ai-spreadsheet' || 
                      tool.id === 'free-ai-voice'
                    )
                    .map((tool) => {
                    // Define color classes based on the tool's color
                    const activeClassMap = {
                      'purple': 'bg-purple-50 text-purple-700 border-l-4 border-purple-600',
                      'blue': 'bg-blue-50 text-blue-700 border-l-4 border-blue-600',
                      'green': 'bg-green-50 text-green-700 border-l-4 border-green-600',
                      'red': 'bg-red-50 text-red-700 border-l-4 border-red-600',
                      'indigo': 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600',
                      'amber': 'bg-amber-50 text-amber-700 border-l-4 border-amber-600',
                      'cyan': 'bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600',
                      'pink': 'bg-pink-50 text-pink-700 border-l-4 border-pink-600',
                    };
                    
                    const iconBgClassMap = {
                      'purple': 'bg-purple-100 text-purple-700',
                      'blue': 'bg-blue-100 text-blue-700',
                      'green': 'bg-green-100 text-green-700',
                      'red': 'bg-red-100 text-red-700',
                      'indigo': 'bg-indigo-100 text-indigo-700',
                      'amber': 'bg-amber-100 text-amber-700',
                      'cyan': 'bg-cyan-100 text-cyan-700',
                      'pink': 'bg-pink-100 text-pink-700',
                    };
                    
                    const chevronClassMap = {
                      'purple': 'text-purple-600',
                      'blue': 'text-blue-600',
                      'green': 'text-green-600',
                      'red': 'text-red-600',
                      'indigo': 'text-indigo-600',
                      'amber': 'text-amber-600',
                      'cyan': 'text-cyan-600',
                      'pink': 'text-pink-600',
                    };
                    
                    const isActive = currentPath === tool.path;
                    const activeClass = tool.color ? activeClassMap[tool.color] : 'bg-purple-50 text-purple-700 border-l-4 border-purple-600';
                    const iconBgClass = tool.color && isActive ? iconBgClassMap[tool.color] : 'bg-gray-100 group-hover:bg-gray-200';
                    const chevronClass = tool.color ? chevronClassMap[tool.color] : 'text-purple-600';
                    
                    return (
                      <li key={tool.id}>
                        <Link 
                          href={tool.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 group",
                            isActive && activeClass
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={cn(
                            "mr-3 flex items-center justify-center rounded-full w-7 h-7 transition-colors",
                            iconBgClass
                          )}>
                            {tool.icon}
                          </div>
                          <span className="font-medium">{tool.name}</span>
                          {isActive && <ChevronRight className={`ml-auto h-4 w-4 ${chevronClass}`} />}
                        </Link>
                      </li>
                    );
                  })}                </div>
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
