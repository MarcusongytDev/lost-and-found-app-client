import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './foundItemNotice.css';
import * as Yup from 'yup';
import { WithContext as ReactTags } from 'react-tag-input';
import './foundItemNotice.css';
import GoogleMaps from "../components/API/GoogleMapsFinder.js"; // Import the GoogleMaps component

function FoundItemNotice() {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showProcessedPopup, setShowProcessedPopup] = useState(false);

    const [dateFound, setDateFound] = useState('');
    const [timeFound, setTimeFound] = useState('');
    const [selectedLocation, setSelectedLocation] = useState({}); // State to store the selected location
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); // State for description field
    const [email, setEmail] = useState(''); // State for email field
    const [phone, setPhone] = useState(''); // State for phone number field
    const [photo, setPhoto] = useState();

    const initialValues = {
        name: '',
        datefound: '',
        timefound: '',
        description: '',
        email: '',
        phone: '',
        photo: null
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        datefound: Yup.date(),
        timefound: Yup.string(),
        description: Yup.string().required('Description is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^[0-9]+$/, 'Must be a valid phone number').required('Phone number is required'),
        photo: Yup.mixed().required('Photo of item is required')
    });

    const onSubmit = async (values) => {
        console.log("here below");
        setIsProcessing(true); // Show the first popup
        const data = new FormData();
        data.append("name", name);
        data.append("dateFound", dateFound);
        data.append("timeFound", timeFound);
        data.append("description", description);
        data.append("email", email);
        data.append("phone", phone);
        // Commenting out the tags
        // tags.forEach((tag, index) => {
        //     data.append(`itemFilter[${index}]`, tag.text);
        // });
        //parse location as an object of lat and long
        data.append("location", {});
        for (var key in selectedLocation) {
            data.append("location", selectedLocation[key]);
        }
        console.log(selectedLocation);
        console.log(data.get("location"));
        data.append("photo", photo);

        // Submit form data
        try {
            // Simulate API call
            await axios.post('https://httpbin.org/anything', data);
            setIsProcessing(false); // Hide the first popup
            setShowProcessedPopup(true); // Show the second popup
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            setIsProcessing(false); // Ensure the popup is hidden in case of an error
        }
    };
    /*const handleDelete = (i) => {
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
    };*/

    const handleOkClick = () => {
        setShowProcessedPopup(false); // Close the second popup
        navigate('/home'); // Redirect to the home page
    };

    const popupStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        padding: '20px',
        backgroundColor: '#fff',
        border: '2px solid #000',
        display: isProcessing ? 'block' : 'none',
    };

    const processedPopupStyle = {
        ...popupStyle,
        display: showProcessedPopup ? 'block' : 'none', // Controlled by the new state
    };

    function setlocation(location){
        setSelectedLocation(location);
    }

    return (
        <div className="backgroundsettings">
            {/* First Popup */}
            <div style={popupStyle}>
                <h2>Processing...</h2>
                <p>Your submission is being processed. Please wait.</p>
            </div>

            {/* Second Popup */}
            <div style={processedPopupStyle}>
                <h2>Processed Information</h2>
                <p>Your information has been successfully processed.</p>
                <button onClick={handleOkClick}>OK</button>
            </div>
            <div className="LIN-container my-5">
                <h2 className="LIN-heading text-center mb-4">Details of Found Item</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field 
                                  id="name" 
                                  name="name" 
                                  type="text" 
                                  className="form-control LIN-formControl" 
                                  value={name}
                                  onChange={(e) => {setName(e.target.value); setFieldValue('name', e.target.value)}}
                                />
                                <ErrorMessage name="name" component="div" className="LIN-errorMessage" />
                            </div>
                            <GoogleMaps setlocation={setSelectedLocation} /> {/* Render the GoogleMaps component */}

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
                                <Field 
                                  id="description" 
                                  name="description" 
                                  type="text" 
                                  className="form-control LIN-formControl" 
                                  value={description}
                                  onChange={(e) => {setDescription(e.target.value); setFieldValue('description', e.target.value)}}
                                />
                                <ErrorMessage name="description" component="div" className="LIN-errorMessage" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field 
                                  id="email" 
                                  name="email" 
                                  type="text" 
                                  className="form-control LIN-formControl" 
                                  value={email}
                                  onChange={(e) => {setEmail(e.target.value); setFieldValue('email', e.target.value)}}
                                />
                                <ErrorMessage name="email" component="div" className="LIN-errorMessage" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <Field 
                                  id="phone" 
                                  name="phone" 
                                  type="text" 
                                  className="form-control LIN-formControl" 
                                  value={phone}
                                  onChange={(e) => {setPhone(e.target.value); setFieldValue('phone', e.target.value)}}
                                />
                                <ErrorMessage name="phone" component="div" className="LIN-errorMessage" />
                            </div>

                            {/* Commenting out the itemFilter section */}
                            {/* <div className="form-group">
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
                            </div> */}

                            <div className="form-group">
                                <label htmlFor="photo">Photo of Item</label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    onChange={(event) => {
                                        const eventFile = event.target.files[0];
                                        setFieldValue('photo', event.currentTarget.files[0]); // clear validation schema
                                        setPhoto(eventFile); // Set photo to event file                            
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
