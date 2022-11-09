import useToken from "@/hooks/useToken";
import { createUser, UserData } from "@/services/UserService";
import { useContext } from "react";
import { createContext, FC, useMemo } from "react";

const AuthContext = createContext({});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useToken();

  const signUp = async (data: UserData) => {
    try {
      const { token: _token } = await createUser(data);

      if (_token) {
        setToken(_token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const value = useMemo(() => ({ signUp, token }), [signUp]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): {
  signUp?(data: UserData): void;
  token?: string;
} => {
  return useContext(AuthContext);
};
