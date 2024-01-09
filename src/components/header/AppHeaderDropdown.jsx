import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'
import avatar8 from './../../assets/images/avatars/8.jpg'
import axiosClient from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { CNavLink } from '@coreui/react-pro'


const AppHeaderDropdown = () => {
  const [user, setUser] = useState({
    id: localStorage.getItem('user_id'),
    role_id: localStorage.getItem('role_id'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('last_name'),
  });
  const [profilePicture, setProfilePicture] = useState();
  const dispatch = useDispatch()
  const unreadMailNotification = useSelector((state) => state.unreadMailNotification)
  const unreadRefrenceNotification = useSelector((state) => state.unreadRefrenceNotification)
  const getProfilePicture = () =>{
    axiosClient.post("profile_picture/"+user.id)
    .then((res) => {
      // console.log("res :: ",res);
      setProfilePicture(res.data);
    })
    .catch((error) => {
      if(error.response.status == 422)
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: error.response.data.message || 'There was an error processing your request.',
        });
    })
  }
  const getUnreadMailNotification = () =>{
    axiosClient.post("notifications/")
    .then((res) => {
      dispatch({ type: 'set', unreadMailNotification: res.data.mails })
      dispatch({ type: 'set', unreadRefrenceNotification: res.data.reference })
    })
    .catch((error) => {
      if(error.response.status == 422)
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: error.response.data.message || 'There was an error processing your request.',
        });
    })
  }
  useEffect(()=>{
    getProfilePicture();
    getUnreadMailNotification();
  },[])
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {profilePicture &&(
          <CAvatar src={`${import.meta.env.VITE_API_BASE_URL}/${profilePicture}`} size="md" />
        )}
        
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">اعلان ها</CDropdownHeader>
        <CDropdownItem href="#/mails">
            <CIcon icon={cilEnvelopeOpen} className="me-2" />
                نامه ها            
            <CBadge color="success" className="ms-2">
              {unreadMailNotification}
            </CBadge>
        </CDropdownItem>

        <CDropdownItem href="#/references">
            <CIcon icon={cilFile} className="me-2" />
            ارجاعات
            <CBadge color="danger" className="ms-2">
              {unreadRefrenceNotification}
            </CBadge>
        </CDropdownItem>
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">تنظیمات</CDropdownHeader>
        <CDropdownItem href={`#/Users/editUser/${user.id}`}>
          <CIcon icon={cilUser} className="me-2" />
          پروفایل
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          تنظیمات
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
