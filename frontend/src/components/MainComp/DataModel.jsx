import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataModel = (props) => {
    const {fectchData, showModal,setShowModal} = props
  const navigate = useNavigate()
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [] 
  });

  const [error, setError] = useState({});
  const [image, setImage] = useState(null);

  const {
    name,
    email,
    mobile,
    designation,
    gender,
    course
  } = formData;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle checkboxes
      setFormData(prevData => ({
        ...prevData,
        [name]: checked ? [...prevData[name], value] : prevData[name].filter(item => item !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationError = {};

    if (name === "") {
      validationError.name = "Name is required";
    }

    if (!image) {
      validationError.image = "Image URL is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      validationError.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationError.email = "Invalid email format";
    }

    if ( !/^[0-9]{10}$/.test(mobile)) {
      validationError.mobile = "Mobile number must be 10 digits";
    }

    if (designation === "") {
      validationError.designation = "Designation is required";
    }

    if (gender === "") {
      validationError.gender = "Gender is required";
    }

    if (course.length === 0) {
      validationError.course = "At least one course must be selected";
    }

    setError(validationError);

    if (Object.keys(validationError).length === 0) {
        const form = new FormData();
        form.append('image', image);
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('mobile', formData.mobile);
        form.append('designation', formData.designation);
        form.append('gender', formData.gender);
        form.append('course', formData.course);
    
        try {
          await axios.post('/api/employee', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },withCredentials: true
          });
          alert('Upload successful');
          await fectchData()
          setFormData({
            name: "",
            email: "",
            mobile: "",
            designation: "",
            gender: "",
            course: [] 
          })
          setShowModal(!showModal)
         return navigate("/")
          
        } catch (error) {
          console.error('Error uploading image:', error);
          alert(error.response.data.error)
        }
    }
  };
  let modalStatus = showModal?"block":"hidden"
  return (
    <div className={`w-full h-full flex align-middle justify-center backdrop-blur-sm top-0 absolute ${modalStatus}`}>
      <form className='md:w-1/3 sm:w-1/2 lg:w-1/4 h-fit flex flex-col gap-3 border mt-8 shadow-lg rounded-md p-5 bg-gray-50'>
        <legend className='font-extrabold text-3xl'>Submit Your Details</legend>

        
        <section className='form-group'>
          <div>
            <div className="error-field">{error.name && <p className='errordata text-red-600 text-xs'>*{error.name}</p>}</div>
            <input className='inp' type="text" name="name" value={name} placeholder='Enter name' onChange={onChangeHandler} />
          </div>
        </section>

        
        <section className='form-group'>
          <div>
            <div className="error-field">{error.image && <p className='errordata text-red-600 text-xs'>*{error.image}</p>}</div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </section>

       
        <section className='form-group'>
          <div>
            <div className="error-field">{error.email && <p className='errordata text-red-600 text-xs'>*{error.email}</p>}</div>
            <input className='inp' type="email" name="email" value={email} placeholder='Enter email' onChange={onChangeHandler} />
          </div>
        </section>

        
        <section className='form-group'>
          <div>
            <div className="error-field">{error.mobile && <p className='errordata text-red-600 text-xs'>*{error.mobile}</p>}</div>
            <input className='inp' type="text" name="mobile" value={mobile} placeholder='Enter mobile number' onChange={onChangeHandler} />
          </div>
        </section>

       
        <section className='form-group'>
          <label>Designation</label>
          <div>
            <div className="error-field">{error.designation && <p className='errordata text-red-600 text-xs'>*{error.designation}</p>}</div>
            <select className='inp' name="designation" value={designation} onChange={onChangeHandler}>
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </section>

        
        <section className='form-group'>
          <div>
            <div className="error-field">{error.gender && <p className='errordata text-red-600 text-xs'>*{error.gender}</p>}</div>
            <div className='flex gap-4'>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={onChangeHandler}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={onChangeHandler}
                />
                Female
              </label>
            </div>
          </div>
        </section>

        
        <section className='form-group'>
          <div>
            <div className="error-field">{error.course && <p className='errordata text-red-600 text-xs'>*{error.course}</p>}</div>
            <div className='flex gap-4'>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={course.includes("MCA")}
                  onChange={onChangeHandler}
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={course.includes("BCA")}
                  onChange={onChangeHandler}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={course.includes("BSC")}
                  onChange={onChangeHandler}
                />
                BSC
              </label>
            </div>
          </div>
        </section>

       
        <section className='form-group flex justify-around'>
          <button className='btn btn-blue' onClick={submitHandler}>Submit</button>
          <button className='btn btn-white' onClick={(e)=>{e.preventDefault();setFormData({
            name: "",
            email: "",
            mobile: "",
            designation: "",
            gender: "",
            course: [] 
          }); return setShowModal(!showModal)}}>Close</button>
        </section>
      </form>
    </div>
  );
};

export default DataModel;
