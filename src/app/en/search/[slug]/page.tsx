"use client"

import ArticlePage from '@/app/en/articlePage'; 

type Props = {
    params: {
        slug: string
    }
}

const page = ({params}: Props) => {

  return (
    <main>
      <ArticlePage subject="" search={params.slug} />
    </main>
  );
}

export default page;
