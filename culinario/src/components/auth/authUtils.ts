import { ProfileIcon } from "../../images/images";
import { User } from "firebase/auth";

export function getProfileInfo(authUser: User | null) {
    if (!authUser) {
         // Handle the case when authUser is null (e.g., return default values)
        const imgSrc = ProfileIcon;
        const imgAlt = "Guest";
        return { imgSrc, imgAlt };
    }


    const providerData = authUser?.providerData || [];
    const isGoogleOrGithub = providerData.some(
        (data) => data.providerId === "google.com" || data.providerId === "github.com"
    );

    const imgSrc = isGoogleOrGithub ? authUser?.photoURL : ProfileIcon;
    const name = isGoogleOrGithub ? (authUser.displayName || "") : (authUser.email || "");

    return { imgSrc, name };
}