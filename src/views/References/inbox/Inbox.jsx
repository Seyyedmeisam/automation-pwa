import React from 'react';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import ShowReferencesModal from './ShowReferencesModal/ShowReferencesModal';
import axiosClient from "../../../axios";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import moment from 'jalali-moment';
import { CButton, CCol, CCollapse, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CMultiSelect, CPagination, CPaginationItem, CRow, CSmartPagination } from '@coreui/react-pro'; 
function Inbox({
    user,
    tab,
    data,
    page,
    setPage,
    maxPage,
    fetchData,
    loading,
    setLoading,
    filterData,
    setFilterData
}) {
    const dispatch = useDispatch()
    const unreadRefrenceNotification = useSelector((state) => state.unreadRefrenceNotification)
    // const user = useSelector((state) => state.user);
    const [showReferencesModal, setShowReferencesModal] = useState(false);
    const [referencesModalData, setReferencesModalData] = useState({});
    const [allowedPersons, setAllowedPersons] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false) // for Filters
    const [filterFields, setFilterFields] = useState({}); // for Filters
    const [senderPersons,setSenderPersons] = useState([]) // for Filters
    const [reciverPersons,setReciverPersons] = useState([]) // for Filters
    const [selectedPersons,setSelectedPersons] = useState([]) // for Filters

    useEffect(()=>{
        setFilterFields(filterData);
    },[])
    useEffect(()=>{
        if(filterVisible){
            if(senderPersons.length == 0)
                getSenderPersons();
            if(reciverPersons.length == 0)
                getReciverPersons();
        }
    },[filterVisible])
    const getAllowedPersons = (setModalData) =>{
        axiosClient.post('/mail/allowedPersons/'+ user.id).then(res => {
            // console.log(res.data);
            setAllowedPersons(res.data);
            setModalData(true);

        })
        .catch((error) => {
            console.log(error);
            });
    }
    const getSenderPersons = () =>{
        axiosClient.post('/reference/senderPersons/'+user.id).then(res => {
            // console.log(' senderPersons :: ',res.data )
            setSenderPersons(res.data.map(item => ({
                value: item.id,
                text: `${item.first_name} ${item.last_name}`
              })));
        })
        .catch((error) => {
            console.log(error.response);
            });
    }
    const getReciverPersons = () =>{
        axiosClient.post('/reference/reciverPersons/'+user.id).then(res => {
            // console.log(' reciverPersons :: ',res.data )
            setReciverPersons(res.data.map(item => ({
                value: item.id,
                text: `${item.first_name} ${item.last_name}`
              })));
        })
        .catch((error) => {
            console.log(error);
            });
    }

    const handleUploadFile = (file, data, setData) =>{
        const filesArray = data.files ? [...data.files] : [];
        const formData = new FormData();
        formData.append('file', file);
        axiosClient.post('/uploadFile',formData).then(res => {
            filesArray[filesArray.length] = res.data;
            setData((prevState) => ({
                ...prevState,
                files: filesArray,
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
    
    const openReferencesModal = () => {
        if(tab == 'recive'){
            getAllowedPersons(setShowReferencesModal)
        } else
            setShowReferencesModal(true);
    };

    const closeReferencesModal = () => {
        setShowReferencesModal(false);
    };

    const handleTitleClick = (node, tab) => {
        axiosClient.post('/reference/mailReference/'+ node.mail_id).then(res => {
            // console.log('mailReference :: ',res.data);
            setReferencesModalData(res.data);
            openReferencesModal();
        })
        .catch((error) => {
            console.log(error.response);
            });
        
        
        if(tab == 'recive' && node.status == 0){
            axiosClient.post('/reference/update/'+ node.id).then(res => {
                fetchData();
                dispatch({ type: 'set', unreadRefrenceNotification: unreadRefrenceNotification-1 })
            })
            .catch((error) => {
                console.log(error.response);
                });
        }
    }

    const handleRefrence = () => {
        console.log('referencesModalData :: ',referencesModalData);
        if((referencesModalData.recive_id && referencesModalData.description)){
            const formData = new FormData();
            Object.entries(referencesModalData).forEach(([key, value]) => {
                if (key === 'files' && Array.isArray(value)) {
                    value.forEach((file, index) => {
                        formData.append(`files[${index}]`, file);
                    });
                }   else if(key == 'recive_id' || key == 'mail_id' || key == 'description') {
                    formData.append(key, value);
                }
            });
            
        formData.append('mail_id', referencesModalData.mail.id);
        console.log('formData :: ',formData);
        axiosClient.post('reference/store/'+user.id, formData).then(res => {
            // console.log(res);
            if (res.data == "خطا")
            {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: "نامه قبلا ارجاع داده شده",
                  });
            }
            else{
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: res.data.msg,
              }).then(() => closeReferencesModal());
            }
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message,
              });
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "فیلد های ارجاع اجباری هستند",
              });
        }
        fetchData()
    }
    const handleStyle = (tab, status) =>{
        let style = '';
        if(tab === 'send')
            style='table-secondary pointer'; 
        else if (status==1)
            style='table-secondary pointer'; 
        else
            style='pointer';
    
        return style;
    }
    const handleFinish = (mail_id) => {
        const formDataToSend = new FormData();
        formDataToSend.append('mail_id',mail_id);
        axiosClient.post('/reference/isFinished/'+user.id, formDataToSend).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: res.data.msg,
              }).then(() => closeReferencesModal());
        }).catch((error) => {
            Swal.fire({
                icon: 'danger',
                title: 'danger',
                text: res.response.data.msg,
              });
        });
        fetchData
    }
    
    const handleFilterFields = (e)=>{
        const {name, value} = e.target;
        setFilterFields((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleFilter = ()=>{
        setLoading(true);
        const updatedFilterData = {};
        let personsArray = [];
        if(selectedPersons.length != 0){
            selectedPersons.forEach((value) => {
                personsArray.push(value.value);
            });
        }
        Object.entries(filterFields).forEach(([key, value]) => {
            if (value !== '') {
              updatedFilterData[key] = value;
            }
        });
        if (personsArray.length !== 0) {
            updatedFilterData.id = personsArray;
        }
        setFilterData({
            ...updatedFilterData
          });
    }
    return (
    <>
     <div
        aria-label="Toolbar with Button groups"
      >
        <CRow >   
            <CCol md="1"></CCol>
            <CCol md="1" className='d-flex justify-content-center'>  
                <CButton color="warning" shape="rounded-pill" {...(filterVisible ? {} : { variant: 'outline' })}  onClick={() => setFilterVisible(!filterVisible)}>فیلتر</CButton>
            </CCol>
        </CRow>
        <CCollapse visible={filterVisible}>
            <CRow className='mt-3'>
                <CCol md="1"/>
                <CCol md="4">
                <CInputGroup className="mb-4 flex-nowrap">
                    <CInputGroupText id="filter_text" >متن</CInputGroupText>
                    <CFormInput name="text" value={(filterFields?.text?.length ?? 0) !== 0 ? filterFields.text : ''} onChange={handleFilterFields}/>
                </CInputGroup>
                </CCol>
                <CCol md="1"></CCol>
                <CCol md="3">
                    <CInputGroup className="mb-4 flex-nowrap">
                        <CInputGroupText id="filter_name">{tab=='recive' ? 'فرستنده' : 'دریافت کننده'}</CInputGroupText>
                        <CMultiSelect name='name' 
                        options={tab=='recive' ? reciverPersons : senderPersons }
                        onChange={setSelectedPersons}
                        placeholder="جستجو کنید"
                        selectAllLabel="انتخاب همه"
                        virtualScroller
                        />
                    </CInputGroup>    
                </CCol>
            </CRow>


            <CRow className='mt-3'>
                <CCol md="1"></CCol>
                <CCol md="3">
                    <CInputGroup className="mb-4 flex-nowrap">
                        <CInputGroupText>وضعیت خوانده شده</CInputGroupText>
                        <CFormSelect 
                            onChange={handleFilterFields}
                            name="status"
                            value={(filterFields?.status?.length ?? 0) !== 0 ? filterFields.status : ''}
                            options={[
                                { label: '-', value: '' },
                                { label: 'مشاهده شده ها', value: '1' },
                                { label: 'مشاهده نشده ها', value: '0'}
                            ]}
                        />
                    </CInputGroup>
                </CCol>
                <CCol md="1"></CCol>
                <CCol md="2">
                    <CInputGroup className="mb-4 flex-nowrap">
                        <CInputGroupText id="filter_files">پیوست</CInputGroupText>
                        <CFormSelect 
                            onChange={handleFilterFields}
                            name="files"
                            value={(filterFields?.files?.length ?? 0) !== 0 ? filterFields.files : ''}
                            options={[
                                { label: '-', value: '' },
                                { label: 'دارد', value: '1' },
                                { label: 'ندارد', value: '0'}
                            ]}
                        />
                    </CInputGroup>
                </CCol>
            </CRow>
            <CRow className='mt-3'>
                <CCol md="5"/>
                <CCol md="3" className='d-flex justify-content-center'>
                    <CButton color="primary" shape="rounded-pill" className="text-nowrap" onClick={handleFilter} size="sm">اعمال فیلتر</CButton>
                </CCol>
                <CCol md="1"/>
            </CRow>
        </CCollapse>
    </div>
    <br/>
    <Table responsive className='text-center'>
      <thead>
        <tr className='col-1'>
          <th className='text-center col-4 font-weight-bold'>شماره ارجاع</th>
          <th className='text-center col-4 font-weight-bold'>تاریخ</th>
          {tab == "recive" ?(
          <th className='text-center col-4 font-weight-bold'>فرستنده</th>
            ):(
                <th className='text-center col-4 font-weight-bold'>گیرنده</th>

            )
        }
        </tr>
      </thead>
      <tbody>
      {data && (data.map((node) => (
        <tr onClick={() => handleTitleClick(node, tab)} key={node.id} className={handleStyle(tab, node.status)}>
            <td ><p className="link-dark pointer">{node.id}</p></td>
            <td>{moment(node.created_at, 'YYYY-MM-DD HH:mm:ss').locale('fa').format('dddd D MMMM HH:mm YYYY')}</td>
            {tab === 'recive' ?(
            <td>{node.user.first_name+' '+node.user.last_name+' - '+node.user.role.title}</td>):
            (<td>{node.recive_user.first_name+' '+node.recive_user.last_name+' - '+node.recive_user.role.title}</td>)}
        </tr>
        )))}

      </tbody>
    </Table>
    <div className="col-3 d-flex justify-content-center">
        {showReferencesModal &&(
            <ShowReferencesModal
            referencesModalData={referencesModalData}
            setReferencesModalData={setReferencesModalData}
            showReferencesModal={showReferencesModal}
            closeReferencesModal={closeReferencesModal}
            allowedPersons={allowedPersons}
            handleRefrence={handleRefrence}
            tab={tab}
            handleFinish={handleFinish}
            user={user}
            handleUploadFile={handleUploadFile}
            />
        )}
    </div>
    {/* <div className="col-1user_id d-flex justify-content-center">
        <ButtonGroup aria-label="Basic example " style={{marginBottom:"3px"}}>
            <Button variant="secondary" onClick={handleNextPage} active>بعدی</Button>
            <Button variant="secondary" active>{page}</Button>
            <Button variant="secondary" onClick={handlePrePage} active>قبلی</Button>
        </ButtonGroup>
    </div> */}
    {/* <CPagination className='pointer' align="center">
        {renderPage()}
    </CPagination> */}
    <CSmartPagination align="center" activePage={page} pages={maxPage} onActivePageChange={setPage} />
    </>
    );
}

export default Inbox;
