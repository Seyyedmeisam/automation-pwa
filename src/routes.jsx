import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// const Test = React.lazy(() => import('./views/Test/test'));

// Manage Users
const AddUser = React.lazy(() => import('./views/Users/addUser/AddUser'))
const ManageUsers = React.lazy(() => import('./views/Users/manageUsers/ManageUsers'))
const editUser = React.lazy(() => import('./views/Users/manageUsers/editUser/EditUser'))
// Roles
const CreateRole = React.lazy(() => import('./views/Role/CreateRole'))
const EditRole = React.lazy(() => import('./views/Role/EditRole'))
// Mails
const Mails = React.lazy(() => import('./views/mails/Mails'))
// References
const References = React.lazy(() => import('./views/references/References'))
// Labels
const Labels = React.lazy(() => import('./views/labels/Labels'))
// const T = React.lazy(() => import('./views/t/T'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/test' , name: 'Test', element: Test},
  { path: '/createRole' , name :'createRole',element: CreateRole},
  { path: '/editRole', name: 'editRole',element: EditRole},
  { path: '/Users/addUser', name: 'addUser',element: AddUser},
  { path: '/Users/manageUsers', name: 'addUser',element: ManageUsers},
  { path: '/Users/editUser/:id',name: 'editUser',element: editUser},
  { path: '/mails', name:'mail' , element: Mails},
  { path: '/references', name:'References' , element: References},
  { path: '/labels', name:'Labels' , element: Labels},
  // {path: '/t' ,name: 't', element: T}

]

export default routes
