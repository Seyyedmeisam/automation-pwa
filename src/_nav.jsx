import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilDescription,
  cilSpeedometer,
  cilUser,
  cilPeople,
  cilEnvelopeLetter
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import test from './views/Test/test'

const _nav = [
  {
    component: CNavItem,
    name: 'داشبورد',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavTitle,
  //   name: 'مدیریت',
  // },
  {
    component: CNavGroup,
    name: 'کاربران',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'مدیریت کاربر',
        to: '/Users/manageUsers'
      },
      {
        component: CNavItem,
        name: 'ایجاد کاربر',
        to: '/Users/addUser'
      }
    ]
  },

  {
    component: CNavGroup,
    name: 'نقش ها',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ایجاد نقش',
        to: '/createRole'
      },
      {
        component: CNavItem,
        name: 'مدیریت نقش',
        to: '/editRole'
      }
    ]
  },
  // {
  //   component: CNavTitle,
  //   name: 'کارتابل',
  // },
  {
    component: CNavGroup,
    name: 'پیام های من',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'نامه ها',
        to: '/mails'
      },
      {
        component: CNavItem,
        name: 'ارجاعات',
        to: '/references'
      },
      {
        component: CNavItem,
        name: 'برچسب ها',
        to: '/labels'
      }
    ]
  },
]

export default _nav
