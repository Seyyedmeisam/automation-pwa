import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import CreateMailModal from './CreateMailModal/CreateMailModal';
import ShowMailModal from './ShowMailModal/ShowMailModal';
import axiosClient from "../../../axios";
import Swal from 'sweetalert2';
import moment from 'jalali-moment';
import { CRow, CLoadingButton, CSmartPagination, CButton, CCollapse, CFormInput, CCol, CInputGroup, CInputGroupText, CFormSelect, CMultiSelect} from '@coreui/react-pro'; 
import { useDispatch, useSelector } from 'react-redux';
function Inbox({
    user,
    tab,
    data,
    setData,
    page,
    setPage,
    setMaxPage,
    maxPage,
    fetchData,
    setLoading,
    filterData,
    setFilterData
}) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showMailModal, setShowMailModal] = useState(false);
    const [mailModalData, setMailModalData] = useState({
        title: '',
        description: '',
      });
    const [mailModalParaphData, setMailModalParaphData] = useState();
    const [mailModalRefrenceData, setMailModalRefrenceData] = useState();
    const [createModalData, setCreateModalData] = useState({
        'user_id':user.id
    });
    const dispatch = useDispatch()
    const unreadMailNotification = useSelector((state) => state.unreadMailNotification)
    const [allowedPersons, setAllowedPersons] = useState([]);
    const [labels, setLabels] = useState([]); // for Filters
    const [filterVisible, setFilterVisible] = useState(false) // for Filters
    const [filterFields, setFilterFields] = useState({}); // for Filters
    const [selectedLabels,setSelectedLabels] = useState([]) // for Filters
    const [senderPersons,setSenderPersons] = useState([]) // for Filters
    const [reciverPersons,setReciverPersons] = useState([]) // for Filters
    const [selectedPersons,setSelectedPersons] = useState([]) // for Filters
    const [loadingCreateModal,setLoadingCreateModal] = useState(false)
    useEffect(()=>{
        setFilterFields(filterData);
    },[])
    useEffect(()=>{
        if(filterVisible){
            if(labels.length == 0)
                getLables();
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
            setLoadingCreateModal(false);

        })
        .catch((error) => {
            console.log(error.response);
            });
    }
    const getLables = () =>{
        axiosClient.get('/labels').then(res => {
            // console.log(res.data);
            setLabels(res.data.map(item => ({
                value: item.id,
                text: `${item.title}`
              })));
        })
        .catch((error) => {
            console.log(error.response);
            });
    }
    const getSenderPersons = () =>{
        axiosClient.post('/mail/senderPersons/'+user.id).then(res => {
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
        axiosClient.post('/mail/reciverPersons/'+user.id).then(res => {
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
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        axiosClient.post('/uploadFile',formData).then(res => {
            console.log(' uploadFile :: ',res.data )
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

    const showMail = (id) =>{
        axiosClient.post('/mail/showMail/'+id).then(res => {
            console.log(res);
            setMailModalData(res.data[0]);
            openMailModal()
        })
        .catch((error) => {
            console.log(error);
            });
    }

    const openMailModal = () => {
        if(labels.length == 0)
            getLables();
        if(tab == 'recive'){
            getAllowedPersons(setShowMailModal)
        }
        else
            setShowMailModal(true);
    };
    const closeMailModal = () => {
        setMailModalRefrenceData();
        setShowMailModal(false);
    };

    const openCreateModal = () => {
        if(labels.length == 0)
            getLables();
        setLoadingCreateModal(true);
        getAllowedPersons(setShowCreateModal);
    };
    const closeCreateModal = () => {
        setShowCreateModal(false);
        setCreateModalData({'user_id':user.id});
    };
    const handleTitleClick = (node, tab) => {
        showMail(node.id)
        if(tab == 'recive' && node.status == 0){
            axiosClient.post('/mail/updateStatusMail/'+ node.id).then(res => {
                fetchData();
                dispatch({ type: 'set', unreadMailNotification: unreadMailNotification-1 })
            })
            .catch((error) => {
                console.log(error.response);
                });
        }
    }
    const storeMail = () => {
        // console.log(createModalData);
        const formData = new FormData();
        Object.entries(createModalData).forEach(([key, value]) => {
            if (key === 'files' && Array.isArray(value)) {
                value.forEach((file, index) => {
                    if(file != '')
                        formData.append(`uploadedFile[${index}]`, file);
                });
            }
            else if (key === 'recive_id' && Array.isArray(value)) {
                value.forEach((reciveId, index) => {
                    formData.append(`recive_id[${index}]`, reciveId);
                });
            } 
            else if (key === 'labels' && Array.isArray(value)) {
                value.forEach((reciveId, index) => {
                    formData.append(`labels[${index}]`, reciveId);
                });
            } 
            else if (key === 'descriptions' && Array.isArray(value)) {
                value.forEach((reciveId, index) => {
                    formData.append(`descriptions[${index}]`, reciveId);
                });
            } 
             else {
                formData.append(key, value);
            }
            
        });
        
        axiosClient.post('mail/store/'+ user.id, formData).then(res => {
            console.log(res);
            fetchData();
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: res.data.msg,
              }).then(() => closeCreateModal());
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message,
              });
            });

    }
    const handleRefrence = () => {
        // console.log(mailModalRefrenceData);
        if((mailModalRefrenceData.recive_id && mailModalRefrenceData.description)){
            const formData = new FormData();
            Object.entries(mailModalRefrenceData).forEach(([key, value]) => {
                if (key === 'files' && Array.isArray(value)) {
                    value.forEach((file, index) => {
                        if(file != '')
                            formData.append(`files[${index}]`, file);
                    });
                }
                
                 else if(key == 'recive_id' || key == 'mail_id' || key == 'description') {
                    formData.append(key, value);
                }
            });
        axiosClient.post('reference/store/'+user.id, formData).then(res => {
            console.log(res);
            if (res.data == "خطا")
            {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: "نامه قبلا ارجاع داده شده",
                  }).then(() => closeMailModal());
            }
            else{
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: res.data.msg,
              }).then(() => closeMailModal());
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
        fetchData()
        }
    }
    const handleParaph = () =>{
        axiosClient.post('mail/paraph/'+mailModalParaphData.mail_id, mailModalParaphData.description).then(res => {
            console.log(res.data)
        });
    }

    const handleStyle = (tab, status) =>{
        let style = '';
        if (tab === 'send' || status==1)
            style='table-secondary pointer'; 
        else
            style='pointer';
        return style;
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
        let labelsArray = [];
        let personsArray = [];
        if(selectedLabels.length != 0){
            selectedLabels.forEach((value) => {
                labelsArray.push(value.value);
            });
        }
        if(selectedPersons.length != 0){
            selectedPersons.forEach((value) => {
                personsArray.push(value.value);
            });
        }
        Object.entries(filterFields).forEach(([key, value]) => {
            if (value !== '') 
              updatedFilterData[key] = value;
        });
        if (personsArray.length !== 0) 
            updatedFilterData.id = personsArray;
        if (labelsArray.length !== 0) 
            updatedFilterData.labels = labelsArray;
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
                <CCol md="1"></CCol>
                <CCol md="3 ">
                    <CInputGroup className="mb-4 flex-nowrap">
                        <CInputGroupText id="filter_label">برچسب</CInputGroupText>
                        <CMultiSelect name='label' 
                        options={labels} 
                        onChange={setSelectedLabels}
                        placeholder="جستجو کنید"
                        selectAllLabel="انتخاب همه"
                        virtualScroller
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
        <tr className='col-1user_id'>
          <th className='text-center col-4 font-weight-bold'>موضوع</th>
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
            <td><p className="link-dark pointer">{node.title}</p></td>
            {/* <td>{node.description.substring(0, Math.min(20, node.description.length))}</td> */}
            <td>{moment(node.created_at, 'YYYY-MM-DD HH:mm:ss').locale('fa').format('dddd D MMMM HH:mm YYYY')}</td>
            {tab === 'recive' ?(
            <td>{node.user.first_name+' '+node.user.last_name+' - '+node.user.role.title}</td>):
            (<td>{node.recive_user.first_name+' '+node.recive_user.last_name+' - '+node.recive_user.role.title}</td>)}
        </tr>

        )))}

      </tbody>
    </Table>
    <CRow className='mt-2 mb-4'>
        <CCol md='1'></CCol>
        <CCol md='5' className='d-flex justify-content-center'>
            <CLoadingButton color="success" variant="outline" shape="rounded-pill" onClick={openCreateModal} loading={loadingCreateModal}> + ایجاد نامه </CLoadingButton>
        </CCol>
    </CRow>
        {showCreateModal &&(
            <CreateMailModal
                showCreateModal={showCreateModal}
                closeCreateModal={closeCreateModal}
                allowedPersons={allowedPersons}
                labels={labels}
                storeMail={storeMail}
                setCreateModalData={setCreateModalData}
                createModalData={createModalData}
                handleUploadFile={handleUploadFile}
            />
        )}
        {showMailModal &&(
            <ShowMailModal
            mailModalData={mailModalData}
            setMailModalData={setMailModalData}
            showMailModal={showMailModal}
            closeMailModal={closeMailModal}
            allowedPersons={allowedPersons}
            handleRefrence={handleRefrence}
            handleParaph={handleParaph}
            tab={tab}
            mailModalRefrenceData={mailModalRefrenceData}
            setMailModalRefrenceData={setMailModalRefrenceData}
            handleUploadFile={handleUploadFile}
            mailModalParaphData={mailModalParaphData} 
            setMailModalParaphData={setMailModalParaphData}
            />
        )}

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
