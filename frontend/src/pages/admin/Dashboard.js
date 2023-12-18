import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import '../../assets/css/app.css';
import useScript from '../../components/useScripts';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { getAllCategory, getCountProduct, getPriceMonth } from '../../services/fetch/ApiUtils';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const DashboardAdmin = (props) => {
  const { authenticated, roleName, location, currentUser, onLogout } = props;


  const [number, setNumber] = useState();
  const [price, setPrice] = useState();

//   useEffect(() => {
//     fetchData();
//     priceMonth();
// }, []);

const fetchData = () => {
    getCountProduct().then(response => {
        setNumber(response.count)

    }).catch(
        error => {
            toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
        }
    )

}

const priceMonth = () => {
  getPriceMonth().then(response => {
    setPrice(response)

}).catch(
    error => {
        toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
    }
)
}

  useScript("../../assets/js/app.js");
    if (!authenticated) {
      return <Navigate
        to={{
          pathname: "/",
          state: { from: location }
        }} />;
    }

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490,1890, 2390, 3490];
  const xLabels = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
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

        {/* <main style={{ margin: "20px 20px 20px 20px" }}>
          <div className="container-fluid p-0">
            <h3><strong>✨</strong> Thông kê</h3>

            <div class="row">
              <div class="col-xl-6 col-xxl-5 d-flex">
                <div class="w-100">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Cửa Hàng</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="truck"></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">2</h1>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Nhân Viên</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="users"></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">7</h1>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Sản Phẩm</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="dollar-sign"></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">{number}</h1>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Doanh Thu</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="shopping-cart"></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">{price} VNĐ</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-6 col-xxl-7">
                <div class="card flex-fill w-100">
                  <div class="card-header">

                    <h5 class="card-title mb-0">Doanh Thu (Tháng)</h5>
                  </div>
                  <div class="card-body py-3">

                    <BarChart
                      xAxis={[
                        {
                          id: 'barCategories',
                          data: xLabels,
                          scaleType: 'band',
                        },
                      ]}
                      series={[
                        {
                          data:  uData,
                        },
                      ]}
                      width={800}
                      height={300}
                    />

                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-md-6 ">
                <div class="card">
                  <div class="card-header">

                    <h5 class="card-title mb-0">Sản phẩm bán nhiều</h5>
                  </div>
                  <div class="card-body d-flex">
                    <div class="align-self-center">
                      <PieChart
                        series={[
                          {
                            data: [
                              { id: 0, value: 10, label: 'Cafe Nâu Đa' },
                              { id: 1, value: 15, label: 'Cafe Đen' },
                              { id: 2, value: 20, label: 'Cafe Sữa' },
                            ],
                          },
                        ]}
                        width={400}
                        height={200}
                      />

                      <table class="table mb-0">
                        <tbody>
                          <tr>
                            <td>Cafe Nâu Đa</td>
                            <td class="text-end">10</td>
                          </tr>
                          <tr>
                            <td>Cafe Đen</td>
                            <td class="text-end">15</td>
                          </tr>
                          <tr>
                            <td>Cafe Sữa</td>
                            <td class="text-end">20</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main> */}
      </div>
    </div>
  )
}

export default DashboardAdmin;