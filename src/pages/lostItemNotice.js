import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { WithContext as ReactTags } from 'react-tag-input';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lostItemNotice.css';

function LostItemNotice() {
  const navigate = useNavigate();

  // Initialize tags state for itemFilter tags
  const [tags, setTags] = useState([]);

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    location: '',
    description: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    description: Yup.string().required('Required')
  });

  const onSubmit = (values) => {
    const dataToSubmit = {
      ...values,
      itemFilter: tags.map(tag => tag.text), // Transform tags into an array of text values
    };

    axios.post('http://localhost:5000/lostitems', dataToSubmit)
      .then(() => {
        navigate('/home');
      })
      .catch(error => {
        console.error('There was an error submitting the form:', error);
      });
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  return (
    <div className='backgroundsettings'>
      <div className="LIN-container my-5">
        <h2 className="LIN-heading text-center mb-4">Report a Lost Item</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" type="text" className="form-control LIN-formControl" />
              <ErrorMessage name="name" component="div" className="LIN-errorMessage" />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location of Lost Item</label>
              <Field id="location" name="location" type="text" className="form-control LIN-formControl" />
              <ErrorMessage name="location" component="div" className="LIN-errorMessage" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" className="form-control LIN-formControl" />
              <ErrorMessage name="email" component="div" className="LIN-errorMessage" />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field id="phoneNumber" name="phoneNumber" type="text" className="form-control LIN-formControl" />
              <ErrorMessage name="phoneNumber" component="div" className="LIN-errorMessage" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field id="description" name="description" as="textarea" className="form-control LIN-formControl" />
              <ErrorMessage name="description" component="div" className="LIN-errorMessage" />
            </div>

            <div className="form-group">
              <label>Item Filter (Keyword)</label>
              <ReactTags
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                inputFieldPosition="bottom"
                autocomplete
                classNames={{
                  tags: 'ReactTags__tags',
                  tagInput: 'ReactTags__tagInput',
                  tagInputField: 'ReactTags__tagInputField LIN-formControl',
                  selected: 'ReactTags__selected',
                  tag: 'ReactTags__tag',
                  remove: 'ReactTags__remove',
                  suggestions: 'ReactTags__suggestions',
                  activeSuggestion: 'ReactTags__activeSuggestion'
                }}
                delimiters={[188, 13]}
              />
            </div>

            <button type="submit" className="LIN-submitButton">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default LostItemNotice;
