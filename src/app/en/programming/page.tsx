"use client"

import ArticlePage from '@/components/articlePage'; 

const Home: React.FC = () => {

  return (
    <main>
      <ArticlePage subject="programming" search="" pageTitle='Programming' language='english'/>
    </main>
  );
}

export default Home;
