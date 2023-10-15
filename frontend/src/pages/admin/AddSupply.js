import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { addCategory } from '../../services/fetch/ApiUtils';
import Nav from './Nav';

const AddCategory = (props) => {
    const [name, setName] = useState('');
    const { authenticated, role, currentUser, location, onLogout } = props;
    const [roleName, setRoleName] = useState(props.roleName);

    const handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        if (inputName === 'name') {
            setName(inputValue);
        } else if (inputName === 'image') {
            // Handle image input if needed
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const categoryRequest = { name };

        addCategory(categoryRequest)
            .then((response) => {
                console.log(response.data);
                toast.success('Thêm danh mục thành công!!');
                setName('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!authenticated) {
        return (
            <Navigate
                to={{
                    pathname: '/',
                    state: { from: props.location },
                }}
            />
        );
    }

    console.log(name);

    return (
        <div className="wrapper">
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="index.html">
                    <span className="align-middle">Kioviet Cafe</span>
                </a>
                <SidebarNav />
            </div>
        </nav>

        <div className="main">
            <Nav onLogout={onLogout} currentUser={currentUser} />

                <main style={{ margin: "20px 20px 20px 20px" }}>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Thêm nhà sản xuất</h5>
                            <h6 className="card-subtitle text-muted"> Thêm nhà sản xuất của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tên Nhà Sản Xuất</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên danh mục"
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddSupply;