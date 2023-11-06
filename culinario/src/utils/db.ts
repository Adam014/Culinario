import { useState, useEffect } from "react";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { collection, doc, getDoc } from "firebase/firestore";
import { favoriteRecipesCollection } from "../firebase/firebase";
import { Recipe } from "../components/services/allRecipes";

export interface FavoriteRecipe {
  id: string;
  recipe: Recipe;
}

export const getFavoriteRecipesData = async (userUid: string | null) => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (userUid) {
        const userDocRef = doc(favoriteRecipesCollection, userUid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userFavoritesCollection = collection(userDocRef, "favoriteRecipes");
          const q = query(userFavoritesCollection, orderBy("favoritedAt", "desc"));

          const unsub = onSnapshot(q, (snapshot) => {
            const favoriteArray: FavoriteRecipe[] = snapshot.docs.map((doc) => ({
              id: doc.id,
              recipe: doc.data().recipe as Recipe,
            }));
            setFavorites(favoriteArray);
          });

          return unsub;
        } else {
          setFavorites([]);
        }
      }
    };

    fetchFavoriteRecipes();
  }, [userUid]);

  return favorites;
};