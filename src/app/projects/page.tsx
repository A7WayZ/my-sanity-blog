import { client } from "@/sanity/client";
import Link from "next/link";

// 1. Fetch only "project" types
const PROJECTS_QUERY = `*[
  _type == "project"
]{
  _id, 
  title, 
  description, 
  link,
  "imageUrl": image.asset->url
}`;

const options = { next: { revalidate: 60 } };

export default async function ProjectsPage() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <h1 className="mb-8 text-4xl font-bold">My Portfolio</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project: any) => (
          <div key={project._id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            
            {/* Clickable Image Area */}
            {project.imageUrl && (
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            )}

            {/* Content Area */}
            <div className="p-6">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                {project.title}
              </h2>
              <p className="mb-4 text-gray-600">
                {project.description}
              </p>
              
              {/* The "Visit" Button */}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Visit Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12">
        <Link href="/" className="text-gray-500 hover:text-black hover:underline">
           ← Back to Blog
        </Link>
      </div>
    </main>
  );
}