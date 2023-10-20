import Layout from '../Layout/Layout';
import { User } from 'firebase/auth';

import { useGetRecipeDetailsQuery } from './recipesApi';

interface RecipeDetailsProps {
    authUser: User | null;
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const recipeDetails: React.FC<RecipeDetailsProps> = ({ authUser, setAuthUser } : RecipeDetailsProps) => {
    // const { data, isFetching } = useGetRecipeDetailsQuery(coinId);

    return (
        <Layout authUser={authUser} setAuthUser={setAuthUser}>
            <div>
                recipe details
            </div>
        </Layout>
    )
}

export default recipeDetails
