// data/products.ts
import { ProductContent } from "@/types/product";

export const productList: ProductContent[] = [
  // --------------------------------------------------------------------
  // 1. QRS SOLUTION — REAL SUB-PRODUCTS
  // --------------------------------------------------------------------
  {
    id: 1,
    title: "Branding & Signage Solutions",
    subtitle: "QRS Solution",
    slug: "qrs-solution",
    description:
      "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam.",
    mainImageUrl: "/images/Rounded Rectangle 1.webp",
    smallImageUrl: "/images/Rectangle 5.webp",
    layout: "left",
    tag: "QRS Solution",

    products: [
      {
        id: 1,
        title: "Building Signs",
        image: "/images/a907732626320d9ac42d7d07ed89216ce3aea48b.webp",
      },
      {
        id: 2,
        title: "Drive Thru",
        image: "/images/f362803c1aac0d9dda74e21996d1bf2773390902.webp",
      },
      {
        id: 3,
        title: "Free Standing",
        image: "/images/cc94f3892c3fb80aa4a2d2375eb2d5de98edd1d8.webp",
      },
      {
        id: 4,
        title: "Architectural Lightning",
        image: "/images/306cacef62ea9b44e7011709ac3d7a206e401837.webp",
      },
      {
        id: 5,
        title: "Architectural Canopies",
        image: "/images/09cd608ba9a501034bc8720f976458d9f7a135bd.webp",
      },
      {
        id: 6,
        title: "Monument Signs",
        image: "https://placehold.co/600x600/orange/fff?text=Monument+Signs",
      },
      {
        id: 7,
        title: "Channel Letters",
        image: "https://placehold.co/600x600/111/FD8000?text=Channel+Letters",
      },
    ],
  },

  // --------------------------------------------------------------------
  // 2. EXTERIOR SIGNAGE — DUMMY SUB-PRODUCTS
  // --------------------------------------------------------------------
  {
    id: 2,
    title: "Design & Engineering",
    subtitle: "Exterior Signage",
    slug: "exterior-signage",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    mainImageUrl: "/images/Rectangle 8.webp",
    smallImageUrl: "/images/Rectangle 9.webp",
    layout: "right",
    tag: "Exterior Signage",

    products: [
      {
        id: 1,
        title: "Outdoor Lightbox",
        image: "https://placehold.co/600x600/222/fff?text=Outdoor+Lightbox",
      },
      {
        id: 2,
        title: "Pylon Signs",
        image: "https://placehold.co/600x600/444/fff?text=Pylon+Signs",
      },
      {
        id: 3,
        title: "LED Wall Signs",
        image: "https://placehold.co/600x600/FD8000/fff?text=LED+Wall+Signs",
      },
    ],
  },

  // --------------------------------------------------------------------
  // 3. INTERIOR SIGNAGE — DUMMY SUB-PRODUCTS
  // --------------------------------------------------------------------
  {
    id: 3,
    title: "Design & Engineering",
    subtitle: "Interior Signage",
    slug: "interior-signage",
    description:
      "Totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    mainImageUrl: "/images/Rectangle 77.webp",
    smallImageUrl: "/images/Rectangle 20.webp",
    layout: "left",
    tag: "Interior Signage",

    products: [
      {
        id: 1,
        title: "Lobby Signs",
        image: "https://placehold.co/600x600/333/fff?text=Lobby+Signs",
      },
      {
        id: 2,
        title: "Room Identification Signs",
        image: "https://placehold.co/600x600/555/fff?text=Room+ID+Signs",
      },
      {
        id: 3,
        title: "Directional Signs",
        image: "https://placehold.co/600x600/111/fff?text=Directional",
      },
    ],
  },

  // --------------------------------------------------------------------
  // 4. ARCHITECTURAL ELEMENTS — DUMMY SUB-PRODUCTS
  // --------------------------------------------------------------------
  {
    id: 4,
    title: "Design & Engineering",
    subtitle: "Architectural Elements",
    slug: "architectural-elements",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    mainImageUrl: "/images/Rectangle 17.webp",
    smallImageUrl: "/images/Rectangle 18.webp",
    layout: "right",
    tag: "Architectural Elements",

    products: [
      {
        id: 1,
        title: "Custom Structures",
        image: "https://placehold.co/600x600/666/fff?text=Structures",
      },
      {
        id: 2,
        title: "Architectural Walls",
        image: "https://placehold.co/600x600/FD8000/fff?text=Walls",
      },
      {
        id: 3,
        title: "Decor Panels",
        image: "https://placehold.co/600x600/000/fff?text=Decor+Panels",
      },
    ],
  },

  // --------------------------------------------------------------------
  // 5. ADA SOLUTION — DUMMY SUB-PRODUCTS
  // --------------------------------------------------------------------
  {
    id: 5,
    title: "Design & Engineering",
    subtitle: "ADA Solution",
    slug: "ada-solution",
    description:
      "ADA compliant signage designed with high accessibility standards.",
    mainImageUrl: "/images/Rectangle 23.webp",
    smallImageUrl: "/images/Rectangle 24.webp",
    layout: "left",
    tag: "ADA Solution",

    products: [
      {
        id: 1,
        title: "Braille Signs",
        image: "https://placehold.co/600x600/888/fff?text=Braille+Signs",
      },
      {
        id: 2,
        title: "Tactile Signs",
        image: "https://placehold.co/600x600/222/fff?text=Tactile",
      },
      {
        id: 3,
        title: "Wayfinding ADA Signs",
        image: "https://placehold.co/600x600/FD8000/fff?text=Wayfinding",
      },
    ],
  },

  // --------------------------------------------------------------------
  // 6. LIGHTING SOLUTIONS — DUMMY SUB-PRODUCTS
  // --------------------------------------------------------------------
  {
    id: 6,
    title: "Design & Engineering",
    subtitle: "Lighting Solutions",
    slug: "lighting-solutions",
    description:
      "Advanced lighting solutions designed for both indoor and outdoor displays.",
    mainImageUrl: "/images/Rectangle 27.webp",
    smallImageUrl: "/images/Rectangle 28.webp",
    layout: "right",
    tag: "Lighting Solutions",

    products: [
      {
        id: 1,
        title: "Backlit Panels",
        image: "https://placehold.co/600x600/222/fff?text=Backlit",
      },
      {
        id: 2,
        title: "LED Modules",
        image: "https://placehold.co/600x600/333/fff?text=LED+Modules",
      },
      {
        id: 3,
        title: "RGB Solutions",
        image: "https://placehold.co/600x600/FD8000/fff?text=RGB",
      },
    ],
  },

  // --------------------------------------------------------------------
  // 7. WAYFINDING SIGNAGE — DUMMY SUB-PRODUCTS
  // --------------------------------------------------------------------
  {
    id: 7,
    title: "Design & Engineering",
    subtitle: "Wayfinding Signs",
    slug: "wayfinding-signs",
    description:
      "Directional and navigation signage crafted for clarity and consistency.",
    mainImageUrl: "/images/Rectangle 35.webp",
    smallImageUrl: "/images/Rectangle 36.webp",
    layout: "left",
    tag: "Wayfinding Signs",

    products: [
      {
        id: 1,
        title: "Hallway Directional Signs",
        image: "https://placehold.co/600x600/111/fff?text=Hallway",
      },
      {
        id: 2,
        title: "Floor Maps",
        image: "https://placehold.co/600x600/333/fff?text=Floor+Maps",
      },
      {
        id: 3,
        title: "Arrow Panels",
        image: "https://placehold.co/600x600/FD8000/fff?text=Arrow",
      },
    ],
  },
  {
    id: 8,
    title: "Design & Engineering",
    subtitle: "Fleet Branding",
    slug: "fleet-branding",
    description:
      "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
    mainImageUrl: "/images/Rectangle 31.webp",
    smallImageUrl: "/images/Rectangle 32.webp",
    layout: "right",
    tag: "Fleet Branding",
    products: [
      {
        id: 1,
        title: "Backlit Panels",
        image: "https://placehold.co/600x600/222/fff?text=Backlit",
      },
      {
        id: 2,
        title: "LED Modules",
        image: "https://placehold.co/600x600/333/fff?text=LED+Modules",
      },
      {
        id: 3,
        title: "RGB Solutions",
        image: "https://placehold.co/600x600/FD8000/fff?text=RGB",
      },
    ],
  },
  {
    id: 9,
    title: "Design & Engineering",
    subtitle: "Large Format Printing",
    slug: "large-format-printing",
    description:
      "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
    mainImageUrl: "/images/Rectangle 38.webp",
    smallImageUrl: "/images/Rectangle 39.webp",
    layout: "left",
    tag: "Large Format Printing",
    products: [
      {
        id: 1,
        title: "Backlit Panels",
        image: "https://placehold.co/600x600/222/fff?text=Backlit",
      },
      {
        id: 2,
        title: "LED Modules",
        image: "https://placehold.co/600x600/333/fff?text=LED+Modules",
      },
      {
        id: 3,
        title: "RGB Solutions",
        image: "https://placehold.co/600x600/FD8000/fff?text=RGB",
      },
    ],
  },
];

export default productList;
