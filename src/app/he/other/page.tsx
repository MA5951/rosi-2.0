"use client"

import ArticlePage from '@/components/articlePage'; 

const Home: React.FC = () => {

  return (
    <main>
      <ArticlePage subject="other" search="" pageTitle='אחר' language='hebrew'/>
    </main>
  );
}

export default Home;
