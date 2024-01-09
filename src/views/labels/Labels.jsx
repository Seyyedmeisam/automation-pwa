import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CNav, CNavItem, CNavLink, CRow, CSmartTable } from "@coreui/react-pro";
import { useEffect, useState } from "react";
import CreateLableModal from "./CreateLableModal/CreateLableModal";
import axiosClient from "../../axios";
import Swal from "sweetalert2";
import EditLableModal from "./EditLableModal/EditLableModal";
export default function Labels() {
  const [createLableModalVisible, setCreateLableModalVisible] = useState(false)
  const [editLableModalVisible, setEditLableModalVisible] = useState(false)
  const [editLableModalData, setEditLableModalData] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const columns = [
      {
        key: 'title',
        label: 'نام برچسب',
        _style: { width: '70%' },
      },
      {
        key: 'tools',
        _style: { width: '10%' },
        label: '',
        sorter: false,
        filter: false,
      },
    ]
  const fetchData = () => {
    setLoading(true);
    axiosClient.get('/labels').then(res => {
      setData(res.data);
      setLoading(false);
      // console.log('data  :: ',res);
    })
    .catch((error) => {
        console.log(error);
        });
    }
    useEffect(()=>{
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
    const habdleCreateLabel = (CreateModalData) => {
      // console.log("CreateModalData :: ", CreateModalData);
      axiosClient.post('/labels/',CreateModalData).then(res => {
        // console.log('data  :: ',res);
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data.msg,
        }).then(() => fetchData());
      })
      .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'warning',
            title: 'warning',
            text: error.response.data.msg,
          }).then(() => fetchData());
      });
    }
    const handleDelete = (item) => {
      // console.log(item);
      // console.log('/labels/'+item.id);
      Swal.fire({
        title: "آیا مطمئن هستید",
        text: "تمام اطلاعات این برچسب حذف خواهد شد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6 ",
        cancelButtonText: "خیر",
        confirmButtonText: "حذف شود",
      })
      .then((result) =>{
        if (result.isConfirmed) {
          axiosClient.delete('/labels/'+item.id).then(res => {
            // console.log('data  :: ',res);
            Swal.fire({
              icon: 'success',
              title: 'success',
              text: res.data.msg,
            }).then(() => fetchData());
            
          })
          .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: 'warning',
                title: 'warning',
                text: error.response.data.msg,
              }).then(() => fetchData());
          });
        }
      });
    }
    const openEditLabelModal = (item) =>{
      setEditLableModalVisible(true);
      setEditLableModalData(item)

    }

    const handleEdit = () => {
      axiosClient.patch('/labels/'+editLableModalData.id,editLableModalData).then(res => {
        // console.log('data  :: ',res);
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data.msg,
        }).then(() => fetchData());
        
      })
      .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'warning',
            title: 'warning',
            text: error.response.data.msg,
          }).then(() => fetchData());
      });
    }

    return(
        <>
        
        {createLableModalVisible &&(
            <CreateLableModal
            createLableModalVisible={createLableModalVisible}
            setCreateLableModalVisible={setCreateLableModalVisible}
            habdleCreateLabel={habdleCreateLabel}
            />
        )}
        {editLableModalVisible &&(
          <EditLableModal
            editLableModalVisible={editLableModalVisible}
            setEditLableModalVisible={setEditLableModalVisible}
            editLableModalData={editLableModalData}
            setEditLableModalData={setEditLableModalData}
            handleEdit={handleEdit}
          />
        )}
          

         
            <div className="row justify-content-center mt-5">
                <div className="col-md-12">
                    <div className="card">
                        {/* <CNav variant="pills" layout="fill"> */}
                        <CCard className="text-center">
                        <CCardHeader>
                          
                            <CNav variant="pills" layout="fill" className="card-header-pills">
                              <CNavItem>
                                  <CNavLink>برچسب ها</CNavLink>
                              </CNavItem>
                            </CNav>
                        </CCardHeader>
                        <CCardBody>
                            <CCardTitle></CCardTitle>
                            <CSmartTable
                            
                                columns={columns}
                                columnFilter
                                columnSorter
                                items={data}
                                itemsPerPageSelect
                                itemsPerPage={10}
                                pagination
                                paginationProps={{align : "center"}}
                                tableFilterLabel = {'فیلتر :'}
                                tableFilterPlaceholder={'جستجو'}
                                noItemsLabel = {''}
                                itemsPerPageLabel = {'تعداد نمایش در هر صفحه :'}
                                // loading={loading}
                                scopedColumns={{
                                  tools: (item) => {
                                    return (
                                      <td className="py-2">
                                        <CButton
                                          color="info"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          className="mt-2 mb-2"
                                          onClick={()=> openEditLabelModal(item)}
                                        >
                                          ویرایش
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
                                }}
                            />
                            <CRow className='mt-4 mb-2'>
                              <CCol md='5' className='d-flex justify-content-center'>
                                <CButton color="success" variant="outline" shape="rounded-pill" onClick={()=> setCreateLableModalVisible(true)}>+ ایجاد برچسب</CButton>
                              </CCol>
                            </CRow>
                        </CCardBody>
                        </CCard>
                    </div>
                </div>
            </div>
        </>
    )
}