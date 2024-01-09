import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import Tree from "./Tree";
import EditRoleModal from "./EditRoleModal";
import Swal from 'sweetalert2';

export default function EditRole() {
    const [data, setData] = useState([]);
    const [expandedNodes, setExpandedNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [parentSelectedNode, setParentSelectedNode] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [roleData, setRoleData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        // title: roleData.title,
        // description: roleData.description ?? "",
    });
    const fetchData = () => {
        axiosClient
            .get("role")
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((error) => {
            console.log(error.response);
            });
    };
      useEffect(() => {
        fetchData();
      }, []); // Include selectedNode as a dependency

    const openModal = () => {
        if(selectedNode){
            const url = "role/"+selectedNode;
            axiosClient
                .get(url)
                .then((res) => {
                    setRoleData(res.data);
                    setParentSelectedNode(res.data.parent_id);
                    setShowModal(true);
                })
                .catch((error) => {
                    if(error.response.status == 422)
                        Swal.fire({
                            icon: 'warning',
                            title: 'Warning',
                            text: error.response.data.message || 'There was an error processing your request.',
                        });
                });
        }
    };
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
    const handleDelete = () => {
        Swal.fire({
            text: 'آیا از حذف این نقش مطمئن هستید؟',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله',
            cancelButtonText: 'خیر'
          }).then((result) => {
            if (result.isConfirmed) {
                const url = "role/"+selectedNode;
                axiosClient
                    .delete(url)
                    .then((res) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: res.data.msg,
                        });
                        if(res.status == 200){
                            setSelectedNode(null);
                            fetchData();
                            closeModal();
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                        if(error.response.status == 422)
                            Swal.fire({
                                icon: 'warning',
                                title: 'Warning',
                                text: error.response.data.message || 'There was an error processing your request.',
                            });
                            if(error.response.status == 500)
                            Swal.fire({
                                icon: 'warning',
                                title: 'Warning',
                                text: 'نمیتوانید نقشی که کاربر دارد را حذف کنید',
                            });
                    });
                    }
                });
    };
    const closeModal = () => {
        setShowModal(false);
    };

    function handleUpdate(e){
        e.preventDefault();

        if(parentSelectedNode == selectedNode){
            Swal.fire("نقش نمی تواند زیرمجموعه خودش باشد")
        }
        else if(parentSelectedNode){
            const params  = new URLSearchParams();
            params .append('title', formData.title);
            params .append('description', formData.description);
            params .append('parent_id', parentSelectedNode);
            const url = "role/"+selectedNode;
            axiosClient
                .put(url, params )
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.data.msg,
                    });
                    if(res.status == 200){
                        setParentSelectedNode(null);
                        fetchData();
                        closeModal();
                    }
                })
                .catch((error) => {
                    if(error.response.status == 422)
                            Swal.fire({
                                icon: 'warning',
                                title: 'Warning',
                                text: error.response.data.message || 'There was an error processing your request.',
                            });
                    console.log(error.response);
                });
        }
    else
        Swal.fire("نقش پدر را انتخاب کنید");
    }
    return(
        <>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4 className="mb-0">ویرایش نقش</h4>
                        </div>
                        <div className="card-body">
                            <Tree
                                data={data}
                                expandedNodes={expandedNodes}
                                setExpandedNodes={setExpandedNodes}
                                selectedNode={selectedNode}
                                setSelectedNode={setSelectedNode}
                            />

                            <button
                                type="submit"
                                className="btn btn-success mt-1 d-block mx-auto"
                                onClick={openModal}
                            >
                                ویرایش
                            </button>
                            {showModal &&(
                                <EditRoleModal
                                    data={data}
                                    roleData={roleData}
                                    expandedNodes={expandedNodes}
                                    setExpandedNodes={setExpandedNodes}
                                    parentSelectedNode={parentSelectedNode}
                                    setParentSelectedNode={setParentSelectedNode}
                                    showModal={showModal}
                                    closeModal={closeModal}
                                    handleDelete={handleDelete}
                                    handleUpdate={handleUpdate}
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
