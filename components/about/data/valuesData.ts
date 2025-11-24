// data/valuesData.ts
export interface ValuePoint {
  id: number;
  title: string;
  description: string;
  icon: string;
  // We'll use the ID or title to determine the custom icon shape later
}

export const coreValues: ValuePoint[] = [
  {
    id: 1,
    title: "Customer Centric",
    description: "What's best for the customer is best for the business.",
    icon: "/icons/customer_centric-1.svg",
  },
  {
    id: 2,
    title: "Teamwork",
    description: "Teamwork gets us farther, faster.",
    icon:"/icons/teamwork-1.svg"
  },
  {
    id: 3,
    title: "Positive & Passionate",
    description: "Be positive in your thoughts & passionate in your work.",
    icon:"/icons/positive_passionate.svg"
  },
  {
    id: 4,
    title: "Customer Centric",
    description: "What's best for the customer is best for the business.",
    icon: "/icons/customer_centric-1.svg"
  },
  {
    id: 5,
    title: "Teamwork",
    description: "Teamwork gets us farther, faster.",
    icon:"/icons/teamwork-2.svg"
  },
  {
    id: 6,
    title: "Positive & Passionate",
    description: "Be positive in your thoughts & passionate in your work.",
    icon:"/icons/positive_passionate.svg"
  },
];
