import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Menu, 
  X, 
  Search, 
  Wand2,
  FileText,
  Presentation,
  Table,
  Mic,
  Image as ImageIcon,
  MessageCircle,
  Terminal,
  BookText 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import AIToolsMenu from './AIToolsMenu';

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  includeLayout?: boolean;
}

const Layout = ({ children, hideHeader = false }: LayoutProps) => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;
  const { user, supabase } = useAuth(); // Use the useAuth hook
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      router.push('/auth'); // Redirect to login page after logout
    }  };  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    // Templates replaced with AI Tools dropdown
    { path: "ai-tools-dropdown", label: "AI Tools", isDropdown: true },
    { path: "/blog", label: "Blog" },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && (
        <nav className="bg-white shadow-sm py-4 z-50">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-2xl text-blue-600">
              AI<span className="text-teal-500">Tools</span>Suite
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-gray-700"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>            {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              // Special handling for the AI Tools dropdown
              if (item.isDropdown) {
                return (
                  <div key={item.path} className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 font-medium text-gray-700 hover:text-purple-700"
                      onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
                    >
                      <Wand2 className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                    
                    {/* AI Tools Menu - Shown when button is clicked */}
                    {isToolsMenuOpen && (
                      <div className="absolute top-full left-0 mt-2 p-2 bg-white shadow-lg rounded-md z-50">
                        <AIToolsMenu />
                      </div>
                    )}
                  </div>
                );
              }
              
              // Regular navigation items
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-medium ${
                    currentPath === item.path
                      ? "text-purple-700 border-b-2 border-purple-700"
                      : "text-gray-700 hover:text-purple-700"
                  } transition-colors`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Original AI Tools button removed as it's now part of the main navigation */}
            
            <Link href="/favorites">
              <Button size="icon" variant="ghost">
                <Heart className={currentPath === "/favorites" ? "text-red-500" : ""} />
              </Button>
            </Link>
            <Link href="/">
              <Button size="icon" variant="ghost">
                <Search />
              </Button>
            </Link>
            {user ? (
              <>
                <span className="text-gray-700 text-sm">Logged in as {user.email}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`font-medium ${
                      currentPath === item.path
                        ? "text-purple-700"
                        : "text-gray-700"
                    } py-2 transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile AI Tools Menu */}
                <div className="border-t border-gray-200 pt-2">
                  <div 
                    className="font-medium flex items-center justify-between text-gray-700 py-2 cursor-pointer"
                    onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4" />
                      <span>AI Tools</span>
                    </div>
                    {isToolsMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </div>
                  
                  {isToolsMenuOpen && (
                    <div className="pl-6 space-y-2 mt-1">
                      <Link
                        href="/tools/documents"
                        className="flex items-center gap-2 text-gray-600 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Documents</span>
                      </Link>
                      <Link
                        href="/tools/presentations"
                        className="flex items-center gap-2 text-gray-600 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Presentation className="h-4 w-4" />
                        <span>Presentations</span>
                      </Link>
                      <Link
                        href="/tools/spreadsheets"
                        className="flex items-center gap-2 text-gray-600 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Table className="h-4 w-4" />
                        <span>Spreadsheets</span>
                      </Link>
                      <Link
                        href="/tools/voiceovers"
                        className="flex items-center gap-2 text-gray-600 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Mic className="h-4 w-4" />
                        <span>Voiceovers</span>
                      </Link>                      <Link
                        href="/tools/images"
                        className="flex items-center gap-2 text-gray-600 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <ImageIcon className="h-4 w-4" />
                        <span>Images</span>
                      </Link>
                      <Link
                        href="/tools/chat"
                        className="flex items-center gap-2 text-gray-600 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat</span>
                      </Link>
                      <Link
                        href="/tools/ai-text-generator"
                        className="flex items-center gap-2 text-gray-600 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Terminal className="h-4 w-4" />
                        <span>AI Text Generator</span>
                      </Link>
                      <Link
                        href="/tools/ai-story-generator"
                        className="flex items-center gap-2 text-gray-600 py-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <BookText className="h-4 w-4" />
                        <span>AI Story Generator</span>
                      </Link>
                    </div>
                  )}
                </div>
                
                {user ? (
                  <>
                    <span className="text-gray-700 text-sm">Logged in as {user.email}</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}        </AnimatePresence>
      </nav>
      )}

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Directory Explorer</h3>
              <p className="text-gray-400 mb-4">
                Connecting people to great local businesses since 2020.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="text-gray-400 hover:text-white transition-colors">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-900"
                />
                <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Directory Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
