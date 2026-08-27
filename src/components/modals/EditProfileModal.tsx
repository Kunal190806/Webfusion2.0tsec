import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAppContext } from '../../store/AppContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, userId }) => {
  const { users, updateUser } = useAppContext();
  const user = users.find(u => u.id === userId);
  
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(userId, { name, avatar });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Avatar Image</label>
            <div className="flex items-center gap-4">
              {avatar && (
                <img src={avatar} alt="Avatar preview" className="w-12 h-12 rounded-full object-cover border border-border shrink-0" />
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-[#16352F] text-white">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
