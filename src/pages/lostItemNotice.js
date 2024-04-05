import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './lostItemNotice.css'; // Custom styles for the form

function LostItemNotice() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    location: '',
    itemFilter: '',
    description: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    itemFilter: Yup.string().required('Required'),
    description: Yup.string().required('Required')
  });

  const onSubmit = data => {
    axios.post('http://localhost:5000/lostitems', data)
      .then(() => navigate('/home'))
      .catch(error => console.error('There was an error submitting the form:', error));
  };

  return (
    <body className='backgroundsettings'>
      <div className="LIN-container my-5 lostItemNotice">
        <h2 className="LIN-heading text-center mb-4">Report a Lost Item</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <div className="LIN-form-row">
              <FormGroup label="Name" name="name" type="text" placeholder="Name" />
              <FormGroup label="Location of Lost Item" name="location" type="text" placeholder="Location of Lost Item" />
            </div>
            <div className="LIN-form-row">
              <FormGroup label="Email" name="email" type="email" placeholder="Email" />
              <FormGroup label="Item Filter (Keyword)" name="itemFilter" type="text" placeholder="Item Filter (Keyword)" />
            </div>
            <div className="LIN-form-row">
              <FormGroup label="Phone Number" name="phoneNumber" type="text" placeholder="Phone Number" />
              <FormGroup label="Description" name="description" as="textarea" placeholder="Description" />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
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

export default LostItemNotice;
