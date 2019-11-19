import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom"

function SignupForm({ errors, touched }) {
  return (
    <Form>
      <div>
        <h1>DevLibs Signup Form</h1>
      </div>
      <div>
        <Field type="text" name="username" placeholder="Username" />
        {touched.username && errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
      </div>
      <br />
      <button type="submit">Sign Up!</button> <br />
      Already have an account? <Link to="/login">Login!</Link>
    </Form>
  );
}

const FormikSignupForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
      .min(6)
      .required()
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://dev-libs-test.herokuapp.com/api/auth/register", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(SignupForm);

export default FormikSignupForm;
