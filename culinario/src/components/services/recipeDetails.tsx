import React from "react";
import Layout from '../Layout/Layout';
import { User } from 'firebase/auth';

interface RecipeDetailsProps {
    authUser: User | null; 
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  }

const recipeDetails: React.FC<RecipeDetailsProps> = ({ authUser, setAuthUser }) => {
    console.log();

    return (
        <Layout authUser={authUser} setAuthUser={setAuthUser}>
            
        </Layout>
    )
}

export default recipeDetails