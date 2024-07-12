"use client"

import ArticlePage from '@/components/articlePage'; 

type Props = {
    params: {
        slug: string
    }
}

const page = ({params}: Props) => {

  return (
    <main>
      <ArticlePage subject="" search={params.slug} pageTitle={params.slug} language='english'/>
    </main>
  );
}

export default page;
