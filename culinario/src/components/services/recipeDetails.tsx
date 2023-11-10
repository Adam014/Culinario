import React from "react";
import Layout from '../Layout/Layout';
import { User } from 'firebase/auth';
import { Recipe } from "./allRecipes";
import { useParams } from "react-router-dom";

interface RecipeDetailsProps {
    authUser: User | null; 
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
    recipe: Recipe;
  }

const recipeDetails: React.FC<RecipeDetailsProps> = ({ authUser, setAuthUser }) => {
    const recipeId = useParams();
    
    console.log(recipeId);
    return (
        <Layout authUser={authUser} setAuthUser={setAuthUser}>
            <div></div>
        </Layout>
    )
}

export default recipeDetails