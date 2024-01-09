import { CButton, CFormInput, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react-pro";
import { useState } from "react";

export default function EditLableModal({
    editLableModalVisible,
    setEditLableModalVisible,
    editLableModalData,
    setEditLableModalData,
    handleEdit,
}){
    
    const handleFromChange = (e) => {
        const { name, value } = e.target;
        setEditLableModalData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    return(
        <>
        <CModal
            visible={editLableModalVisible}
            onClose={() => setEditLableModalVisible(false)}
            size="xl"
        >
            <CModalHeader  className="d-flex justify-content-center" closeButton={false}>
                <CModalTitle>ایجاد برچسب</CModalTitle>
            </CModalHeader>
            
            <CModalBody>
                <CInputGroup className="mb-3">
                    <CInputGroupText>نام برچسب</CInputGroupText>
                    <CFormInput name='title' type='text' onChange={handleFromChange} defaultValue={editLableModalData.title}/>
                </CInputGroup>
                </CModalBody>
            <CModalFooter>
                <CButton shape="rounded-pill" color="secondary" className="mt-1 d-block mx-auto" onClick={() => setEditLableModalVisible(false)}>بستن</CButton>
                <CButton shape="rounded-pill" color="primary" className="mt-1 d-block mx-auto" onClick={() => handleEdit(editLableModalData)}>تایید</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}