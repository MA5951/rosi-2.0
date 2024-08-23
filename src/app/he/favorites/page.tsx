"use client"

import FavoritesPage from "@/components/favoritesPage";

const Home: React.FC = () => {

  return (
    <main>
      <FavoritesPage language='hebrew' pageTitle='מועדפים'/>
    </main>
  );
}

export default Home;
