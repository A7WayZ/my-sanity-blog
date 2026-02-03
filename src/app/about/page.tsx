import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      
      <div className="prose prose-lg text-gray-700">
        <p>
          Hello! I am a developer building my first Headless CMS blog.
        </p>
        <p>
          This page is a static React component, meaning the content lives 
          right here in the code, unlike the blog posts which come from Sanity.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}