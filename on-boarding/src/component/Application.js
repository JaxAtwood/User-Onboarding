import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const Application = ({ errors, values, touched, status }) => {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    if (status) {
      setStudent([...student, status]);
    }
  }, [status]);

  return (
    <div className="RockerForm">
      <h1>Heavy Metal University Application</h1>

      <Form>
        <Field 
        type="text" 
        name="name" 
        placeholder="What Shall We Dub Thee?" />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}

        <Field 
        type="text" 
        name="email" 
        placeholder="Where Can We Spam You?" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}

        <Field 
        type="password" 
        name="password" 
        placeholder="Lock It Down:" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}

        <label className="humanChecker">
          Are You Human?
          <Field 
          type="checkbox" 
          name="checker" 
          checked={values.checker} />
          <span className="checkmark" />
        </label>

        <Field
          component="textarea"
          type="text"
          name="bio"
          placeholder="Tell Us Why You Rock!" />
            {touched.bio && errors.bio && (
            <p className="error">{errors.bio}</p>
          )}

        <button type="submit">Hit Me!</button>
      </Form>

      {student.map(stuInfo => (
        <ul key={stuInfo.id}>
          <li>Name: {stuInfo.name}</li>
          <li>Email: {stuInfo.email}</li>
          <li>Bio: {stuInfo.bio}</li>
        </ul>
      ))}
    </div>
  );
};


const FormikRockApp = withFormik({
  mapPropsToValues({ name, email, password, checker, bio }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      checker: checker || false,
      bio: bio || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Forget Your Name?"),
    email: Yup.string().required("You gotta type something here, bro!"),
    password: Yup.string().required("Lock it down!"),
    bio: Yup.string().required("Tell Us Some Personal Junk...")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      console.log(res);
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(Application);

export default FormikRockApp;
