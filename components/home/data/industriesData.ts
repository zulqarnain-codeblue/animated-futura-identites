// src/data/industriesData.ts (or wherever you prefer to store data)
import { IconType } from 'react-icons';
import {
  IoMedicalOutline,
  IoHardwareChipOutline,
  IoEaselOutline,
  IoBusinessOutline,
  IoFingerPrintOutline,
  IoSchoolOutline,
  IoRestaurantOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

export interface Industry {
  name: string;
  Icon: IconType;
}

export const industries: Industry[] = [
  { name: 'Healthcare', Icon: IoMedicalOutline },
  { name: 'Manufacturing Facilities', Icon: IoHardwareChipOutline },
  { name: 'Custom Iconic Signage', Icon: IoEaselOutline },
  { name: 'Real Estate Developers', Icon: IoBusinessOutline },
  { name: 'Corporate Identity', Icon: IoFingerPrintOutline },
  { name: 'Education', Icon: IoSchoolOutline },
  { name: 'Restaurants', Icon: IoRestaurantOutline },
  { name: 'Franchising', Icon: IoShareSocialOutline },
];