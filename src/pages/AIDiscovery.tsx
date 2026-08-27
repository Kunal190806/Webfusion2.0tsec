import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '../components/ui/button';

export const AIDiscovery = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const { resources } = useAppContext();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [parsedContext, setParsedContext] = useState<any>(null);

  useEffect(() => {
    // Simulate AI parsing delay
    const timer = setTimeout(() => {
      const purpose = query.toLowerCase().includes('event') ? 'College Event' : 'General Purpose';
      const needs = query.toLowerCase().includes('camera') ? 'Camera + Tripod + Microphone' : 'Resource';
      const time = query.toLowerCase().includes('tomorrow') ? 'Tomorrow Evening' : 'Flexible';
      const priority = 'Availability + Quality';

      setParsedContext({ purpose, needs, time, priority });
      setIsProcessing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  if (isProcessing) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h2 className="text-xl font-medium animate-pulse text-muted-foreground">Finding resources that fit your requirement...</h2>
      </div>
    );
  }

  // Simulated match algorithm
  const matches = resources
    .map(resource => {
      const isCamera = resource.name.toLowerCase().includes('camera') && query.toLowerCase().includes('camera');
      const isTripod = resource.name.toLowerCase().includes('tripod') && query.toLowerCase().includes('tripod');
      const isAudio = resource.name.toLowerCase().includes('microphone') || resource.category === 'Audio';
      
      let baseScore = 60;
      if (isCamera) baseScore += 30;
      if (isTripod) baseScore += 25;
      if (isAudio && query.toLowerCase().includes('mic')) baseScore += 25;
      baseScore += (resource.rating * 2);
      if (resource.condition === 'Excellent') baseScore += 5;
      
      return {
        ...resource,
        matchScore: Math.min(Math.round(baseScore), 96) // Capped at 96 for realism in demo
      };
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const bestMatch = matches[0];
  const alternatives = matches.slice(1);

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-12 -ml-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
      </Button>

      <div className="grid lg:grid-cols-[1fr_2.5fr] gap-16">
        {/* Context Sidebar */}
        <div>
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">Your Requirement</h2>
          <div className="space-y-6 border-l-2 border-border pl-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Purpose</div>
              <div className="font-medium">{parsedContext?.purpose}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Resources</div>
              <div className="font-medium">{parsedContext?.needs}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Time</div>
              <div className="font-medium">{parsedContext?.time}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Priority</div>
              <div className="font-medium">{parsedContext?.priority}</div>
            </div>
          </div>
        </div>

        {/* Best Match Hero */}
        <div>
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">Best Matches</h2>
          
          {bestMatch ? (
            <div className="space-y-8">
              {/* Score indicator */}
              <div>
                <span className="text-4xl font-bold tracking-tight">{bestMatch.matchScore}%</span>
                <span className="text-lg text-muted-foreground ml-2">Match</span>
              </div>

              {/* Product Layout */}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="aspect-[4/3] bg-muted border border-border">
                  <img src={bestMatch.images[0]} alt={bestMatch.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{bestMatch.name}</h3>
                    <p className="text-sm text-muted-foreground">{bestMatch.category} · {bestMatch.location}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-foreground" /> Available tomorrow
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-foreground" /> {bestMatch.distance} km away
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-foreground" /> {bestMatch.condition} condition
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-foreground" /> Owner trust 98
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <div className="text-xl font-bold">₹{bestMatch.borrowingCharge}/day</div>
                        <div className="text-xs text-muted-foreground">₹{bestMatch.securityDeposit} refundable deposit</div>
                      </div>
                      <Button onClick={() => navigate(`/resource/${bestMatch.id}`)}>
                        View Resource
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternatives */}
              {alternatives.length > 0 && (
                <div className="pt-12 mt-12 border-t border-border">
                  <h3 className="text-sm font-semibold mb-6">Not available? Here are the closest alternatives.</h3>
                  <div className="space-y-4">
                    {alternatives.map(alt => (
                      <div key={alt.id} className="flex items-center justify-between py-3 border-b border-border/50 group cursor-pointer" onClick={() => navigate(`/resource/${alt.id}`)}>
                        <div>
                          <div className="font-medium group-hover:text-primary transition-colors">{alt.matchScore}% Match · {alt.name}</div>
                          <div className="text-sm text-muted-foreground">{alt.category}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 border-t border-border">
              <h3 className="text-lg font-semibold mb-2">No perfect matches found</h3>
              <p className="text-muted-foreground mb-6">Try broadening your search terms.</p>
              <Button onClick={() => navigate('/discover')}>Browse All</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDiscovery;
