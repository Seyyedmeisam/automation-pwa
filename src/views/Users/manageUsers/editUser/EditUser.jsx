import React, { useEffect, useState } from 'react'
import axiosClient from '../../../../axios'
import Swal from 'sweetalert2'
import { CDatePicker, CDateRangePicker, CFormInput, CFormLabel, CSpinner } from '@coreui/react-pro'
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from "react-router-dom";
import moment from 'moment';
export default function EditUser() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [singatureExists, setSingatureExists] = useState(true);
  const [profilePictureExists, setProfilePictureExists] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    father_name: '',
    national_code: '',
    gender: 'male',
    birth_date: '',
    certificate_number: '',
    certificate_serial: '',
    certificate_date: '',
    certificate_place: '',
    education_level: '',
    phone: '',
    email: '',
    telephone: '',
    telephone_extension: '',
    postal_codes: '',
    address: '',
    signature: '',
    profile_picture: '',
  })
  const { id } = useParams();
  const [birthDate, setBirthDate] = useState(moment(new Date()).format('YYYY/MM/DD'));
  let navigate = useNavigate();
  // console.log('id :: ',id);
  const fetchData = ()=>{
    axiosClient
      .get('users/'+id)
      .then((res) => {
        console.log(res);
        setFormData(res.data)
        // console.log(formData)
        setLoading(false);
        setSingatureExists(true);
        setProfilePictureExists(true);
      })
      .catch((error) => {
        // setLoading(false);
        console.log(error.response)
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: error.response.data.msg || 'There was an error processing your request.',
        }).then(() => {
          navigate('/Users/manageUsers');
        });
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'درحال پردازش ... ',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);
  const handleSubmit = function (e) {
    e.preventDefault()
    const formDataToSend = new FormData();
    if(birthDate != null && birthDate != '')
      formDataToSend.append('birth_date',moment(birthDate).format('YYYY/MM/DD'));
    Object.entries(formData).forEach(([fieldID, fieldValue]) => {
      // let newfieldValue = '';
      if (fieldValue != null && fieldValue != ''){
        formDataToSend.append(fieldID, fieldValue);
      }
      // console.log([fieldID, fieldValue]);
    });
    axiosClient
      .post("users/"+id, formDataToSend,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'PUT',
        },})
      .then((res) => {
        fetchData()
        // console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.msg,
        })
        // console.log(res)
      })
      .catch((error) => {
        console.log(error.response)
        if (error.response.status == 422)
          Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: error.response.data.message || 'There was an error processing your request.',
          })
      })
  }
  const handleUploadFile = (file, id) =>{
    console.log(file);
    console.log(' id :: ',id )
    const formData = new FormData();
    formData.append('file', file);
    axiosClient.post('/uploadFile',formData).then(res => {
        console.log(' uploadFile :: ',res.data )

        setFormData((prevState) => ({
            ...prevState,
            [id]: res.data,
          }));
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: error.response.data.message,
        });
        });
}

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    let newValue = value;

    if (type === 'file') {
      const file = e.target.files[0]; 
        if(file)
          handleUploadFile(file, id) 
    }else{
      setFormData((prevData) => ({
        ...prevData,
        [id]: newValue,
      }));
    }
  };
  // console.log();
  return (

  <div className="container-xl p-5 ml-1 rounded">
    <form onSubmit={handleSubmit} className="border p-4" encType="multipart/form-data">
      <div className="row text-center bg-light">
        <h3>فرم ویرایش کاربر</h3>
      </div>
      <br />
      <div className="row">
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="username">
            نام کاربری :
          </label>
          <input
            value={formData['username'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="username"
          />
          {errors.username ? (
            <span className="text-danger font-size-error">{errors.username}</span>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="name">
            نام :
          </label>
          <input
            value={formData['first_name'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="first_name"
          />
        </div>
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="last_name">
            نام خانوادگی :
          </label>
          <input
            value={formData['last_name'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="last_name"
          />
        </div>
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="father_name">
            نام پدر :
          </label>
          <input
            value={formData['father_name'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="father_name"
          />
        </div>
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="national_code">
            {' '}
            کد ملی :
          </label>
          <input
            value={formData['national_code'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="national_code"
          />
        </div>
        <div className="form-group col-md-1 mt-3">
          <label className="text-nowrap" htmlFor="gender">
            جنسیت :
          </label>
          <select onChange={handleChange} className="form-select form-select-sm" id="gender">
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
        </div>
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="birth_day">
            تاریخ تولد :
          </label>

          <CDatePicker
            firstDayOfWeek={6}
            date={birthDate}
            placeholder=""
            onStartDateChange={setBirthDate}
            locale="fa-IR"
            size="sm"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="certificate_number">
            شماره شناسنامه :
          </label>
          <input
            value={formData['certificate_number'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="certificate_number"
          />
        </div>
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="certificate_serial">
            سریال شناسنامه :
          </label>
          <input
            value={formData['certificate_serial'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="certificate_serial"
          />
        </div>
        <div className="form-group col-md-3 mt-3">
          <label className="text-nowrap" htmlFor="education_level">
            مدرک تحصیلی :
          </label>
          <input
            value={formData['education_level'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="education_level"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="mobile">
            تلفن همراه :
          </label>
          <input
            value={formData['phone'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="phone"
          />
        </div>
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="email">
            ایمیل :
          </label>
          <input
            value={formData['email'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="email"
          />
          {errors.email ? (
            <span className="text-danger font-size-error">{errors.email}</span>
          ) : (
            ''
          )}
        </div>
        <div className="form-group col-md-2 mt-3 ml-0">
          <label className="text-nowrap" htmlFor="telephone">
            تلفن :
          </label>
          <input
            value={formData['telephone'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="telephone"
          />
        </div>
        <div className="form-group col-md-1 mt-5 text-center">-</div>
        <div className="form-group col-md-1 mt-3">
          <label className="text-nowrap" htmlFor="telephone_extension"></label>
          <input
            value={formData['telephone_extension'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="telephone_extension"
          />
        </div>
        <div className="form-group col-md-2 mt-3">
          <label className="text-nowrap" htmlFor="postal_codes">
            کدپستی :
          </label>
          <input
            value={formData['postal_codes'] || ''}
            onChange={handleChange}
            type="text"
            className="form-control "
            id="postal_codes"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-12 mt-3">
          <label className="text-nowrap" htmlFor="address">
            آدرس :
          </label>
          <textarea
            value={formData['address'] || ''}
            onChange={handleChange}
            rows="3"
            className="form-control row-3"
            id="address"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-3 mt-3">
          <CFormLabel htmlFor="formFile">امضا :</CFormLabel>
          <CFormInput
            type="file"
            onChange={handleChange}
            accept=".pdf, .jpg, .jpeg, .png"
            id="signature"
          />
          {formData.signature != '' && (
            <a  href={`${import.meta.env.VITE_API_BASE_URL}/${formData.signature}`} target="_blank" rel="noopener noreferrer">
              <img className='m-3 border border-dark' src={`${import.meta.env.VITE_API_BASE_URL}/${formData.signature}`} height="100px" alt="Preview" />
            </a>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-3 mt-3">
          <CFormLabel htmlFor="formFile">عکس پروفایل :</CFormLabel>
          <CFormInput
            type="file"
            onChange={handleChange}
            accept=".pdf, .jpg, .jpeg, .png"
            id="profile_picture"
          />

        </div>
        {formData.profile_picture != '' && (
          <a  href={`${import.meta.env.VITE_API_BASE_URL}/${formData.profile_picture}`} target="_blank" rel="noopener noreferrer">
            <img className='m-3 border border-dark' src={`${import.meta.env.VITE_API_BASE_URL}/${formData.profile_picture}`} height="100px" alt="Preview" />
          </a>
        )}
      </div>
      <div className="row justify-content-center">
        <button type="submit" className="btn btn-success col-md-2 mt-3 center">
          ویرایش کاربر
        </button>
      </div>
    </form>
  </div>
  )
}
