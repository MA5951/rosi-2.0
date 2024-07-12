"use client"

import ArticlePage from '@/components/articlePage'; 

const Home: React.FC = () => {

  return (
    <main>
      <ArticlePage subject="programming" search="" language='hebrew' pageTitle='תוכנה'/>
    </main>
  );
}

export default Home;
