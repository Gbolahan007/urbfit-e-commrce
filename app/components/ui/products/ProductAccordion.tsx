"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface ProductAccordionProps {
  product: {
    name: string;
    description?: string;
    category?: string;
    brand?: string;
    material?: string;
    care?: string;
  };
}

export default function ProductAccordion({ product }: ProductAccordionProps) {
  console.log();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "details",
      title: "Product Details",
      content: (
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            {product.description ||
              "Premium quality product crafted with attention to detail."}
          </p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>Half zip closure</li>
            <li>Cable knit design</li>
            <li>Icon logo embroidered at chest</li>
            <li>Ribbed cuffs and hem</li>
            <li>Regular fit</li>
          </ul>
        </div>
      ),
    },
    {
      id: "brand",
      title: "Brand",
      content: (
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>{product.brand || "Polo Ralph Lauren"}</strong>
          </p>
          <p>
            Since 1967, Polo Ralph Lauren has defined classic American style
            with an unwavering commitment to quality and timeless design. From
            iconic polo shirts to sophisticated tailoring, each piece embodies
            the brand&apos;s heritage of luxury and refinement.
          </p>
        </div>
      ),
    },
    {
      id: "size-fit",
      title: "Size & Fit",
      content: (
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Model&apos;s height:</strong> 6&apos;1&apos; / 185cm
          </p>
          <p>
            <strong>Model is wearing:</strong> Size M
          </p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>Regular fit - true to size</li>
            <li>Designed to be worn close to the body</li>
            <li>Mid-weight knit fabric</li>
          </ul>
          <p className="mt-3">
            <a href="#" className="text-blue-600 hover:underline">
              View our size guide
            </a>
          </p>
        </div>
      ),
    },
    {
      id: "care",
      title: "Look After Me",
      content: (
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            {product.care ||
              "Follow care instructions to maintain quality and longevity."}
          </p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>Machine wash at 30°C</li>
            <li>Wash with similar colours</li>
            <li>Do not bleach</li>
            <li>Do not tumble dry</li>
            <li>Iron on low heat</li>
            <li>Dry clean if preferred</li>
          </ul>
        </div>
      ),
    },
    {
      id: "about",
      title: "About Me",
      content: (
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Material:</strong> {product.material || "100% Cotton"}
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {product.category || "Jumpers & Cardigans"}
          </p>
          <p className="mt-3">
            This premium cable knit jumper features a classic half-zip design,
            perfect for layering or wearing on its own. The cotton construction
            ensures breathability and comfort, while the timeless design makes
            it a versatile addition to any wardrobe.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-gray-200">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between py-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-base">{section.title}</span>
            {openSection === section.id ? (
              <Minus className="w-5 h-5 flex-shrink-0" />
            ) : (
              <Plus className="w-5 h-5 flex-shrink-0" />
            )}
          </button>
          {openSection === section.id && (
            <div className="pb-5 px-0">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
