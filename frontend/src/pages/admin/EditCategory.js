import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { addCategory, editCategory, getAllProduct, getCategoryById } from '../../services/fetch/ApiUtils';
import Nav from './Nav';
import { useEffect } from 'react';

const EditCategory = (props) => {
    const [name, setName] = useState('');
    const { authenticated, role, currentUser, location, onLogout } = props;
    const { id } = useParams();
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        getCategoryById(id).then(response => {
            console.log(response.name)
            setName(response.name);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const categoryRequest = { name };

        editCategory(id,categoryRequest)
            .then((response) => {
                console.log(response.data);
                toast.success('Sửa thể loại thành công!!');
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
                            <h5 className="card-title">Sửa thể loại</h5>
                            <h6 className="card-subtitle text-muted"> Sửa thể loại của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tên thể loại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên thể loại"
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

export default EditCategory;