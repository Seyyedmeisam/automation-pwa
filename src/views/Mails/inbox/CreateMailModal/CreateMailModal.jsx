import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ReactQuill from 'react-quill';
import {CMultiSelect, CButton, CCol, CFormLabel, CFormInput, CRow, CFormSelect, CAvatar} from '@coreui/react-pro'
import { CAlert } from '@coreui/react';
function CreateMailModal({
    showCreateModal,
    closeCreateModal,
    allowedPersons,
    labels,
    storeMail,
    setCreateModalData,
    createModalData,
    handleUploadFile,
}){
  const [selectedPersons,setSelectedPersons] = useState([])
  const [selectedLabels,setSelectedLabels] = useState([])
  const [done,setDone] = useState(false)
  const allowedPersonsoptions = allowedPersons.map(item => ({
    value: item.id,
    text: `${item.first_name} ${item.last_name} - ${item.role.title}`
  }));
  const [textAreas, setTextAreas] = useState(['']);
  const [pageCharCount, setPageCharCount] = useState([0]);
  const [pageTypes, setPageTypes] = useState({
      'A4' : {
        type : 'A4',
        pageCharacterLimit : 1500,
        pageRowLimit : 11
      },
      'A5' : {
        type : 'A5',
        pageCharacterLimit : 639,
        pageRowLimit : 9
      },
  });
  const [pageSelectFields, setPageSelectFields] = useState([
    { label: 'A4', value: 'A4' },
    { label: 'A5', value: 'A5'}
])
  const [selectedPageType, setSelectedPageType] = useState('A4');
  const acceptableImages = ['png', 'jpg', 'jpeg', 'webp'];
  // useEffect(()=>{
  //   console.log(selectedPageType);
  //   console.log(pageTypes[selectedPageType].pageCharacterLimit);
  // },[selectedPageType])

  useEffect(()=>{
    if(done)
      storeMail();
    setDone(false);
  },[done])
  // useEffect(()=>{
  //   console.log(createModalData);
  // },[createModalData])
  const handleFromChange = (e) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      const file = e.target.files[0]; 
      if(file)
        handleUploadFile(file, createModalData, setCreateModalData);

    } else {
      setCreateModalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  function TextWithoutTags(htmlString) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    const textWithoutTags = tempElement.textContent || tempElement.innerText;
    return textWithoutTags;
  }
  const countPTags = (htmlString) => {
    const pTagMatches = htmlString.match(/<p\b[^>]*>(.*?)<\/p>/g);
    const pTagCount = pTagMatches ? pTagMatches.length : 0;
    return pTagCount;
};

  const handleAddTextArea = () => {
    const lastTextArea = textAreas[textAreas.length - 1];
    if (lastTextArea.length > 0) {

      setTextAreas([...textAreas, '']);
    }
  };

  const handleInputChange = (index, value) => {
    // console.log(value);
    const lineCount = countPTags(value);
    // console.log('Number of lines:', lineCount);
    const valueWithoutTagslength = TextWithoutTags(value).length;
    const updatedTextAreas = [...textAreas];
    const updatedPageCharCount = [...pageCharCount];
    // console.log('valueWithoutTagslength :: ',valueWithoutTagslength);
    if (valueWithoutTagslength <= pageTypes[selectedPageType].pageCharacterLimit && lineCount <= pageTypes[selectedPageType].pageRowLimit && lineCount != 0) {
      updatedTextAreas[index] = value;
      updatedPageCharCount[index] = valueWithoutTagslength;
      setPageCharCount(updatedPageCharCount);
      setTextAreas(updatedTextAreas);
    } 
    
  };

  const handleFinsh = () => {
    // console.log(selectedPersons);
    let personsArray = [];
    let labelsArray = [];
    selectedPersons.forEach((value) => {
      personsArray.push(value.value);
    });
    selectedLabels.forEach((value) => {
      labelsArray.push(value.value);
    });
      setCreateModalData({
        ...createModalData,
        'recive_id': personsArray,
        'labels': labelsArray,
        'descriptions': textAreas,
        'type' : selectedPageType,
    });
    setDone(true);
  };
  const getExtension = (fileName) => {
    const parts = fileName.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1].toLowerCase();
    }
    return null;
  };
  const handleRemoveFile = (index) => {
    console.log(index);
    setCreateModalData((prevState) => ({
      ...prevState,
      files: prevState.files.filter((_, i) => i !== index),
    }));
  };  
  const modules = {
    toolbar: [
      // [{ 'direction': 'rtl' }],  // Add 'direction' to the toolbar for RTL support
      ['bold', 'italic', 'underline', 'strike'],
    ],
  };
    return (
        <div>
      <Modal show={showCreateModal} onHide={closeCreateModal} size="xl">
        <Modal.Header className='d-flex justify-content-center '>
          <Modal.Title className='bold' > ایجاد نامه</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>موضوع</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleFromChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="ControlTextarea1"
            >
              <Form.Label> نوع صفحه :</Form.Label>
                <CFormSelect 
                  onChange={(e) => setSelectedPageType(e.target.value)}
                  name="pageType"
                  value={selectedPageType}
                  options={pageSelectFields}
                  />
                {textAreas.map((value, index) => (
                  <div className='mt-3 mb-3' key={index}>
                    <div >صفحه  {index+1}</div> <div >{`تعداد کاراکتر : ${pageCharCount[index]}/${pageTypes[selectedPageType].pageCharacterLimit}   ------   حداکثر تعداد خط : ${pageTypes[selectedPageType].pageRowLimit}`}</div><br/>
                    {(pageCharCount[index] == pageTypes[selectedPageType].pageCharacterLimit || (typeof lineCount !== 'undefined' && lineCount == pageTypes[selectedPageType].pageRowLimit)) && (
                      <CAlert color="danger" className="d-flex align-items-center">
                      <svg className="flex-shrink-0 me-2" width="24" height="24" viewBox="0 0 512 512">
                        <rect
                          width="32"
                          height="176"
                          x="240"
                          y="176"
                          fill="var(--ci-primary-color, currentColor)"
                          className="ci-primary"
                        ></rect>
                        <rect
                          width="32"
                          height="32"
                          x="240"
                          y="384"
                          fill="var(--ci-primary-color, currentColor)"
                          className="ci-primary"
                        ></rect>
                        <path
                          fill="var(--ci-primary-color, currentColor)"
                          d="M274.014,16H237.986L16,445.174V496H496V445.174ZM464,464H48V452.959L256,50.826,464,452.959Z"
                          className="ci-primary"
                        ></path>
                      </svg>
                      <div> این صفحه به تعداد خط یا کاراکتر مجاز رسیده است، صفحه جدید ایجاد کنید!</div>
                      
                    </CAlert>
                    )}

                    <ReactQuill 
                      value={value}
                      style={{ direction: 'rtl',  }}
                      onChange={(e) => handleInputChange(index, e)} 
                      modules={modules}
                      maxLength={pageTypes[selectedPageType].pageCharacterLimit}
                    />
                  </div>
                ))}
                <CButton className='mt-3 mb-3' onClick={handleAddTextArea}>+ اضافه کردن صفحه جدید</CButton>
            </Form.Group>
          </Form>
          ارسال به
          <CCol md='12'>
            <CMultiSelect
              options={allowedPersonsoptions}
              onChange={setSelectedPersons}
              virtualScroller={true}
              visibleItems={5}
              placeholder="جستجو کنید"
              selectAllLabel="انتخاب همه"
            />
          </CCol>
          برچسب
          <CCol md='6'>
            <CMultiSelect
              onChange={setSelectedLabels}
              options={labels}
              virtualScroller={true}
              visibleItems={5}
              placeholder="جستجو کنید"
              selectAllLabel="انتخاب همه"
            />
          </CCol>
          <div className="mb-3 mt-3">
            <CFormLabel htmlFor="file">انتخاب فایل</CFormLabel>
            <CRow>
              <CCol md='9'>
                <CFormInput type="file" className="mt-3" name="files" onChange={handleFromChange} />
              </CCol>
            </CRow>
            {createModalData.files &&(
              createModalData.files?.map((item, index)=>(
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
        </Modal.Body>
        <Modal.Footer>
        <CButton shape="rounded-pill" color="primary" onClick={handleFinsh} className="mt-1 d-block mx-auto">
            ارسال
          </CButton>
        {/* <Button variant="primary" onClick={handlePrint} className=" mt-1 d-block mx-auto">
            چاپ
        </Button> */}
          <CButton shape="rounded-pill" color="secondary" onClick={closeCreateModal} className="mt-1 d-block mx-auto">
            بستن
          </CButton>
        </Modal.Footer>
      </Modal>
    </div>

     );
}

export default CreateMailModal;
