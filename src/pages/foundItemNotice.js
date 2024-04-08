import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { WithContext as ReactTags } from 'react-tag-input';
import * as Yup from 'yup';
import './foundItemNotice.css';
import GoogleMaps from "../components/API/GoogleMapsFinder.js"; // Import the GoogleMaps component

function FoundItemNotice() {
    const [dateFound, setDateFound] = useState('');
    const [timeFound, setTimeFound] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null); // State to store the selected location
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); // State for description field
    const [email, setEmail] = useState(''); // State for email field
    const [phone, setPhone] = useState(''); // State for phone number field
    const [tags, setTags] = useState([]); // Initialize tags state for itemFilter tags

    const initialValues = {
        name: '',
        datefound: '',
        timefound: '',
        description: '',
        email: '',
        phone: '',
        photo: null,
        itemFilter: [] // Initialize itemFilter array for tags
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        datefound: Yup.date().required('Date Found is required'),
        timefound: Yup.string().required('Time Found is required'),
        description: Yup.string().required('Description is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^[0-9]+$/, 'Must be a valid phone number').required('Phone number is required'),
        photo: Yup.mixed().required('Photo of item is required')
    });

    const onSubmit = async (values) => {
        // Submit form data
        try {
            // Update the selected location directly on form submission
            setSelectedLocation({ latitude: 123, longitude: 456 }); // Replace with the actual selected location
            // Assuming you have a function to get the selected location from the map component
            await axios.post('http://localhost:5000/founditems', {
                ...values,
                location: { latitude: 123, longitude: 456 }, // Add selected location to form data
                name: name // Add name to form data
            });
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
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
                <h2 className="LIN-heading text-center mb-4">Details of Found Item</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field id="name" name="name" type="text" className="form-control LIN-formControl" />
                                <ErrorMessage name="name" component="div" className="LIN-errorMessage" />
                            </div>
                            <GoogleMaps selectedLocation={selectedLocation} /> {/* Render the GoogleMaps component */}

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
                                <label htmlFor="description">Description</label>
                                <Field id="description" name="description" type="text" className="form-control LIN-formControl" />
                                <ErrorMessage name="description" component="div" className="LIN-errorMessage" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field id="email" name="email" type="email" className="form-control LIN-formControl" />
                                <ErrorMessage name="email" component="div" className="LIN-errorMessage" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <Field id="phone" name="phone" type="tel" className="form-control LIN-formControl" />
                                <ErrorMessage name="phone" component="div" className="LIN-errorMessage" />
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
