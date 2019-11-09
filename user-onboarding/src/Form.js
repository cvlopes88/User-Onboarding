import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";


const UserForm = ({errors, touched, values, status}) => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
    if (status) {
        setForms([...forms, status]);

    }
}, [status]);

return (
    <div className="userForm">
    <h1>User Form</h1>
    <Form>
     <Field type="text" name="name" placeholder="Name" />
     {touched.name && errors.name && (
         <p className="error">{errors.name}</p>
     )}
     <Field type="email" name="email" placeholder="email" />
     {touched.email && errors.email && (
         <p className="error">{errors.email}</p>
     )}
     <Field type="password" name="password" placeholder="password" />
     {touched.password && errors.password && (
         <p className="error">{errors.password}</p>
     )}
     <label className="checkbox">Accept Terms of Service
     <Field type="checkbox" name="terms" checked={values.terms} />
     <span className="checkmark" />
     {touched.terms && errors.terms && (
         <p className="error">{errors.terms}</p>
     )}
     </label>

     <button type="submit">Submit!</button>
        </Form>    

     {forms.map(user => (
     <ul key={user.id}>
         <li>Name: {user.name}</li>
         <li>Email: {user.email}</li>
         <li>Password: {user.password}</li>
     </ul>
     ))}
 

    </div>
);


};


 const FormikUserForm = withFormik({

    mapPropsToValues({name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("please type full name here"),
        email: Yup.string().required("we need a valid email"),
        password: Yup.string().required().min(6, 'password has to be longer than 6'),
        terms: Yup.bool().test(
        'consent',
        'You have to agree with our Terms and Conditions!',
        value => value === true
      )
      .required(
        'You have to agree with our Terms and Conditions!'
      ),
    }),
    handleSubmit(values, { setStatus}) {
    axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
            setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }

})(UserForm) ;

export default FormikUserForm;