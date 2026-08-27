import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { generateRecommendations, AIRecommendation } from '../services/ai';
import type { Resource } from '../types';

export const AIDiscovery = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const { resources } = useAppContext();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [parsedContext, setParsedContext] = useState<AIRecommendation | null>(null);
  const [matchedItems, setMatchedItems] = useState<(Resource & { matchScore?: number })[]>([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsProcessing(true);
      setApiError(false);

      if (!query.trim()) {
        setIsProcessing(false);
        return;
      }

      const recommendation = await generateRecommendations(query, resources);
      
      if (recommendation) {
        setParsedContext(recommendation);
        
        // Map the IDs back to the actual resource objects
        const matches = recommendation.matchedResourceIds
          .map(id => resources.find(r => r.id === id))
          .filter((r): r is Resource => r !== undefined)
          .map(r => ({ ...r, matchScore: 98 })); // Give them a high score since AI picked them
          
        setMatchedItems(matches);
      } else {
        setApiError(true);
      }
      
      setIsProcessing(false);
    };

    fetchRecommendations();
  }, [query, resources]);

  if (isProcessing) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-4xl text-center">
        <div className="w-16 h-16 border-4 border-[#0F8A54] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-xl font-medium animate-pulse text-muted-foreground">Consulting with AI Coordinator...</h2>
        <p className="text-sm text-gray-500 mt-2">Analyzing your needs and scanning inventory.</p>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-4xl text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-medium text-black mb-2">Oops! The AI Coordinator is offline.</h2>
        <p className="text-gray-500 mb-6">Make sure you have added your Gemini API key to the .env.local file.</p>
        <Button onClick={() => navigate('/')}>Go Back Home</Button>
      </div>
    );
  }

  const bestMatch = matchedItems[0];
  const alternatives = matchedItems.slice(1);

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
