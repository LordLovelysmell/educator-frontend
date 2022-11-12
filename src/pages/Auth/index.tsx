import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { useAuth } from "@/contexts/AuthContext";
import { UserData } from "@/services/UserService";
import { Link } from "react-router-dom";
import { block } from "bem-cn";
import Logo from "../../assets/svg/logo.svg";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const authBlock = block("Auth");
const authClass = authBlock();
const authHeaderClass = authBlock("header");

const Auth: FC = () => {
  const { signUp, errorMessage } = useAuth();

  return (
    <div className={authClass}>
      <div className={authHeaderClass}>
        <Logo />
        <h1>Sign in to Educator</h1>
      </div>
      <Formik<UserData>
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          try {
            await signUp(values);
            actions.resetForm();
          } catch {}
        }}
      >
        {(props) => (
          <Form>
            <Field name="username">
              {({ field, form, meta }: any) => {
                console.log(props, field, form, meta);

                return (
                  <>
                    <input type="text" placeholder="Username" {...field} />
                    {/* TODO: Replace below to notification component */}
                    {/* {errorMessage && (
                      <div className="error">{errorMessage}</div>
                    )} */}
                    {props.errors.username && props.touched.username && (
                      <div>{props.errors.username}</div>
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
    </div>
  );
};

export default Auth;
