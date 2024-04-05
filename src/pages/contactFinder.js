import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './contactFinder.css'; // Custom styles for the form

function ContactFinder() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
  });

  const onSubmit = data => {
    axios.post('http://localhost:5000/lostitems', data)
      .then(() => navigate('/home'))
      .catch(error => console.error('There was an error submitting the form:', error));
  };

  return (
    <body className='backgroundsettings'>
      <div className="container1 my-5 contactFinder">
        <h2 className="text-center mb-4">Contact Finder</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <div className="form-row">
              <FormGroup label="Name" name="name" type="text" placeholder="Name" />
            </div>
            <div className="form-row1">
              <FormGroup label="Email" name="email" type="email" placeholder="Email" />
            </div>
            <div className="form-row2">
              <FormGroup label="Phone Number" name="phoneNumber" type="text" placeholder="Phone Number" />
            </div>
            <div className="message-row">
            <FormGroup label="Message" name="message" as="textarea" placeholder="Message for the person who found your item" />
            </div>
            <button type="sendmessage" className="sendmessagebtn">Send Message</button>
          </Form>
        </Formik>
      </div>
      </body>
  );
}

const FormGroup = ({ label, name, type, placeholder, as }) => (
  <div className="form-group col-md-6">
    <label htmlFor={name}>{label}</label>
    <Field name={name} type={type} as={as} className="form-control" placeholder={placeholder} />
    <ErrorMessage name={name} component="div" className="error-message" />
  </div>
);

export default ContactFinder


