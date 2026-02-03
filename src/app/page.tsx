import { client } from "@/sanity/client"; // Ensure this path matches your setup
import Link from "next/link";

// 1. Fetch data (including the image!)
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug, 
  publishedAt,
  "imageUrl": image.asset->url
}`;

const options = { next: { revalidate: 60 } };

export default async function IndexPage() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter">
        My Sanity Blog
      </h1>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post: any) => (
          <li key={post._id} className="group relative rounded-lg border border-gray-200 p-4 transition-all hover:shadow-lg hover:border-blue-500">
            <Link href={`/${post.slug.current}`}>
              
              {/* Image Thumbnail (if it exists) */}
              {post.imageUrl && (
                <div className="mb-4 h-48 w-full overflow-hidden rounded-md bg-gray-100">
                   <img 
                     src={post.imageUrl} 
                     alt={post.title} 
                     className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                   />
                </div>
              )}

              {/* Title & Date */}
              <h2 className="text-xl font-semibold leading-snug group-hover:text-blue-600">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}