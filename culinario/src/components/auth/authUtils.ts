import { ProfileIcon } from "../../images/images";
import { User } from "firebase/auth";

export function getProfileInfo(authUser: User | null) {
    // if user is not logged, the default variables will be shown
    if (!authUser) {
         // Handle the case when authUser is null (e.g., return default values)
        const imgSrc = ProfileIcon;
        const imgAlt = "Guest";
        return { imgSrc, imgAlt };
    }

    // defining isGoogleOrGithub and saving it to the const
    const providerData = authUser?.providerData || [];
    const isGoogleOrGithub = providerData.some(
        (data) => data.providerId === "google.com" || data.providerId === "github.com"
    );

    // defining ImgSrc and Name from the User that is logged
    const imgSrc = isGoogleOrGithub ? authUser?.photoURL : ProfileIcon;
    const name = isGoogleOrGithub ? (authUser.displayName || "") : (authUser.email || "");

    // returning the values
    return { imgSrc, name };
}