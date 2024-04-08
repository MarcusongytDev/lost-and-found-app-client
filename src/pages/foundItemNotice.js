import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './foundItemNotice.css';

function FoundItemNotice() {
  const navigate = useNavigate();
  const [dateFound, setDateFound] = useState('');
  const [timeFound, setTimeFound] = useState('');

  const initialValues = {
    category: '',
    color: '',
    photo: null // New field for photo upload
  };

  const validationSchema = Yup.object({
    category: Yup.string().required('Required'),
    color: Yup.string().required('Required'),
    photo: Yup.mixed().required('Photo of item is required') // Validation for photo upload
  });

  const onSubmit = async (values) => {
    const datetimeFound = `${dateFound} ${timeFound}`;
    const formData = new FormData();
    formData.append('category', values.category);
    formData.append('color', values.color);
    formData.append('datetimefound', datetimeFound);
    formData.append('photo', values.photo); // Append photo to form data

    try {
      await axios.post('http://localhost:5000/ApplicationService', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/home');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  return (
    <div className='backgroundsettings'>
      <div className="LIN-container my-5">
        <h2 className="LIN-heading text-center mb-4">Details of Found Item</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ values, setFieldValue }) => ( // Pass setFieldValue to handle file changes
            <Form>
              <div className="form-group">
                <label htmlFor="category">Item Category</label>
                <Field id="category" name="category" type="text" className="form-control LIN-formControl" />
                <ErrorMessage name="category" component="div" className="LIN-errorMessage" />
              </div>

              <div className="form-group">
                <label htmlFor="color">Color</label>
                <Field id="color" name="color" type="text" className="form-control LIN-formControl" />
                <ErrorMessage name="color" component="div" className="LIN-errorMessage" />
              </div>

              <div className="form-group">
                <label htmlFor="datefound">Date Found</label>
                <input
                  id="datefound"
                  name="datefound"
                  type="date"
                  value={dateFound}
                  onChange={(e) => setDateFound(e.target.value)}
                  className="form-control LIN-formControl"
                />
                <ErrorMessage name="datefound" component="div" className="LIN-errorMessage" />
              </div>

              <div className="form-group">
                <label htmlFor="timefound">Time Found</label>
                <input
                  id="timefound"
                  name="timefound"
                  type="time"
                  value={timeFound}
                  onChange={(e) => setTimeFound(e.target.value)}
                  className="form-control LIN-formControl"
                />
                <ErrorMessage name="timefound" component="div" className="LIN-errorMessage" />
              </div>

              <div className="form-group">
                <label htmlFor="photo">Photo of Item</label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={(event) => {
                    setFieldValue('photo', event.currentTarget.files[0]); // Update form values on file selection
                  }}
                  className="form-control LIN-formControl"
                />
                <ErrorMessage name="photo" component="div" className="LIN-errorMessage" />
              </div>

              <button type="submit" className="LIN-submitButton">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FoundItemNotice;
