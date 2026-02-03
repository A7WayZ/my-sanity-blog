import { client } from "@/sanity/client";
import Link from "next/link";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

// --- 1. SETUP IMAGE BUILDER (From your code) ---
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// --- 2. CUSTOM COMPONENTS - CTA Button?? (From your code - updated to Tailwind) ---
const myComponents = {
  types: {
    callToAction: ({ value }: { value: any }) => {
      return (
        <a 
          href={value.url} 
          className="inline-block bg-red-600 text-white px-5 py-2 rounded-md no-underline mt-4 hover:bg-red-700 transition-colors"
        >
          {value.text}
        </a>
      );
    },
  },
};

// --- 3. THE QUERY (Kept your Author fetch) ---
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  publishedAt,
  body,
  "imageUrl": image.asset->url,
  "authorName": author->name,
  "authorImage": author->avatar
}`;

const options = { next: { revalidate: 60 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug }, options);

  if (!post) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Post not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">Return home</Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      
      {/* Back Button */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="group flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> 
          Back to posts
        </Link>
      </div>

      {/* Hero Image */}
      {post.imageUrl && (
        <div className="mb-8 overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
           <img 
             src={post.imageUrl} 
             alt={post.title} 
             className="h-auto w-full object-cover" 
           />
        </div>
      )}

      {/* Header Section */}
      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
        
        {/* Author & Date Row */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-8">
           {post.authorImage && (
             <img
               src={urlFor(post.authorImage)?.width(100).height(100).url()}
               alt={post.authorName}
               className="h-12 w-12 rounded-full object-cover border border-gray-200"
             />
           )}
           <div>
             {post.authorName && (
               <p className="text-sm font-bold text-gray-900">{post.authorName}</p>
             )}
             <p className="text-sm text-gray-500">
               {new Date(post.publishedAt).toLocaleDateString()}
             </p>
           </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg prose-blue mx-auto text-gray-700">
        {Array.isArray(post.body) ? (
          <PortableText value={post.body} components={myComponents} />
        ) : (
          <p className="whitespace-pre-wrap">{post.body}</p>
        )}
      </article>
      
    </main>
  );
}