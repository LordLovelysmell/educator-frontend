import { FC } from "react";
import { useAuth } from "@/contexts/AuthContext";

const App: FC = () => {
  const { signUp, token } = useAuth();

  if (!token) {
    return (
      <div>
        <input type="text" />
        <button
          onClick={() =>
            signUp({ username: "test1233", password: "testsdasdad" })
          }
        >
          Click me
        </button>
      </div>
    );
  }

  return <div>You are logged in!</div>;
};

export default App;
