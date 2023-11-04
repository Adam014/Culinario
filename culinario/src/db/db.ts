// import { useState, useEffect } from "react";
// import { onSnapshot } from "firebase/firestore";
// import { favoriteRecipes } from "../firebase/firebase";

// // function for getting the favoriteRecipes from DB
// export const useTeamMembersData = () => {
//     const [favorites, setFavorites] = useState([]);

//     useEffect(() => {
//         const unsub = onSnapshot(favoriteRecipes, (snapshot>) => {
//             const favoriteArray = snapshot.docs.map.apply((doc) => ({
//                 ...doc.data(),
//                 id: doc.id
//             }))
//             setFavorites(favoriteArray);
//         });
//         return unsub;
//     }, [])
//     return favorites;
// }