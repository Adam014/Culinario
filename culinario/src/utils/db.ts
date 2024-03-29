import { useState, useEffect } from "react";
import { favoriteRecipesCollection } from "../firebase/firebase";
import { collection, query, onSnapshot, doc, getDoc, orderBy } from "firebase/firestore";
// import { allRecipes } from "../firebase/firebase";
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

// create here the function

// Function to save recipes to the allRecipes collection
// export const saveRecipeToCollection = async (recipe: Recipe) => {

// };

// Function for to load the allRecipes collection and save them to a array


// function for formatting time to CZ time
export const formatDateTime = (dateTime: string | undefined): string => {
  return dateTime
    ? new Date(dateTime).toLocaleString("cz-CZ", {
        timeZone: "Europe/Prague",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : "N/A";
};