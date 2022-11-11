import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { useAuth } from "@/contexts/AuthContext";
import { UserData } from "@/services/UserService";
import { Link } from "react-router-dom";

const Auth: FC = () => {
  const { signUp, errorMessage } = useAuth();

  return (
    <>
      <h1>Sign Up</h1>
      <Formik<UserData>
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values, actions) => {
          try {
            console.log(values);
            const token = await signUp(values);
          } catch {}
        }}
      >
        {(props) => (
          <Form>
            <Field name="username">
              {({ field, form, meta }: any) => {
                return (
                  <>
                    <input type="text" placeholder="Username" {...field} />
                    {errorMessage && (
                      <div className="error">{errorMessage}</div>
                    )}
                  </>
                );
              }}
            </Field>
            <Field type="password" name="password" placeholder="Password" />
            <button>Submit</button>
          </Form>
        )}
      </Formik>
      <Link to="/sign-in">Sign In</Link>
    </>
  );
};

export default Auth;
