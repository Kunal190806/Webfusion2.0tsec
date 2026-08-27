import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Stepper, { Step } from '../components/ui/Stepper';
import { Marquee } from '../components/ui/marquee';
import confetti from 'canvas-confetti';

export const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, users, currentUser, addRequest } = useAppContext();
  
  const resource = resources.find(r => r.id === id);
  const owner = users.find(u => u.id === resource?.ownerId);
  
  const [step, setStep] = useState(0); // 0: details, 1: request, 2: confirm

  const reviews = [
    { text: "Great quality, highly recommend!", author: "Alice M." },
    { text: "Saved me a ton of money for my project.", author: "Bob S." },
    { text: "The owner was very helpful and responsive.", author: "Charlie K." },
    { text: "Perfect condition, exactly as described.", author: "Diana R." },
    { text: "Seamless borrowing experience. 10/10.", author: "Eve T." },
  ];

  if (!resource || !owner) {
    return <div className="p-8 text-center">Resource not found</div>;
  }

  const handleRequest = () => {
    if (!currentUser) return;
    
    addRequest({
      resourceId: resource.id,
      borrowerId: currentUser.id,
      ownerId: owner.id,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 2).toISOString(), // +2 days
      borrowingCharge: resource.borrowingCharge * 2, // 2 days
      platformFee: 15,
      securityDeposit: resource.securityDeposit,
      lateFee: 0,
      damageDeduction: 0,
      totalRefund: resource.securityDeposit,
      message: 'Hi, I need this for a college event.'
    });
    
    // Fire confetti from the center of the screen
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#16352F', '#5227FF', '#ffffff', '#e5e5e5']
    });

    // Wait 1.5s then navigate
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {step === 0 ? (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
          {/* Main Content */}
          <div className="space-y-12">
            <div className="aspect-[4/3] bg-muted border border-border">
              <img src={resource.images[0]} alt={resource.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="space-y-8">
              <div className="border-b border-border pb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">{resource.name}</h1>
                <p className="text-muted-foreground">{resource.category} · {resource.location}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">Description</h3>
                <p className="text-foreground leading-relaxed">{resource.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">Included</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    {resource.includedAccessories.map((acc, i) => (
                      <li key={i}>• {acc}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">Condition</h3>
                  <p className="text-sm text-foreground">{resource.condition}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">Borrowing Rules</h3>
                <p className="text-sm text-foreground">{resource.borrowingRules}</p>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">Recent Reviews</h3>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                  <Marquee pauseOnHover className="[--duration:20s]">
                    {reviews.map((review, i) => (
                      <div key={i} className="flex flex-col justify-between w-64 p-4 border border-border/50 rounded-xl bg-card shadow-sm h-32">
                        <p className="text-sm text-foreground italic line-clamp-3">"{review.text}"</p>
                        <p className="text-xs font-bold tracking-widest text-muted-foreground mt-4 uppercase">— {review.author}</p>
                      </div>
                    ))}
                  </Marquee>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Owner */}
          <div className="space-y-12">
            {/* Pricing block */}
            <div>
              <div className="border-b border-border pb-6 mb-6">
                <div className="text-3xl font-bold tracking-tight">₹{resource.borrowingCharge}<span className="text-base font-normal text-muted-foreground">/day</span></div>
                <div className="text-sm text-muted-foreground mt-1">₹{resource.securityDeposit} refundable deposit</div>
              </div>

              <div className="space-y-3 text-sm text-foreground mb-8">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span>{new Date(resource.availabilityDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance</span>
                  <span>{resource.distance} km</span>
                </div>
              </div>

              <Button size="lg" className="w-full h-12 bg-[#16352F] text-white hover:bg-[#0D2621]" onClick={() => setStep(1)}>
                Request to Borrow
              </Button>
            </div>

            {/* Owner Trust Block */}
            <div className="pt-8 border-t border-border">
              <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">Owner Profile</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="font-bold text-lg">{owner.name}</div>
                  <div className="text-sm text-muted-foreground">Verified student</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase">Trust Score</div>
                  <div className="text-3xl font-bold tracking-tight">{owner.trustScore}</div>
                </div>

                <ul className="text-sm space-y-2 text-foreground">
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Successful exchanges</span>
                    <span>{owner.successfulExchanges}</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">On-time returns</span>
                    <span>{owner.onTimeReturns}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Average rating</span>
                    <span>{owner.rating}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto mt-8">
          <Stepper
            initialStep={1}
            onFinalStepCompleted={handleRequest}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2 className="text-2xl font-serif mb-6 text-[#16352F]">Review Request Details</h2>
              <div className="border border-border rounded-xl p-6 bg-card shadow-sm space-y-4">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  <img src={resource.images[0]} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <div className="font-bold">{resource.name}</div>
                    <div className="text-sm text-muted-foreground">Owner: {owner.name}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground font-bold tracking-widest uppercase">Start Date</div>
                    <div>Today</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-bold tracking-widest uppercase">End Date</div>
                    <div>Day after tomorrow</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-bold tracking-widest uppercase">Duration</div>
                    <div>2 Days</div>
                  </div>
                </div>
              </div>
            </Step>
            
            <Step>
              <h2 className="text-2xl font-serif mb-6 text-[#16352F]">Payment Summary</h2>
              <div className="border border-border rounded-xl p-6 bg-card shadow-sm space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Borrowing (2 days)</span>
                  <span className="font-medium">₹{resource.borrowingCharge * 2}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform fee</span>
                  <span className="font-medium">₹15</span>
                </div>
                <div className="flex justify-between text-sm border-b border-border pb-4">
                  <span className="text-muted-foreground">Security Deposit (Refundable)</span>
                  <span className="font-medium">₹{resource.securityDeposit}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 text-[#16352F]">
                  <span>Total Payment</span>
                  <span>₹{(resource.borrowingCharge * 2) + 15 + resource.securityDeposit}</span>
                </div>
              </div>
            </Step>
            
            <Step>
              <h2 className="text-2xl font-serif mb-6 text-[#16352F]">Borrowing Agreement</h2>
              <div className="border border-border rounded-xl p-6 bg-card shadow-sm">
                <h3 className="font-bold mb-4">Terms & Conditions</h3>
                <ul className="text-sm text-muted-foreground space-y-3 list-disc pl-4">
                  <li>I agree to return the resource by the designated deadline.</li>
                  <li>I understand my security deposit is held until the owner confirms safe return.</li>
                  <li>I accept responsibility for damages incurred during my borrowing period.</li>
                  <li>I understand late returns incur a daily penalty equal to the borrowing charge.</li>
                </ul>
              </div>
            </Step>
          </Stepper>
        </div>
      )}
    </div>
  );
};

export default ResourceDetails;
