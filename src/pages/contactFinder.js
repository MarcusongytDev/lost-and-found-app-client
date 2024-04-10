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
      .then((response) => { alert('Your message has been sent successfully!') })
      .catch(error => alert('There was an error sending your message. Please try again.'));
  };

  

  return (
    <body className='backgroundsettings'>
      <div className="containerCF my-5 contactFinder">
        <h2 className="text-centerCF mb-4">Contact Finder</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        
        {({ isSubmitting }) => (
    



          <Form>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label contact-finder-label">Name</label>
              <div className="col-sm-10">
                <Field name="name" type="text" className="form-control contact-finder-input" placeholder="Name" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label contact-finder-label">Email</label>
              <div className="col-sm-10">
                <Field name="email" type="email" className="form-control contact-finder-input" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="phoneNumber" className="col-sm-2 col-form-label contact-finder-label">Phone No.</label>
              <div className="col-sm-10">
                <Field name="phoneNumber" type="text" className="form-control contact-finder-input" placeholder="Phone Number" />
                <ErrorMessage name="phoneNumber" component="div" className="error-message" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="message" className="col-sm-2 col-form-label contact-finder-label1">Message</label>
              <div className="col-sm-10">
                <Field name="message" as="textarea" className="form-control ccontact-finder-input1" placeholder="Message for the person who found your item" />
                <ErrorMessage name="message" component="div" className="error-message" />
              </div>
            </div>
            <button type="submit" className="sendmessagebtn">Submit</button>
          </Form>
        )}
        </Formik>
      </div>
    </body>
 );
}

export default ContactFinder;


