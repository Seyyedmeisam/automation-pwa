import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import Tree from "./Tree";
import Swal from 'sweetalert2';


export default function CreateRole() {
    const [data, setData] = useState([]);
    const [expandedNodes, setExpandedNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    const fetchData = () => {
        axiosClient
            .get("role")
            .then((res) => {
            setLoading(false)
            setData(res.data);
            })
            .catch((error) => {
                Swal.fire(error.response.data.message);
            });
    };
    useEffect(() => {
        fetchData();
    }, []); // Include selectedNode as a dependency
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
    function handleSubmit(e) {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('parent_id', selectedNode);
        axiosClient
            .post("role",formDataToSend)
            .then((res) => {
                if(res.status == 200)
                    fetchData();
                Swal.fire(res.data.msg);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.msg,
                });
            })
            .catch((error) => {
                console.log(error.response);
                if(error.response.status == 422)
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning',
                        text: error.response.data.message || 'There was an error processing your request.',
                    });
            });
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header text-center">
                                <h4 className="mb-0">فرم ایجاد نقش</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-1">
                                        <label htmlFor="name" className="mb-1">
                                            عنوان:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="title"
                                            placeholder="عنوان را وارد کنید"
                                            value={formData.title}
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                    <div className="form-group mb-1">
                                        <label
                                            htmlFor="exampleTextarea"
                                            className="mb-1"
                                        >
                                            توضیحات نقش:
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="Textarea"
                                            name="description"
                                            rows="3"
                                            placeholder="متن خود را وارد کنید"
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label
                                            htmlFor="exampleSelect"
                                            className="mb-1"
                                        >
                                            پدر این نقش را انتخاب کنید:
                                        </label>

                                        <Tree
                                        data={data}
                                        expandedNodes={expandedNodes}
                                        setExpandedNodes={setExpandedNodes}
                                        selectedNode={selectedNode}
                                        setSelectedNode={setSelectedNode}
                                        />

                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success mt-1 d-block mx-auto"
                                    >
                                        ایجاد نقش
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
