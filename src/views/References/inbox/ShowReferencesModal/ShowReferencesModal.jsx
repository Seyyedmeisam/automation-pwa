import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PrintableView from '../PrintableView/PrintableView';
import Select from 'react-select';
import { useState, useEffect } from "react";
import {CFormSelect, CButton, CAvatar, CFormLabel, CFormInput, CCol} from '@coreui/react-pro'
import moment from 'jalali-moment';
import { CRow } from '@coreui/react';
function ShowReferencesModal({
  referencesModalData,
  setReferencesModalData,
  showReferencesModal,
  closeReferencesModal,
  allowedPersons,
  handleRefrence,
  tab,
  handleFinish,
  user,
  handleUploadFile,
}){
  
  const [refrenceField, setRefrenceField] = useState(false);
  const options = allowedPersons.map(item => ({
    value: item.id,
    label: `${item.first_name} ${item.last_name} - ${item.role.title}`
  }));
  options.unshift({ label: '-', value: null});
  const acceptableImages = ['png', 'jpg', 'jpeg', 'webp'];
    
    const handleRefrenceFromChange = (e) => {
      const { name, value, type } = e.target;
      let newValue = value;
      if (type === 'file') {
        const file = e.target.files[0];
        if(file)
          handleUploadFile(file, referencesModalData, setReferencesModalData);
      }
      else {
        if (name == 'recive_id'){
          newValue = parseInt(newValue, 10);
        }
      setReferencesModalData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
      }
    }
    const handleRemoveFile = (index) => {
      setReferencesModalData((prevState) => ({
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
      <Modal show={showReferencesModal} onHide={closeReferencesModal} size="xl">
        {/* <Modal.Header closeButton> */}
        <Modal.Header className='d-flex justify-content-center '>
          <Modal.Title className='bold'>نامه شماره {referencesModalData.mail.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
              موضوع :
              <div className="p-3">{referencesModalData.mail.title}</div>
            </Form.Group>
            <Form.Group className="mb-3">
            {Object.keys(referencesModalData.mail.descriptions).map((key) => (
              <div key={parseInt(key, 10)+1}>
                صفحه {parseInt(key, 10)+1}
                <br/>
                <div className="overflow-hidden border border-dark p-3" dangerouslySetInnerHTML={{ __html: referencesModalData.mail.descriptions[key].descriptions }} />
                <br/>
              </div>
            ))}
            </Form.Group>
            {referencesModalData.mail.labels && referencesModalData.mail.labels.length > 0 &&(
                <Form.Group className="mb-3">
                  <div className="p-4">{'برچسب ها : '}</div>
                  {referencesModalData.mail.labels.map((item, index)=>(
                  <CButton className='m-1' key={`label-${index}`} color="light" size='sm' active>{item.title}</CButton>
                  ))}
                </Form.Group>
              )}
           
            
              {referencesModalData.mail.files && referencesModalData.mail.files.length > 0 &&(
                
                <Form.Group className="mb-3">
                  
                <div className="p-4">{'پیوست ها : '}</div>
                {referencesModalData.mail.files.map((item, index)=>(
                  <a  key={`a-${index}`} href={`${import.meta.env.VITE_API_BASE_URL}/${item.file}`} target="_blank" rel="noopener noreferrer">
                  {acceptableImages.includes(getExtension(item.file)) ? (
                      <img key={`file-${index}`} className='m-3 border border-dark' src={`${import.meta.env.VITE_API_BASE_URL}/${item.file}`}  height="100px" alt="Preview" />
                  ):(
                    // <CAvatar className='m-3' color="primary" shape="rounded" size="lg">PDF</CAvatar>
                    <CAvatar key={`file-${index}`} className='m-3' 
                    color={
                      (() => {
                        switch (getExtension(item.file)) {
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
                    textColor="white" shape="rounded" size="xl"> {getExtension(item.file)} </CAvatar>
                  )}                               
                  </a>
                ))}
                </Form.Group>
              )}
            {referencesModalData.mailReference && (referencesModalData.mailReference.map((node) => (
              <Form.Group className="mb-3" key={node.id}>
                <hr />
                <div className="row text-center">
                  <div className="col-md-4 mt-3 text-nowrap">
                  {node.user.first_name+' '+node.user.last_name+' - '+node.user.role.title} 
                  </div>
                  <div className="col-md-4 mt-3 text-nowrap">
                    شماره ارجاع : {node.id} 
                  </div>
                  <div className="col-md-4 mt-3 text-nowrap">
                  <p>{moment(node.created_at, 'YYYY-MM-DD HH:mm:ss').locale('fa').format('jYYYY/jMM/jDD HH:mm:ss')} </p>
                  </div>
                </div>
                <Form.Group className="mb-3">
                  متن ارجاع : 
                <div className="p-3 ">{node.description}</div>
              {node.files && node.files.length > 0 &&(
                <div>
                  <div className="p-4">{'پیوست ها : '}</div>

                  {node.files.map((item, index)=>(
                  
                    <a  key={`a-${index}`} href={`${import.meta.env.VITE_API_BASE_URL}/${item.file}`} target="_blank" rel="noopener noreferrer">
                    {acceptableImages.includes(getExtension(item.file)) ? (
                        <img key={`file-${index}`} className='m-3 border border-dark' src={`${import.meta.env.VITE_API_BASE_URL}/${item.file}`}  height="100px" alt="Preview" />
                    ):(
                      <CAvatar key={`file-${index}`} className='m-3' 
                      color={
                        (() => {
                          switch (getExtension(item.file)) {
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
                      textColor="white" shape="rounded" size="xl"> {getExtension(item.file)} </CAvatar>
                    )}                               
                    </a>
                  ))}
                </div>
              )}
            </Form.Group>
              
            </Form.Group>
            
            )))}




          {refrenceField ? (
            <>
            ارجاع به
          <CFormSelect
            onChange={handleRefrenceFromChange}
            name="recive_id"
            options={options}
            placeholder="جستجو کنید"
          />
          <Form.Group className=" mt-2 mb-3">
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
            {console.log(referencesModalData)}
            {referencesModalData.files &&(
              referencesModalData.files?.map((item, index)=>(
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
            </div>
            <Form.Group className=" mt-2 mb-3">
              <div className='row'>
                <CButton shape="rounded-pill" color="danger" onClick={()=>setRefrenceField(!refrenceField)} className="col-md-2 mt-1 mx-auto">
                  لفو          
                </CButton>
                <CButton shape="rounded-pill" color="success" onClick={handleRefrence} className="col-md-2 mt-1 mx-auto">
                تایید        
              </CButton>
            </div>
           </Form.Group>
            </>
        ):(
          tab==='recive' && referencesModalData.mailReference[0].isFinished === 0 && referencesModalData.mailReference[referencesModalData.mailReference.length -1].recive_id == user.id &&(
          <CRow className="align-items-center">
            <CButton shape="rounded-pill" color="light" onClick={()=>setRefrenceField(!refrenceField)} className="col-md-1 mt-1 mx-auto">
            ارجاع 
            </CButton>
          </CRow>
          )
        )
        
        }
        {
          (referencesModalData.mailReference[0].isFinished) ?(
            <div className='row text-center'>
                <h4 className='.text-primary'>این ارجاع به پایان رسیده</h4>
            </div>
            ):(<></>)
        }
        </Form>
        </Modal.Body>
        <Modal.Footer>
        
        {/* <Button variant="primary" onClick={handlePrint} className=" mt-1 d-block mx-auto">
            چاپ
        </Button> */}
        {tab === 'recive' && referencesModalData.mailReference[0].isFinished == 0 && referencesModalData.mailReference[referencesModalData.mailReference.length -1].recive_id == user.id &&(
        <CButton shape="rounded-pill" color="primary" onClick={() =>handleFinish(referencesModalData.mail.id)} className=" mt-1 d-block mx-auto">
            اتمام ارجاع
        </CButton>)
        }
          <CButton shape="rounded-pill" color="secondary" onClick={closeReferencesModal} className=" mt-1 d-block mx-auto">
            بستن
          </CButton>
        </Modal.Footer>
      </Modal>
    </div>

     );
}

export default ShowReferencesModal;