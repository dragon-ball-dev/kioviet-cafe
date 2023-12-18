import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { addCategory, addInvertory, getAllCategory, getAllStore } from '../../services/fetch/ApiUtils';
import Nav from './Nav';

const AddInventory = (props) => {
    const { id } = useParams();
    const [productData, setProductData] = useState({
        storeId: 0,
        totalQuantity: 0,

    });
    const { authenticated, role, currentUser, location, onLogout } = props;
    const [tableData, setTableData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        getAllStore(0, 100, '').then(response => {
            setTableData(response.content);

        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        addInvertory(id, productData.storeId, productData.totalQuantity)
            .then((response) => {
                console.log(response.data);
                toast.success('Thêm số lượng sản phẩm vô kho thành công!!');
               
            })
            .catch((error) => {
                console.log(error.error);
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

   

    const {  storeId,  totalQuantity } = productData;

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
                            <h5 className="card-title">Thêm số lượng sản phẩm vào kho</h5>
                            <h6 className="card-subtitle text-muted"> Thêm số lượng sản phẩm vào kho của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="locationId">Cửa hàng</label>
                                    <select
                                        className="form-select"
                                        name="storeId"
                                        value={storeId}
                                        onChange={handleInputChange}
                                    >
                                        <option value={0}>Chọn...</option>
                                        {tableData.map((item) => (
                                            <option value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số lượng</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên thể loại"
                                        name="totalQuantity"
                                        value={totalQuantity}
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

export default AddInventory;