import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { favoriteRecipesCollection } from "../firebase/firebase";

export const getFavoriteRecipesData = () => {
    const [favorites, setFavorites] = useState<{ id: string }[]>([]);

    useEffect(() => {
        const unsub = onSnapshot(favoriteRecipesCollection, (snapshot) => {
            const favoriteArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setFavorites(favoriteArray);
        });
        return unsub
    }, [])

    return favorites;
}