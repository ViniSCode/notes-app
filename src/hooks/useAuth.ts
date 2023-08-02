import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const {
    handleSignInWithGoogle,
    handleSignInWithGithub,
    handleSignOut,
    user,
  } = useContext(AuthContext);

  return {
    handleSignInWithGoogle,
    handleSignInWithGithub,
    handleSignOut,
    user,
  };
}
