"use client"

import FavoritesPage from "@/components/favoritesPage";

const Home: React.FC = () => {

  return (
    <main>
      <FavoritesPage language='hebrew' pageTitle='favorites'/>
    </main>
  );
}

export default Home;
