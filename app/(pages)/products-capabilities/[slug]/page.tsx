import ProductHeroSection from "@/components/product-details/ProductHeroSection";
import ProductSubCardsSection from "@/components/product-details/ProductSubCardsSection";
import products from "@/data/products"; // <-- make sure your product list is exported

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // <-- IMPORTANT FIX
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-3xl font-semibold">Product Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <ProductHeroSection content={product} />
      <ProductSubCardsSection content={product} />
    </>
  );
}
