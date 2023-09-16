import { NewsArticle, NewsResponse } from "@/models/NewsArticles"
import { Metadata } from "next"
import Link from "next/link"
import ProductCard from "./components/ProductCard"
export const metadata: Metadata = {
  title: 'Las notiSSias',
}

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

async function getData() {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()
  const arts: NewsArticle[] = data.articles
  console.log({ arts })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">

      <h2 className="p-4 bg-amber-300">hola mundo</h2>
      <ProductCard />
      <Link href="/users">Users</Link>
      {/* {JSON.stringify(arts)} */}
    </main>
  )
}
