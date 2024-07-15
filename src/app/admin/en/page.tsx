"use client"

import ArticlePage from '@/app/admin/components/articlePage'; 

const Home: React.FC = () => {

  return (
    <main>
      <ArticlePage subject="" search="" pageTitle='pending' language='english'/>
    </main>
  );
}

export default Home;
