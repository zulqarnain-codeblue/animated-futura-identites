// components/CustomIcons.tsx
import React from 'react';

// Large Right-Pointing Triangle (Used for IDs 1, 3, 4, 6)
export const TriangleIcon: React.FC = () => (
  <svg className="w-8 h-8 md:w-10 md:h-10 text-theme-600 fill-current" viewBox="0 0 100 100">
    <polygon points="0,0 100,50 0,100" />
  </svg>
);

// Circle (Used for IDs 2)
export const CircleIcon: React.FC = () => (
  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-theme-600 flex items-center justify-center">
    {/* Optional: Add a subtle inner circle or white icon if needed */}
  </div>
);

// X/Star Shape (Used for IDs 5)
export const XShapeIcon: React.FC = () => (
  <svg className="w-8 h-8 md:w-10 md:h-10 text-theme-600 fill-current transform rotate-45" viewBox="0 0 100 100">
    <rect x="0" y="40" width="100" height="20" />
    <rect x="40" y="0" width="20" height="100" />
  </svg>
);

// Function to select the appropriate icon based on the index/ID
export const getIcon = (id: number): React.FC => {
  switch (id % 3) {
    case 1: // Customer Centric
      return TriangleIcon;
    case 2: // Teamwork (Top Row)
      if (id === 2) return CircleIcon;
      // Teamwork (Bottom Row)
      return XShapeIcon;
    case 0: // Positive & Passionate
      return TriangleIcon;
    default:
      return TriangleIcon;
  }
};