import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import confetti from 'canvas-confetti';

/* ─── Icons ─────────────────────────────────────────────────────────── */
function IcoHeart({ filled }: { filled?: boolean }) {
  return (
    <svg className="w-[18px] h-[18px]" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function IcoCart() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function IcoPlus({ sm }: { sm?: boolean }) {
  return (
    <svg className={sm ? "w-3 h-3" : "w-3.5 h-3.5"} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}
function IcoMinus({ sm }: { sm?: boolean }) {
  return (
    <svg className={sm ? "w-3 h-3" : "w-3.5 h-3.5"} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}
function IcoChevronLeft() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IcoArrow() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-[#CF3A26]" : "text-[#D8CCBF]"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Gallery ────────────────────────────────────────────────────────── */
function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const thumbs = images.length > 0 ? images : ['/Store-items/camera/camera-1.jpg'];

  return (
    <div className="flex gap-3 h-full">
      <div className="flex flex-col gap-2 items-center">
        {thumbs.map((src, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${active === i ? "border-[#00B5C4]" : "border-[#ECE4D6] hover:border-[#00B5C4]/50"}`}>
            <img src={src} alt="thumb" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <div className="flex-1 rounded-2xl overflow-hidden bg-[#EDE5D5] min-h-72 h-full">
        <img src={thumbs[active]} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

/* ─── Tabs ───────────────────────────────────────────────────────────── */
function ProductTabs({ resource, ownerName, reviews }: {
  resource: any;
  ownerName: string;
  reviews: { user: string; rating: number; quote: string; date: string }[];
}) {
  const [activeTab, setActiveTab] = useState("Description");
  const tabs = ["Description", "Included Accessories", "Terms & Policies", "Reviews"];

  return (
    <div className="mt-6 bg-white rounded-2xl border border-[#ECE4D6] p-7 shadow-sm">
      <div className="flex gap-6 border-b border-[#ECE4D6] pb-3 mb-5 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`text-sm font-semibold pb-3 -mb-[13px] border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? "border-[#00B5C4] text-[#00B5C4]" : "border-transparent text-[#7A6A5A] hover:text-[#00B5C4]"}`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="text-sm text-[#4A3A2E] leading-relaxed">
        {activeTab === "Description" && (
          <p>{resource.description}. Listed by {ownerName}. Condition: {resource.condition}. Located at {resource.location}.</p>
        )}
        {activeTab === "Included Accessories" && (
          <ul className="space-y-2">
            {resource.includedAccessories.length > 0
              ? resource.includedAccessories.map((acc: string, i: number) => (
                  <li key={i} className="flex justify-between items-center max-w-[300px]">
                    <span>{acc}</span>
                    <span className="font-medium text-[#00B5C4]">Included</span>
                  </li>
                ))
              : <li className="text-[#7A6A5A]">No additional accessories included.</li>
            }
          </ul>
        )}
        {activeTab === "Terms & Policies" && (
          <ul className="space-y-2">
            <li><strong>Borrowing Rules:</strong> {resource.borrowingRules}</li>
            <li><strong>Return Deadline:</strong> By 8:00 PM on the final day</li>
            <li><strong>Late Fee:</strong> ₹50 per additional day</li>
            <li><strong>Damage Policy:</strong> Deposit withheld based on repair cost assessed by owner</li>
          </ul>
        )}
        {activeTab === "Reviews" && (
          <div className="space-y-4">
            {reviews.length === 0
              ? <p className="text-[#7A6A5A]">No reviews yet. Be the first to borrow and rate!</p>
              : reviews.map((rev, i) => (
                <div key={i} className="border-b border-[#ECE4D6] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#00B5C4] text-white flex items-center justify-center font-bold text-sm">{rev.user[0]}</div>
                    <div>
                      <p className="font-semibold text-[#2A1A14]">{rev.user}</p>
                      <p className="text-[10px] text-[#7A6A5A]">{rev.date}</p>
                    </div>
                    <div className="ml-auto"><Stars rating={rev.rating} /></div>
                  </div>
                  <p className="text-xs text-[#4A3A2E] italic">"{rev.quote}"</p>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Related card ───────────────────────────────────────────────────── */
function RelatedCard({ resource, onClick }: { resource: any; onClick: () => void }) {
  const [liked, setLiked] = useState(false);
  const cardColors = ['bg-[#CF3A26]', 'bg-[#F0AEAD]', 'bg-[#A8D4E2]', 'bg-[#FFD166]', 'bg-[#2EE887]'];
  const color = cardColors[resource.id.length % cardColors.length];
  const img = resource.images[0] || '/Store-items/camera/camera-1.jpg';

  return (
    <div className="min-w-[192px] w-48 rounded-2xl overflow-hidden flex-shrink-0 bg-white border border-[#ECE4D6] shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className={`relative ${color} h-44`}>
        <span className="absolute top-2.5 left-2.5 bg-[#00B5C4] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
          {resource.isAvailable ? 'Available' : 'Taken'}
        </span>
        <button onClick={e => { e.stopPropagation(); setLiked(!liked); }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-white flex items-center justify-center transition-colors ${liked ? "text-[#F28C28]" : "text-[#8A7A6A] hover:text-[#F28C28]"}`}>
          <IcoHeart filled={liked} />
        </button>
        <img src={img} alt={resource.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className="font-semibold text-[#2A1A14] text-sm truncate block">{resource.name}</span>
          <span className="text-[#00B5C4] text-sm font-medium">₹{resource.borrowingCharge}/day</span>
          <p className="text-[10px] text-[#7A6A5A] mt-0.5 leading-snug line-clamp-2">{resource.description.slice(0, 60)}...</p>
        </div>
        <button onClick={e => { e.stopPropagation(); onClick(); }}
          className="w-7 h-7 rounded-full bg-[#00B5C4] text-white flex-shrink-0 flex items-center justify-center hover:bg-[#009BA8] transition-colors">
          <IcoCart />
        </button>
      </div>
    </div>
  );
}

/* ─── Request Modal ──────────────────────────────────────────────────── */
function RequestModal({ resource, owner, duration, onConfirm, onClose }: {
  resource: any; owner: any; duration: number; onConfirm: (msg: string) => void; onClose: () => void;
}) {
  const [msg, setMsg] = useState('Hi, I need this for a college project!');
  const total = resource.borrowingCharge * duration;
  const fee = 15;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="font-bold text-xl text-[#2A1A14] mb-4">Request to Borrow</h2>
        <div className="bg-[#FFF9ED] rounded-xl p-4 mb-4 text-sm space-y-2 border border-[#ECE4D6]">
          <div className="flex justify-between"><span className="text-[#7A6A5A]">Item</span><span className="font-semibold text-[#2A1A14]">{resource.name}</span></div>
          <div className="flex justify-between"><span className="text-[#7A6A5A]">Duration</span><span className="font-semibold">{duration} day{duration > 1 ? 's' : ''}</span></div>
          <div className="flex justify-between"><span className="text-[#7A6A5A]">Rental cost</span><span className="font-semibold">₹{total}</span></div>
          <div className="flex justify-between"><span className="text-[#7A6A5A]">Platform fee</span><span className="font-semibold">₹{fee}</span></div>
          <div className="flex justify-between"><span className="text-[#7A6A5A]">Security deposit</span><span className="font-semibold">₹{resource.securityDeposit}</span></div>
          <div className="flex justify-between pt-2 border-t border-[#ECE4D6]"><span className="font-bold text-[#2A1A14]">Total upfront</span><span className="font-bold text-[#00B5C4]">₹{total + fee + resource.securityDeposit}</span></div>
        </div>
        <div className="mb-4">
          <label className="text-xs font-semibold text-[#7A6A5A] block mb-1">Message to {owner?.name}</label>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3}
            className="w-full border border-[#ECE4D6] rounded-xl p-3 text-sm text-[#2A1A14] outline-none focus:border-[#00B5C4] resize-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[#ECE4D6] rounded-full text-sm text-[#7A6A5A] hover:border-[#00B5C4] transition-colors">Cancel</button>
          <button onClick={() => onConfirm(msg)} className="flex-1 py-2.5 bg-[#00B5C4] text-white rounded-full text-sm font-medium hover:bg-[#009BA8] transition-colors">
            Send Request 🎉
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
export const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, users, currentUser, addRequest } = useAppContext();

  const resource = resources.find(r => r.id === id);
  const owner = users.find(u => u.id === resource?.ownerId);
  const related = resources.filter(r => r.id !== id && r.category === resource?.category).slice(0, 5);

  const [duration, setDuration] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  // Static reviews (real reviews would come from a ratings collection)
  const reviews = (resource?.rating ?? 0) >= 4.5
    ? [
        { user: 'Ryan A.', rating: 5, quote: 'Great quality, exactly as described. The owner was super responsive and the handover was smooth.', date: '2 days ago' },
        { user: 'Priya S.', rating: 5, quote: 'Saved me so much money for my project. Highly recommend borrowing from here!', date: '1 week ago' },
      ]
    : [];

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#FFF9ED] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-[#2A1A14] mb-2">Resource not found</h2>
          <button onClick={() => navigate('/discover')} className="mt-4 px-6 py-2 bg-[#00B5C4] text-white rounded-full text-sm hover:bg-[#009BA8] transition-colors">
            Browse Discover
          </button>
        </div>
      </div>
    );
  }

  const handleConfirmRequest = (msg: string) => {
    if (!currentUser) { navigate('/login'); return; }
    addRequest({
      resourceId: resource.id,
      borrowerId: currentUser.id,
      ownerId: owner?.id || resource.ownerId,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * duration).toISOString(),
      borrowingCharge: resource.borrowingCharge * duration,
      platformFee: 15,
      securityDeposit: resource.securityDeposit,
      lateFee: 0,
      damageDeduction: 0,
      totalRefund: resource.securityDeposit,
      message: msg,
    });
    setShowModal(false);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00B5C4', '#F28C28', '#ffffff'] });
    setTimeout(() => navigate('/dashboard?tab=borrowings'), 1500);
  };

  return (
    <div className="min-h-full bg-[#FFF9ED] font-sans">

      {showModal && (
        <RequestModal
          resource={resource}
          owner={owner}
          duration={duration}
          onConfirm={handleConfirmRequest}
          onClose={() => setShowModal(false)}
        />
      )}

      <main className="pb-4">
        {/* ── PRODUCT SECTION ── */}
        <section className="max-w-5xl mx-auto px-6 pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-sm text-[#7A6A5A] mb-5 pt-5 cursor-pointer hover:text-[#00B5C4] transition-colors w-fit" onClick={() => navigate('/discover')}>
            <IcoChevronLeft />
            <span>{resource.category}</span>
          </div>

          {/* Main product card */}
          <div className="bg-white rounded-2xl border border-[#ECE4D6] p-7 grid grid-cols-1 md:grid-cols-2 gap-10 shadow-sm">
            <ProductGallery images={resource.images} name={resource.name} />

            {/* Info panel */}
            <div className="flex flex-col gap-3.5">
              {/* Rating + Owner */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Stars rating={Math.round(resource.rating)} />
                  <span className="text-xs text-[#7A6A5A]">{resource.rating.toFixed(1)} · {reviews.length} reviews</span>
                </div>
                <div className="flex items-center gap-1 text-[#F28C28] text-xs font-semibold bg-[#FFF9ED] px-2 py-1 rounded-full border border-[#F28C28]/20">
                  <div className="w-4 h-4 rounded-full bg-[#F28C28] text-white text-[9px] flex items-center justify-center font-bold">
                    {owner?.name?.[0] || 'U'}
                  </div>
                  {owner?.name || 'Unknown'} ({owner?.rating || 4.5}★)
                </div>
              </div>

              {/* Title + Price */}
              <div className="flex flex-col gap-1 mt-1">
                <h1 className="font-serif italic text-[#00B5C4] text-[1.9rem] font-bold leading-tight">
                  {resource.name}
                </h1>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif italic text-[#004761] text-[2rem] font-bold leading-none">₹{resource.borrowingCharge}</span>
                  <span className="text-[#8A7A6A] text-sm">/ day</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#4A3A2E] text-xs leading-relaxed line-clamp-2 mt-1">{resource.description}</p>

              {/* Duration selector */}
              <div className="mt-2">
                <h3 className="font-serif text-[#00B5C4] font-semibold text-sm mb-2">Rental Duration</h3>
                <div className="flex gap-2 flex-wrap">
                  {[1, 3, 7].map(days => (
                    <button key={days} onClick={() => setDuration(days)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${duration === days ? 'bg-[#00B5C4] text-white border-[#00B5C4]' : 'bg-white text-[#4A3A2E] border-[#ECE4D6] hover:border-[#00B5C4]'}`}>
                      {days} Day{days > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="mt-1">
                <h3 className="font-serif text-[#00B5C4] font-semibold text-sm mb-1.5">Details</h3>
                <ul className="text-xs text-[#4A3A2E] space-y-1">
                  {[
                    ["Condition", resource.condition],
                    ["Location", resource.location],
                    ["Distance", `${resource.distance} km`],
                    ["Availability", resource.isAvailable ? 'Available Now' : `Available from ${new Date(resource.availabilityDate).toLocaleDateString('en-IN')}`],
                    ["Security Deposit", `₹${resource.securityDeposit}`],
                    ["Platform Fee", "₹15"],
                    ["Total for " + duration + " day" + (duration > 1 ? 's' : ''), `₹${resource.borrowingCharge * duration + 15}`],
                  ].map(([k, v]) => (
                    <li key={k}><span className="font-medium">{k}:</span> {v}</li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="flex items-center gap-2.5 mt-auto pt-1">
                <button
                  onClick={() => resource.isAvailable ? setShowModal(true) : undefined}
                  disabled={!resource.isAvailable}
                  className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${resource.isAvailable ? 'bg-[#00B5C4] text-white hover:bg-[#009BA8]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                  {resource.isAvailable ? 'Request to Borrow' : 'Currently Unavailable'}
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${wishlisted ? "border-[#F28C28] text-[#F28C28] bg-[#FFF0EE]" : "border-[#D4C4B0] text-[#7A6A5A] hover:border-[#F28C28] hover:text-[#F28C28]"}`}>
                  <IcoHeart filled={wishlisted} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <ProductTabs resource={resource} ownerName={owner?.name || 'Unknown'} reviews={reviews} />
        </section>

        {/* ── TRUST BANNER ── */}
        <section className="max-w-5xl mx-auto px-6 mb-12">
          <div className="bg-[#F28C28] rounded-2xl flex items-center gap-6 px-8 py-7 overflow-hidden">
            <div className="flex-1 flex flex-col gap-3">
              <h2 className="font-serif italic text-white text-[1.9rem] font-bold leading-tight">Student Verified</h2>
              <p className="text-white/90 text-sm leading-relaxed max-w-[300px]">
                Rent with confidence! Campus Circular verifies every student and holds security deposits to ensure your gear is safe and returns are smooth.
              </p>
              <button onClick={() => navigate('/impact')} className="self-start mt-1 px-5 py-2 bg-white text-[#F28C28] text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                Learn More
              </button>
            </div>
            <div className="w-52 h-44 rounded-xl overflow-hidden flex-shrink-0 bg-white/20 p-4 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-5xl mb-2">🤝</div>
                <div className="font-bold">Safe Campus Exchanges</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── YOU MIGHT LIKE ── */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 mb-12">
            <h2 className="font-serif italic text-[#00B5C4] text-[1.9rem] font-bold mb-5">You might like</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {related.map(r => (
                <RelatedCard key={r.id} resource={r} onClick={() => navigate(`/resource/${r.id}`)} />
              ))}
            </div>
            <div className="flex justify-end mt-5">
              <button onClick={() => navigate('/discover')} className="px-8 py-2 border border-[#00B5C4] text-[#00B5C4] rounded-full text-sm font-medium hover:bg-[#00B5C4] hover:text-white transition-colors">
                Browse all →
              </button>
            </div>
          </section>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#004761] text-white">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[auto_repeat(3,1fr)_1.6fr] gap-8 items-start">
            <div className="pr-4">
              <h2 className="font-serif italic text-4xl font-bold leading-none text-[#00B5C4]">
                Campus<br /><span className="text-[#F28C28]">Circular</span>
              </h2>
            </div>
            {[
              { title: 'Menu', links: ['Shop', 'Rent Out', 'Impact', 'Contact'] },
              { title: 'Help', links: ['How it works', 'Trust & Safety', 'FAQ'] },
              { title: 'Social', links: ['Instagram', 'Twitter', 'Facebook'] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-xs font-semibold text-white mb-3 tracking-wide">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-xs text-white/65 hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-xs font-semibold text-white mb-1 tracking-wide">Join the Circular Economy.</p>
              <p className="text-[11px] text-white/60 leading-relaxed mb-3">Subscribe to get updates on new gear available on campus.</p>
              <div className="flex items-center border-b border-white/35 pb-1">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                  className="bg-transparent text-xs flex-1 outline-none placeholder-white/40 text-white" />
                <button className="text-white/60 hover:text-white transition-colors ml-2"><IcoArrow /></button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/15 flex justify-between items-center">
            <span className="text-[11px] text-white/45">All rights reserved Campus Circular © 2025</span>
            <a href="#" className="text-[11px] text-white/45 hover:text-white/70 transition-colors">Privacy policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourceDetails;
