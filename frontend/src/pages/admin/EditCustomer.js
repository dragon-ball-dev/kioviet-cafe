import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { addCategory, addStore, editStore, getCustomerById, getStoreById, getSupplyById } from '../../services/fetch/ApiUtils';
import Nav from './Nav';
import { useEffect } from 'react';

const EditCustomer = (props) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [discount, setDiscount] = useState('');
    const { authenticated, currentUser, onLogout , role} = props;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        getCustomerById(id).then(response => {
            
            setName(response.data.name);
            setAddress(response.data.address);
            setPhone(response.data.phone);
            setDiscount(response.data.discount);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        if (inputName === 'name') {
            setName(inputValue);
        } else if (inputName === 'address') {
            setAddress(inputValue);
        } else if (inputName === 'phone') {
            setPhone(inputValue);
        } else if (inputName === 'discount') {
            setDiscount(inputValue);
        }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();

        const customerRequest = { name, address, phone, discount };

        editStore(customerRequest)
            .then((response) => {
                console.log(response.data);
                toast.success('Sửa khách hàng thành công!!');
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message)
            });
    };

    if (!authenticated) {
        return <Navigate to={{ pathname: '/', state: { from: props.location } }} />;
    }

    console.log(name);

    return (
        <div className="wrapper">
            <nav id="sidebar" className="sidebar js-sidebar">
                <div className="sidebar-content js-simplebar">
                    <a className="sidebar-brand" href="index.html">
                        <span className="align-middle">Kioviet Cafe</span>
                    </a>
                    <SidebarNav role={role} />
                </div>
            </nav>

            <div className="main">
                <Nav onLogout={onLogout} currentUser={currentUser} />

                <main style={{ margin: '20px' }}>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Sửa khách hàng</h5>
                            <h6 className="card-subtitle text-muted"> Sửa khách hàng của các chuỗi khách hàng.</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tên khách hàng</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên khách hàng"
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Địa Chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Hoan Kiem Street"
                                        name="address"
                                        value={address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số Điện Thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 0987654321"
                                        name="phone"
                                        value={phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Khuyễn mãi</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: your-discount@example.com"
                                        name="discount"
                                        value={discount}
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

export default EditCustomer;