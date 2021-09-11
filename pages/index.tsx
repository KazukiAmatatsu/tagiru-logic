import Head from 'next/head'
import NumberCard from 'src/components/NumberCard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>タギロン−たぎる論理−</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>
          <p>Hello, Next.js</p>
        </h1>
        <NumberCard />
      </main>

      <footer></footer>
    </div>
  )
}
