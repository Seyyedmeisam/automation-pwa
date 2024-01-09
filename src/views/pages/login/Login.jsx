import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axiosClient from '../../../axios'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const axiosClientForLogin = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

const cursorP = {
  cursor: 'pointer',
};

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const [unauthorized, setUnauthorized] = useState('')
  let navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault()
    axiosClientForLogin
      .post('/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('user_id',res.data.user.id);
        localStorage.setItem('role_id',1);
        localStorage.setItem('first_name',res.data.user.first_name);
        localStorage.setItem('last_name',res.data.user.last_name);
        // localStorage.setItem('profile_picture',res.data.user.profile_picture);
        return navigate('/dashboard');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setUnauthorized('نام کاربری یا رمز عبور اشتباه است')
        } else {
          setErrors(error.response.data.errors)
        }
      })
  }

  const isLoggedIn = localStorage.getItem('token') !== null;
  if(isLoggedIn){
    return <Navigate to="/dashboard" />
  }else{
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    {unauthorized ? (
                      <div className="alert alert-danger w-100" role="alert">
                        {unauthorized}
                        <i
                          className="bi bi-x"
                          style={cursorP}
                          onClick={() => setUnauthorized(false)}
                        ></i>
                      </div>
                    ) : (
                      ''
                    )}
                    <CForm onSubmit={handleSubmit}>
                      <h1>ورود</h1>
                      <p className="text-medium-emphasis">
                        {' '}
                        کاربر گرامی برای ورود لطفا ایمیل و رمز عبور خود را وارد کنید
                      </p>
                      <div className='mb-3'>
                        <CInputGroup className="mb-2">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            name="email"
                            placeholder="ایمیل"
                            autoComplete="email"
                            onChange={(e) => {
                              setEmail(e.target.value)
                            }}
                          />
                        </CInputGroup>
                        {errors.email ? (
                          <span className="text-danger font-size-error">{errors.email}</span>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className='mb-3'>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          name="passwor"
                          type="password"
                          placeholder="رمز عبور"
                          autoComplete="current-password"
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                        />
                      </CInputGroup>
                      {errors.password ? (
                        <span className="text-danger font-size-error">{errors.password}</span>
                      ) : (
                        ''
                      )}
                      </div>
                      <CRow>
                        <CCol xs={6}>
                          <CButton type="submit" color="primary" className="px-4">
                            ورود
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          {/* <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton> */}
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
  }


export default Login
