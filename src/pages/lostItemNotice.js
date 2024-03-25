import React from "react";
import axios from 'axios';
import {useEffect, useState} from 'react'; // Used for api calls to server
import {useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik'; // importing components : Formik, Form, Field etc
import * as Yup from 'yup';


function LostItemNotice() {
    const navigate = useNavigate();
    const initialValues = {
        title: "",
        postText: "",
        username: ""
    };

    const onSubmit = (data) => { // data
        axios.post("http://localhost:5000/posts", data).then((response) => {
            navigate("/home") // goes back to homepage once click on button
        });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required()
    });

    return (
    <div className="createPostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Title:</label>
                <ErrorMessage name="title" component="span"/>
                <Field id="inputCreatePost" name="title" placeholder="Title"></Field>
                <label>Post:</label>
                <ErrorMessage name="postText" component="span"/>
                <Field id="inputCreatePost" name="postText" placeholder="Test"></Field>
                <label>UserName:</label>
                <ErrorMessage name="username" component="span"/>
                <Field id="inputCreatePost" name="username" placeholder="JohnLim23"></Field>
                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
    );
}

export default LostItemNotice;