"use client"

import ArticlePage from '@/components/articlePage'; 

const Home: React.FC = () => {

  return (
    <main>
      <ArticlePage subject="other" search="" pageTitle='Other' language='english'/>
    </main>
  );
}

export default Home;
