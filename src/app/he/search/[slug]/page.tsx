"use client"

import ArticlePage from '@/app/he/articlePage'; 

type Props = {
    params: {
        slug: string
    }
}

const page = ({params}: Props) => {

  console.log(params.slug);
  return (
    <main>
      <ArticlePage subject="" search={params.slug} />
    </main>
  );
}

export default page;
