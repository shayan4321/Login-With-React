import React, { useState } from 'react'
import {Toaster} from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import {useFormik} from 'formik';
import  { profileValidation } from '../helper/validate';
import avatar from '../assets/profile.png';
import convertToBase64 from '../helper/convert';

const Profile = () => {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues : {
      firstName : '',
      lastName:'',
      email:  'admin54321@gmail.com',
      mobile:  '0333-1111111',
      address : 'ABC-123'
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
     
    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={`${styles.glass} ${extend.glass}`}  style={{ width: "45%", paddingTop: '1em'}}>

        <div className="title flex flex-col items-center">
          <h4 className='text-4xl font-bold'>Profile</h4>
          <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
              You can update the details.
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-2'>
                <label htmlFor="profile">
                  <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}`}  alt="avatar" />
                </label>
                
                <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-3">
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.profile_img}`} type="text" placeholder='FirstName' />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Mobile No.' />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
              </div>

             
                <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
                <button className={styles.btn} type='submit'>Update</button>
             
                
            </div>

            <div className="text-center py-3">
              <span className='text-gray-500'>come back later? <button className='text-red-500' to="/">Logout</button></span>
            </div>

        </form>

      </div>
    </div>
  </div>
  )
}

export default Profile
