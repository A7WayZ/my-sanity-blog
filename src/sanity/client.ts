import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "cdezm68g",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  stega: {
    enabled: true,
    studioUrl: 'http://localhost:3333',
  },
});