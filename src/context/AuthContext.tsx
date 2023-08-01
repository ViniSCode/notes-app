import { ReactNode, createContext, useEffect, useState } from "react";

import { auth, firebase } from "../lib/firebase";

type User = {
  id: string | null;
  name: string | null;
  avatar: string | null;
};

interface AuthContextProps {
  user: User | undefined;
  handleSignInWithGoogle: () => void;
  handleSignInWithGithub: () => void;
  handleSignOut: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function handleSignInWithGoogle() {
    // get provider // google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();

    // popup login using google provider
    const result = await auth.signInWithPopup(provider);

    // if user exists
    if (result.user) {
      //get user info
      const { displayName, photoURL, uid } = result.user;

      //if something is missing throw error
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function handleSignInWithGithub() {
    // get provider // google auth provider
    const provider = new firebase.auth.GithubAuthProvider();

    // popup login using google provider
    const result = await auth.signInWithPopup(provider);

    // if user exists
    if (result.user) {
      //get user info
      const { displayName, photoURL, uid } = result.user;

      //if something is missing throw error
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function handleSignOut() {
    await auth.signOut();
    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignInWithGoogle,
        handleSignOut,
        handleSignInWithGithub,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
