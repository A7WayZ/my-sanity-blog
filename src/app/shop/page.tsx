import { client } from "@/sanity/client";
import Link from "next/link";

// 1. Fetch only "product" types
const PRODUCTS_QUERY = `*[
  _type == "product"
]{
  _id, 
  name, 
  price,
  description,
  "imageUrl": image.asset->url
}`;

const options = { next: { revalidate: 60 } };

export default async function ShopPage() {
  const products = await client.fetch(PRODUCTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-5xl p-8">
      <h1 className="mb-2 text-4xl font-bold">Concept Store</h1>
      <p className="mb-8 text-gray-500">A prototype collection.</p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product: any) => (
          <div key={product._id} className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
            
            {/* Product Image */}
            {product.imageUrl && (
              <div className="aspect-square w-full overflow-hidden bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            )}

            {/* Product Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-gray-900">
                  {product.name}
                </h2>
                <span className="font-mono font-medium text-black">
                  {product.price} kr.
                </span>
              </div>
              
              <p className="mb-4 text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              
              <button className="w-full rounded bg-black py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12">
        <Link href="/" className="text-gray-500 hover:text-black hover:underline">
           ← Back Home
        </Link>
      </div>
    </main>
  );
}