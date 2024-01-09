import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PrintableView from '../print/PrintableView';
import {CAvatar, CButton, CCol, CFormInput, CFormLabel, CFormSelect, CRow} from '@coreui/react-pro'
import { useState } from "react";
import ReactDOMServer from 'react-dom/server';
function ShowMailModal({
  mailModalData,
  setMailModalData,
  showMailModal,
  closeMailModal,
  allowedPersons,
  handleRefrence,
  handleParaph,
  tab,
  mailModalRefrenceData,
  setMailModalRefrenceData,
  handleUploadFile,
  mailModalParaphData,
  setMailModalParaphData,
}){

  const [refrenceField, setRefrenceField] = useState(false);
  const [collapseType, setCollapseType] = useState('');
  const options = allowedPersons.map(item => ({
    value: item.id,
    label: `${item.first_name} ${item.last_name} - ${item.role.title}`
  }));
  options.unshift({ label: '-', value: null});
  const acceptableImages = ['png', 'jpg', 'jpeg', 'webp'];
  const pageDetails = {
    'A4':{
      type: 'A4',
      width: '210mm',
      height: '297mm',
      padding: '15mm',
      headerHeight: '40mm',
      pageHeight: '170mm',
      footerHeight: '70mm',
      logoMarginBottom: '5mm',
      logoImgMaxWidth: '50mm',
      logoImgMaxHeight: '50mm',
      signatureTextMarginLeft: '15mm',
      signatureTextMarginRight: '115mm',
      signatureImageMaxWidth: '50mm',
      signatureImageMaxheight : '50mm',
      dateWidth : '40mm',
    },
    'A5':{
      type: 'A5',
      width: '148mm',
      height: '210mm',
      padding: '2mm',
      headerHeight: '20mm',
      pageHeight: '115mm',
      footerHeight: '40mm',
      logoMarginBottom: '10mm',
      logoImgMaxWidth: '30mm',
      logoImgMaxHeight: '30mm',
      signatureTextMarginLeft: '9mm',
      signatureTextMarginRight: '80mm',
      signatureImageMaxWidth: '33mm',
      signatureImageMaxheight : '33mm',
      dateWidth : '20mm',
    }
  }
  const PrintWrapper = () => (
    <div>
      {Object.keys(mailModalData.descriptions).map((key) => (
        <PrintableView
        created_date={mailModalData.created_at}
        mail_id={mailModalData.id}
        page={key}
        recive_name={mailModalData.recive_user_first_name+' '+mailModalData.recive_user_last_name}
        recive_role={mailModalData.recive_user_role_title}
        mail_title={mailModalData.title}
        mail_description={mailModalData.descriptions[key]}
        sender_name={mailModalData.user_first_name+' '+mailModalData.user_last_name}
        sender_role={mailModalData.user_role_title}
        signature={`${import.meta.env.VITE_API_BASE_URL}/${mailModalData.signature}`}
        pageDetails={pageDetails[mailModalData.type]}
     />
     ))}
    </div>
  );
  const handlePrint = () => {
    // console.log(mailModalData);
    let printWindow = window.open('', '_blank');
    let printableContent = ReactDOMServer.renderToStaticMarkup(
    <PrintWrapper  />
    );
    printWindow.document.write(printableContent);
    printWindow.document.close();
  }
    useEffect(()=>{
      setMailModalRefrenceData((prevData) => ({
        ...prevData,
        mail_id: mailModalData.id,
      }));
      setMailModalParaphData((prevData) => ({
        ...prevData,
        mail_id: mailModalData.id,
      }));
    },[])
   
    const handleRefrenceFromChange = (e, index) => {
      const { name, value, type } = e.target;
      let newValue = value;
      if (type === 'file') {
        const file = e.target.files[0];
        if(file)
          handleUploadFile(file, mailModalRefrenceData, setMailModalRefrenceData);
      } else{
        if (name == 'recive_id')
        newValue = parseInt(value, 10);
      setMailModalRefrenceData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
      }
    }
    const handleParaphChange = (e) => {
      const { name, value } = e.target;
      setMailModalParaphData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }

    const handleRemoveFile = (index) => {
      setMailModalRefrenceData((prevState) => ({
        ...prevState,
        files: prevState.files.filter((_, i) => i !== index),
      }));
    };  
    
    const getExtension = (fileName) => {
      const parts = fileName.split('.');
      if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase();
      }
      return null;
    };
    
    return ( 
        <div>
      <Modal show={showMailModal} onHide={closeMailModal} size="xl">
        {/* <Modal.Header closeButton> */}
        <Modal.Header className='d-flex justify-content-center '>
          <Modal.Title className='bold'>نامه شماره {mailModalData.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3">
              <div className="p-4">{'از ' + mailModalData.user_first_name +' '+ mailModalData.user_last_name + ' به ' + mailModalData.recive_user_first_name +' '+ mailModalData.recive_user_last_name }</div>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="p-4">{'موضوع : '+mailModalData.title}</div>
            </Form.Group>
            <Form.Group className="mb-3">
            {Object.keys(mailModalData.descriptions).map((key) => (
              <div key={key}>
                صفحه {key}
                <br/>
                <div className="overflow-hidden border border-dark p-3" dangerouslySetInnerHTML={{ __html: mailModalData.descriptions[key] }} />
                <br/>
              </div>
            ))}

            </Form.Group>


              {mailModalData.labels && mailModalData.labels.length > 0 &&(
                <Form.Group className="mb-3">
                  <div className="p-4">{'برچسب ها : '}</div>
                  {mailModalData.labels.map((item, index)=>(
                  <CButton className='m-1' key={`label-${index}`} color="light" size='sm' active>{item}</CButton>
                  ))}
                </Form.Group>
              )}


              {mailModalData.files && mailModalData.files.length > 0 &&(

                <Form.Group className="mb-3">

                <div className="p-4">{'پیوست ها : '}</div>
                {mailModalData.files.map((item, index)=>(
                  <a  key={`a-${index}`} href={`${import.meta.env.VITE_API_BASE_URL}/${item}`} target="_blank" rel="noopener noreferrer">
                  {acceptableImages.includes(getExtension(item)) ? (
                      <img key={`file-${index}`} className='m-3 border border-dark' src={`${import.meta.env.VITE_API_BASE_URL}/${item}`}  height="100px" alt="Preview" />
                  ):(
                    // <CAvatar className='m-3' color="primary" shape="rounded" size="lg">PDF</CAvatar>
                    <CAvatar key={`file-${index}`} className='m-3'
                    color={
                      (() => {
                        switch (getExtension(item)) {
                          case 'pdf':
                            return 'danger';
                          case 'docx':
                            return 'primary';
                          case 'xlsx':
                            return 'success';
                          case 'svg':
                            return 'danger';
                          default:
                            return 'secondary';
                        }
                      })()
                    }
                    textColor="white" shape="rounded" size="xl"> {getExtension(item)} </CAvatar>
                  )}                               
                  </a>
                ))}
                </Form.Group>
              )}


          {collapseType == 'reference' && (
            <>
            ارجاع به
          <CFormSelect
            onChange={handleRefrenceFromChange}
            name="recive_id"
            options={options}
          />
          <Form.Group className=" mt-2 mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label> متن ارجاع</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                onChange={handleRefrenceFromChange}
                />
            </Form.Group>
            <div className="mb-3 mt-3">
              <CFormLabel htmlFor="file">انتخاب فایل</CFormLabel>
              <CRow>
                <CCol md='9'>
                  <CFormInput type="file" className="mt-3" name="files" onChange={handleRefrenceFromChange} />
                </CCol>
              </CRow>                 
              {mailModalRefrenceData.files &&(
                  mailModalRefrenceData.files?.map((item, index)=>(
                    <div key={`container-${index}`} style={{ position: 'relative', display: 'inline-block', marginTop: '1rem' }}>
                      <a  key={`a-${index}`} href={`${import.meta.env.VITE_API_BASE_URL}/${item}`} target="_blank" rel="noopener noreferrer">
                      {acceptableImages.includes(getExtension(item)) ? (
                        <img key={`file-${index}`} className='m-3 border border-dark' src={`${import.meta.env.VITE_API_BASE_URL}/${item}`}  height="100px" alt="Preview" />
                      ):(
                        <CAvatar key={`file-${index}`} className='m-3'
                          color={
                            (() => {
                              switch (getExtension(item)) {
                                case 'pdf':
                                  return 'danger';
                                case 'docx':
                                  return 'primary';
                                case 'xlsx':
                                  return 'success';
                                case 'svg':
                                  return 'danger';
                                default:
                                  return 'secondary';
                              }
                            })()
                          }
                          textColor="white" shape="rounded" size="xl" style={{height:"100px", width:"100px"}}> {getExtension(item)} </CAvatar>
                          )}
                        </a>
                        <CButton
                        key={`remove-${index}`}
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '0',
                        }}
                        color="danger"
                        variant="ghost"
                        size="sm"
                        shape="rounded-pill"
                        onClick={() => handleRemoveFile(index)} // Add your remove file function here
                      >X</CButton>
                      </div>
                  ))
                )}
              <br/>
            </div>
            <Form.Group className=" mt-2 mb-3">
            <CRow>
                <CButton shape="rounded-pill" color="danger" onClick={()=>setCollapseType('')} className="col-md-1 mt-1 mx-auto">
                  لفو
                </CButton>
                <CButton shape="rounded-pill" color="success" onClick={handleRefrence} className="col-md-1 mt-1 mx-auto">
                تایید
              </CButton>
            </CRow>
           </Form.Group>
            </>
        )}
        {collapseType == 'paraph' &&(
          <>
          <Form.Group className=" mt-2 mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label> متن پاراف</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                onChange={handleParaphChange}
                />
          </Form.Group>
          <Form.Group className=" mt-2 mb-3">
            <CRow>
              <CButton shape="rounded-pill" color="danger" onClick={()=>setCollapseType('')} className="col-md-1 mt-1 mx-auto">
                لفو
              </CButton>
              <CButton shape="rounded-pill" color="success" onClick={handleParaph} className="col-md-1 mt-1 mx-auto">
                تایید
              </CButton>
            </CRow>
          </Form.Group>
        </>
        )}
        {collapseType == '' && tab==='recive' &&(
          <CRow className="align-items-center">
              <CButton shape="rounded-pill" color="light" onClick={()=>setCollapseType('reference')} className="col-md-1 mt-1 mx-auto">
              ارجاع
              </CButton>
              <CButton shape="rounded-pill" color="light" onClick={()=>setCollapseType('paraph')} className="col-md-1 mt-1 mx-auto">
              پاراف
              </CButton>
          </CRow>
        )}
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <CButton shape="rounded-pill" color="primary" onClick={handlePrint} className=" mt-1 d-block mx-auto">
            چاپ
        </CButton>
          <CButton shape="rounded-pill" color="secondary" onClick={closeMailModal} className=" mt-1 d-block mx-auto">
            بستن
          </CButton>
        </Modal.Footer>
      </Modal>
    </div>

     );
}

export default ShowMailModal;
