import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Search, ArrowLeft, Code, Rocket, Bug, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAnalyticsTracking } from "@/hooks/useAnalytics";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const analytics = useAnalyticsTracking();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Track 404 error
  useEffect(() => {
    analytics.trackError('404', 'Page not found', location.pathname);
  }, [analytics, location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      analytics.trackSearch(searchQuery, 0, 'site');
      
      // Simulate search and redirect
      setTimeout(() => {
        navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearching(false);
      }, 1000);
    }
  };

  const suggestedPages = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Projects", icon: Code, path: "/projects" },
    { name: "About", icon: Rocket, path: "/about" },
    { name: "Contact", icon: Zap, path: "/contact" },
  ];

  const errorCodePatterns = [
    { char: "4", delay: 0 },
    { char: "0", delay: 200 },
    { char: "4", delay: 400 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Animated 404 Code */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-8">
            {errorCodePatterns.map((pattern, index) => (
              <div
                key={index}
                className="relative animate-float"
                style={{ animationDelay: `${pattern.delay}ms` }}
              >
                <span className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse-glow">
                  {pattern.char}
                </span>
                {index < errorCodePatterns.length - 1 && (
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50 animate-pulse" />
                )}
              </div>
            ))}
          </div>
          
          {/* Glitch Effect */}
          <div className="relative mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground animate-slide-up">
              Oops! Page Not Found
            </h1>
            <div className="absolute inset-0 text-2xl md:text-3xl font-semibold text-primary/20 animate-pulse">
              Oops! Page Not Found
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Error Message */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
            <div className="glass rounded-xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Bug className="h-6 w-6 text-primary animate-pulse" />
                <h2 className="text-xl font-semibold text-foreground">
                  Something's not right here
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The page <code className="bg-muted px-2 py-1 rounded text-primary font-mono text-sm">
                  {location.pathname}
                </code> doesn't exist or has been moved. 
                But don't worry, even the best code has bugs sometimes!
              </p>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                
                <Button
                  onClick={() => navigate("/")}
                  className="w-full bg-gradient-primary hover-glow"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Return to Home
                </Button>
              </div>
            </div>

            {/* Search Box */}
            <div className="glass rounded-xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search for content
              </h3>
              
              <form onSubmit={handleSearch} className="space-y-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, skills, or content..."
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <Button
                  type="submit"
                  disabled={!searchQuery.trim() || isSearching}
                  className="w-full"
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Suggestions */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '800ms' }}>
            <div className="glass rounded-xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Where were you trying to go?
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {suggestedPages.map((page, index) => (
                  <Button
                    key={page.name}
                    onClick={() => {
                      analytics.trackNavigation(page.name, '404-suggestion');
                      navigate(page.path);
                    }}
                    variant="outline"
                    className="flex items-center gap-2 h-auto p-3 hover-lift"
                    style={{ animationDelay: `${1000 + index * 100}ms` }}
                  >
                    <page.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{page.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Popular Projects */}
            <div className="glass rounded-xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Popular Projects
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
                     onClick={() => {
                       analytics.trackProjectInteraction('AI Portfolio', 'click', 'https://nkwenti-severian-ndongtsop.vercel.app');
                       navigate('/');
                     }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Code className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">AI Portfolio</p>
                      <p className="text-xs text-muted-foreground">This website</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Featured</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
                     onClick={() => {
                       analytics.trackProjectInteraction('LinkSphere', 'click', 'https://linksphere-98u3.onrender.com');
                       window.open('https://linksphere-98u3.onrender.com', '_blank');
                     }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Rocket className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">LinkSphere</p>
                      <p className="text-xs text-muted-foreground">Link management platform</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">Live</Badge>
                </div>
              </div>
            </div>

            {/* Fun Message */}
            <div className="text-center p-6 border border-border/50 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="animate-bounce mb-3">
                <Zap className="h-8 w-8 text-primary mx-auto" />
              </div>
              <p className="text-sm text-muted-foreground italic">
                "404: The page you're looking for is in another castle... 
                or maybe it's just refactoring!"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center animate-slide-up" style={{ animationDelay: '1200ms' }}>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/projects")}
              className="text-muted-foreground hover:text-foreground"
            >
              View Projects
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/about")}
              className="text-muted-foreground hover:text-foreground"
            >
              About Me
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/contact")}
              className="text-muted-foreground hover:text-foreground"
            >
              Get in Touch
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Error Code: 404 | Timestamp: {new Date().toISOString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
