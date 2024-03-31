import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './filteredSearch.css';

function FilteredSearch() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    location: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
  });

  const onSubmit = data => {
    axios.post('http://localhost:5000/lostitems', data)
      .then(() => navigate('/home'))
      .catch(error => console.error('There was an error submitting the form:', error));
  };

  return (
    <div className="container1 my-5 filteredSearch">
      <h2 className="text-center mb-4">Search for lost item</h2>
      <div className="flexbox-container">
      <div className="form-wrapper">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <div className="FSform-row">
            <FormGroup label="Name of lost item" name="name" type="text" placeholder="Eg. Waterbottle" />
          </div>
          <div className="FSform-row1">
            <FormGroup label="Location item was lost" name="location" type="text" placeholder="Eg. Pioneer" />
          </div>
          <div class='FSparent'>
            <div class='FSchild'>
              <h5 className="text-center mb-4">Filter:</h5>
            </div>
            <div class='FSchild'>
              <div className="FSform-row2">
                <FormGroup label="Item category:" name="itemCategory" type="text" placeholder="Item cateogory" />
              </div>
              <div className="FSform-row2">
                <FormGroup label="Item colour:" name="itemColour" type="text" placeholder="Item colour" />
              </div>
              <div className="FSform-row2">
                <FormGroup label="Item location:" name="itemLocation" type="text" placeholder="Item location" />
              </div>
            </div>
          </div>
          
          <button type="search" className="searchbtn">Search</button>
        </Form>
      </Formik>
      </div>
      </div>
    </div>
  );
}

const FormGroup = ({ label, name, type, placeholder, as }) => (
  <div className="form-group col-md-6">
    <label htmlFor={name}>{label}</label>
    <Field name={name} type={type} as={as} className="form-control" placeholder={placeholder} />
    <ErrorMessage name={name} component="div" className="error-message" />
  </div>
);

export default FilteredSearch
