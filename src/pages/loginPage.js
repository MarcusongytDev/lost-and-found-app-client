import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './loginPage.css'; // Custom styles for the form
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../pages/firebase';
import {useEffect} from 'react';
import {UserAuth} from '../context/AuthContext'


function LoginPage() {
  
  const navigate = useNavigate();

  const handleItemMap = () => {
    navigate('/lostItemMap');
  };

  const {googleSignIn, user} = UserAuth();

  const handleGoogle = async () => { 
    try{  
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(user !=null){
      navigate('/loginPage');
    }
  }, [user]);



  const initialValues = {

    email: '',
    password: '',

  };

  const validationSchema = Yup.object({
   
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  
  });

  const onSubmit = data => {
    axios.post('http://localhost:5000/lostitems', data)
      .then(() => navigate('/home'))
      .catch(error => console.error('There was an error submitting the form:', error));
  };


  return (
     <body className='backgroundsettings'>
       <div className="boxlogin my-5 Login">
         <h1 className="text-center2 mb-4">Login</h1>
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
           <Form>
             <div className="form-group row">
               <div className="col-md-3">
                 <label htmlFor="email" className="custom-label1">Email</label>
               </div>
               <div className="col-md-6">
                 <Field name="email" type="email" className="form-control custom-input1" placeholder="Email" />
                 <ErrorMessage name="email" component="div" className="error-message" />
               </div>
             </div>
             <div className="form-group row">
               <div className="col-md-3">
                 <label htmlFor="password" className="custom-label1">Password</label>
               </div>
               <div className="col-md-6">
                 <Field name="password" type="password" className="form-control custom-input1" placeholder="Password" />
                 <ErrorMessage name="password" component="div" className="error-message" />
               </div>
             </div>
             <button type="submit" className="loginbtn1" onClick={handleItemMap} >Login</button>
             <div>
             <h2 className="Or">OR</h2>
             </div>
             <button onClick={handleGoogle} className="Sign-In-w-G" >Sign In With Google </button>
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

export default LoginPage