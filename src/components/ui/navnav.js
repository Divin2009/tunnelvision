'use client'
import { Atom, Book, FlaskConical, Home, MenuIcon, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from 'react';
import { redirect } from 'next/navigation';

export default function NavNav() {
  const handleNavigation = useCallback((path) => {
    redirect(path);
  }, []);

  return (
    <nav className="bg-black/50 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div onClick={() => handleNavigation('/')} className="flex items-center space-x-2 cursor-pointer">
              <Atom className="h-6 w-6 text-purple-400" />
              <span className="text-white font-bold">TunnelVision</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button 
                variant="ghost" 
                className="text-purple-200 hover:text-white hover:bg-purple-900/50" 
                onClick={() => handleNavigation('/')}
              >
                <Home className="mr-2 h-4 w-4" /> Home
              </Button>
              <Button 
                variant="ghost" 
                className="text-purple-200 hover:text-white hover:bg-purple-900/50" 
                onClick={() => handleNavigation('/learn')}
              >
                <Book className="mr-2 h-4 w-4" /> Learn
              </Button>
              <Button 
                variant="ghost" 
                className="text-purple-200 hover:text-white hover:bg-purple-900/50" 
                onClick={() => handleNavigation('/experiments')}
              >
                <FlaskConical className="mr-2 h-4 w-4" /> Experiments
              </Button>
              <Button 
                variant="ghost" 
                className="text-purple-200 hover:text-white hover:bg-purple-900/50" 
                onClick={() => open("https://tunnelvisionml-jqfdwuw9q3snfg6se85gbu.streamlit.app/")}
              >
                <Crown className="mr-2 h-4 w-4" /> Streamlit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
