import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  // 1. Turn on "Draft Mode"
  // (This tells Next.js: "Show me the unpublished content!")
  const draft = await draftMode()
  draft.enable()

  // 2. Redirect back to the homepage
  redirect('/')
}