"use client"

import ArticlePage from '@/components/articlePage'

type Props = {
    params: {
        slug: string
    }
}

const page = ({params}: Props) => {

  console.log(params.slug);
  return (
    <main>
      <ArticlePage subject="" search={params.slug} language='hebrew' pageTitle={params.slug}/>
    </main>
  );
}

export default page;
