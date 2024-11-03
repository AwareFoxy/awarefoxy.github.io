import { useEffect, useState } from 'react';
import { Moon, Sun, Steam, Github, Copy, Video, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { toast } = useToast();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const copyDiscord = () => {
    navigator.clipboard.writeText('awarefoxy');
    toast({
      title: "Discord ID Copied!",
      description: "awarefoxy has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 rounded-full"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>

      <main className="container max-w-2xl mx-auto px-4 py-16">
        <Card className="p-8 space-y-8 backdrop-blur-sm bg-card/50">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">My Links</h1>
            <p className="text-muted-foreground">Connect with me across platforms</p>
          </div>

          <div className="grid gap-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-lg h-14"
              asChild
            >
              <a href="https://steamcommunity.com/id/awarefoxy/" target="_blank" rel="noopener noreferrer">
                <Steam className="h-5 w-5" />
                Steam
              </a>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-lg h-14"
              asChild
            >
              <a href="https://github.com/AwareFoxy" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                Github
              </a>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-lg h-14"
              asChild
            >
              <a href="/bureaucracy.html">
                <FileText className="h-5 w-5" />
                Bureaucracy for SS14
              </a>
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 text-lg h-14"
                    onClick={copyDiscord}
                  >
                    <Copy className="h-5 w-5" />
                    Discord
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to copy: awarefoxy</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-lg h-14"
              asChild
            >
              <a href="https://youtu.be/ZK1pNGmNBEc?si=ng0svwOy7v1yQmB-" target="_blank" rel="noopener noreferrer">
                <Video className="h-5 w-5" />
                OnlyFans??
              </a>
            </Button>
          </div>

          <div className="mt-8">
            <video 
              controls 
              className="w-full rounded-lg shadow-lg"
            >
              <source src="files/Singa.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default App;