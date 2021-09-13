import Head from 'next/head'
import NumberCard from 'src/components/NumberCard'
import QuestionCard from 'src/components/QuestionCard'

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
        <QuestionCard />
        <NumberCard />
      </main>

      <footer></footer>
    </div>
  )
}
