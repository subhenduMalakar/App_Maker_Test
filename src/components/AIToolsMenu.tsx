import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  FileText, 
  Presentation, 
  Table, 
  Mic, 
  Image as ImageIcon, 
  MessageCircle,
  Bot,
  BookText,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToolsConfig } from "@/hooks/use-tools-config";

const AIToolsMenu = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { isToolEnabled, isSectionEnabled } = useToolsConfig();

  // Define tools array to easily map through items
  const tools = [
    {
      path: "/tools/documents",
      name: "Documents",
      icon: <FileText className="h-4 w-4" />
    },
    {
      path: "/tools/presentations",
      name: "Presentations",
      icon: <Presentation className="h-4 w-4" />
    },
    {
      path: "/tools/spreadsheets",
      name: "Spreadsheets",
      icon: <Table className="h-4 w-4" />
    },
    {
      path: "/tools/voiceovers",
      name: "Voiceovers",
      icon: <Mic className="h-4 w-4" />
    },
    {
      path: "/tools/images",
      name: "Images",
      icon: <ImageIcon className="h-4 w-4" />
    },
    {
      path: "/tools/chat",
      name: "Chat",
      icon: <MessageCircle className="h-4 w-4" />
    },
    {
      path: "/tools/ai-text-generator",
      name: "AI Text Generator",
      icon: <Terminal className="h-4 w-4" />
    },
    {
      path: "/tools/ai-story-generator",
      name: "AI Story Generator",
      icon: <BookText className="h-4 w-4" />
    }
  ];
  return (
    <div className="w-56">
      <ul className="flex flex-col space-y-1">
        {isSectionEnabled('aiTools') && tools
          .filter(tool => {
            // Extract the ID from path
            const id = tool.path.split('/').pop() || '';
            return isToolEnabled(id);
          })
          .map((tool, index) => (
          <li key={index}>
            <Link href={tool.path} className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700",
              currentPath.startsWith(tool.path) && "bg-gray-100 text-purple-700 font-medium"
            )}>
              <span className="mr-2">{tool.icon}</span>
              <span>{tool.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIToolsMenu;
