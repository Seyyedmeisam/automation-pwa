import { CAvatar, CBadge, CButton, CCardBody, CCollapse, CNavLink, CSmartTable } from "@coreui/react-pro";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios";
import Swal from 'sweetalert2';
export default function EditRole() {
    const [user, setUser] = useState({
        id: localStorage.getItem('user_id'),
        role_id: localStorage.getItem('role_id'),
        first_name: localStorage.getItem('first_name'),
        last_name: localStorage.getItem('last_name'),
      });
    const [data,setData] = useState([]);
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false);
    const columns = [
      {
        key: 'avatar',
        label: '',
        filter: false,
        sorter: false,
      },
      {
        key: 'name',
        label: 'نام و نام خانوادگی',
        _style: { width: '30%' },
       
      },
      {
        key:'registered',
        label: 'تاریخ عضویت',
      },
      {
        key: 'role',
        label: 'سمت',
        _style: { width: '30%' }
      },
      // {
      //   key: 'status',
      //   _style: { width: '20%' }
      // },
      {
        key: 'show_details',
        label: '',
        _style: { width: '10%' },
        filter: false,
        sorter: false,
      },
    ]
    const fetchData = () =>{
        setLoading(true);
        axiosClient.post('users/'+user.id).then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch((error) => {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: error.response.data.message || 'There was an error processing your request.',
            });
            });
    }
    useEffect(() => {
        fetchData();
    },[])
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
    const getBadge = (status) => {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          return 'primary'
      }
    }

    const handleDelete = (item) => {
        Swal.fire({
          title: "آیا مطمئن هستید",
          text: "تمام اطلاعات این کاربر حذف خواهد شد",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6 ",
          cancelButtonText: "خیر",
          confirmButtonText: "حذف شود",
        })
        .then((result) =>{

          if (result.isConfirmed) {
            axiosClient.delete('users/'+item.id).then(res => {
              // console.log(res);
              fetchData();
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            });
          })
        .catch((error) => {
          console.log(error);
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: error.response.data.message || 'There was an error processing your request.',
            });
          });
          }
        });
    }
    return (
      <CSmartTable
        activePage={1}
        cleaner
        clickableRows
        columns={columns}
        columnFilter
        columnSorter
        footer
        items={data}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        paginationProps={{align : "center"}}
        tableFilterLabel = {'فیلتر :'}
        tableFilterPlaceholder={'جستجو'}
        noItemsLabel = {''}
        itemsPerPageLabel = {'تعداد نمایش در هر صفحه :'}
        // onFilteredItemsChange={(items) => {
        //   console.log(items)
        // }}
        // onSelectedItemsChange={(items) => {
        //   console.log(items)
        // }}
        scopedColumns={{
          avatar: (item) => (
            <td>
              {/* <CAvatar src={`${import.meta.env.VITE_API_BASE_URL}/${item.profile_picture}`} /> */}
              <CAvatar src={`${import.meta.env.VITE_API_BASE_URL}/${item.profile_picture}`}/>
            </td>
          ),
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          show_details: (item) => {
            return (
              <td className="py-2">
                {/* <CButton size="sm" color="info">
                    User Settings
                  </CButton>
                  <CButton onClick={()=>{setDeleteItemId(item.id);}} size="sm" color="danger" className="ml-1">
                    Delete
                  </CButton> */}
                  <CButton
                    color="info"
                    variant="outline"
                    shape="square"
                    size="sm"
                    className="mt-2 mb-2"
                  >
                    <CNavLink href={`#/Users/editUser/${item.id}`} active>
                      ویرایش
                    </CNavLink>
                  </CButton>
                  <>  </>
                  <CButton
                    color="danger"
                    variant="outline"
                    shape="square"
                    size="sm"
                    className="mt-2 mb-2"
                    onClick={()=> handleDelete(item)}
                  >
                    حذف
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <>

              </>
            )
          },
        }}
        selectable
        sorterValue={{ column: 'status', state: 'asc' }}
        tableFilter
        tableProps={{
          className: 'text-center',
          responsive: true,
          striped: true,
          hover: true,
        }}
        tableBodyProps={{
          className: 'align-middle'
        }}
      />
    )
}
