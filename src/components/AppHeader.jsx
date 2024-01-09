import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import axiosClient from '../axios'
// import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const newmail = useSelector((state) => state.newmail)
  const user_name = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')
  let navigate = useNavigate()

  const logoutUser = function(e){
    e.preventDefault();
    axiosClient.post('/logout').then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role_id');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        return navigate('/login')
        console.log(res.data);
    })
    .catch(error => {
        // alert(JSON.stringify(error))
        console.log(error.response);
    })
}

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              داشبورد
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/mails" component={NavLink}>
              نامه ها            
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" onClick={(e) => logoutUser(e)}>خروج</CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        <CHeaderNav className="ms-3">
          <div className="p-2">
            <i>سلام </i>{user_name}
          </div>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
