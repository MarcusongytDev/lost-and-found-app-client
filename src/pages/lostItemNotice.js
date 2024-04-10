import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lostItemNotice.css';
import { useAuth } from '../context/AuthContext';
import GoogleMaps from '../components/API/GoogleMapsFinder'; // Import the GoogleMaps component

function LostItemNotice() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false); // Add a state to track processing
    const [showProcessedPopup, setShowProcessedPopup] = useState(false); // New state for the second popup

    const [selectedLocation, setSelectedLocation] = useState({});
    const [name, setName] = useState('');
    const [itemName, setItemName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    const initialValues = {
        name: '',
        itemName: '',
        email: '',
        phoneNumber: '',
        location: '',
        description: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        itemName: Yup.string().required('Item name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Must be a valid phone number').required('Phone number is required'),
        description: Yup.string().required('Description is required'),
        photo: Yup.mixed().required('Photo of item is required')
    });

    //useEffect(() => {
     //  if (!user) {
    //    navigate('/loginPage');
     //   }
   // }, [user, navigate]);

    const onSubmit = async (values) => {
        setIsProcessing(true); // Start processing
        const data = new FormData();
        data.append('name', name);
        data.append('itemName', itemName);
        data.append('email', email);
        data.append('phoneNumber', phoneNumber);
        data.append('description', description);
        data.append("location", {});
        for (var key in selectedLocation) {
            data.append("location", selectedLocation[key]);
        }
        console.log(data.get("location"));
        data.append('photo', photo);

        try {
            await axios.post('http://localhost:5000/post-lost-item-notice', data);
            setIsProcessing(false); // Hide the first popup
            setShowProcessedPopup(true); // Show the second popup
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            setIsProcessing(false); // Ensure we handle errors gracefully
        }
    };

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
        backgroundColor: '#fff', // White background
        border: '2px solid #000', // Black border, adjust thickness as needed
        display: isProcessing ? 'block' : 'none', // Controlled by isProcessing state
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional: adds a subtle shadow for depth
        borderRadius: '10px', // Optional: rounds the corners for a softer look
    };

    const processedPopupStyle = {
        ...popupStyle,
        display: showProcessedPopup ? 'block' : 'none', // Controlled by the new state
    };

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
                <h2 className="LIN-heading text-center mb-4">Report a Lost Item</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-control LIN-formControl"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setFieldValue('name', e.target.value) }}
                                />
                                <ErrorMessage name="name" component="div" className="LIN-errorMessage" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="itemName">Lost Item Name</label>
                                <Field
                                    id="itemName"
                                    name="itemName"
                                    type="text"
                                    className="form-control LIN-formControl"
                                    value={itemName}
                                    onChange={(e) => { setItemName(e.target.value); setFieldValue('itemName', e.target.value) }}
                                />
                                <ErrorMessage name="itemName" component="div" className="LIN-errorMessage" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lostLocation">Lost Item Location:</label>
                                <GoogleMaps setlocation={setSelectedLocation} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control LIN-formControl"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setFieldValue('email', e.target.value) }}
                                />
                                <ErrorMessage name="email" component="div" className="LIN-errorMessage" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <Field
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    className="form-control LIN-formControl"
                                    value={phoneNumber}
                                    onChange={(e) => { setPhoneNumber(e.target.value); setFieldValue('phoneNumber', e.target.value) }}
                                />
                                <ErrorMessage name="phoneNumber" component="div" className="LIN-errorMessage" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Field
                                    id="description"
                                    name="description"
                                    as="textarea"
                                    className="form-control LIN-formControl"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value); setFieldValue('description', e.target.value) }}
                                />
                                <ErrorMessage name="description" component="div" className="LIN-errorMessage" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="photo">Photo of Item</label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    onChange={(event) => {
                                        const eventFile = event.target.files[0];
                                        setFieldValue('photo', event.currentTarget.files[0]);
                                        setPhoto(eventFile);
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

export default LostItemNotice;
