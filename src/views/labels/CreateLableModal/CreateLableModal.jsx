import { CButton, CFormInput, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react-pro";
import { useState } from "react";

export default function CreateLableModal({
    createLableModalVisible,
    setCreateLableModalVisible,
    habdleCreateLabel,
}){
    const [modalData, setModalData] = useState({title:''});
    const handleFromChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    return(
        <>
        <CModal
            visible={createLableModalVisible}
            onClose={() => setCreateLableModalVisible(false)}
            size="xl"
        >
            <CModalHeader  className="d-flex justify-content-center" closeButton={false}>
                <CModalTitle>ایجاد برچسب</CModalTitle>
            </CModalHeader>
            
            <CModalBody>
                <CInputGroup className="mb-3">
                    <CInputGroupText>نام برچسب</CInputGroupText>
                    <CFormInput name='title' type='text' onChange={handleFromChange} placeholder=""/>
                </CInputGroup>
                </CModalBody>
            <CModalFooter>
                <CButton shape="rounded-pill" color="secondary" className="mt-1 d-block mx-auto" onClick={() => setCreateLableModalVisible (false)}>بستن</CButton>
                <CButton shape="rounded-pill" color="primary" className="mt-1 d-block mx-auto" onClick={() => habdleCreateLabel(modalData)}>ایجاد</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}