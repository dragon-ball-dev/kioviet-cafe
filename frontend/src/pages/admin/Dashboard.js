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
  const { authenticated, role, location, currentUser, onLogout } = props;


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

  const uData = [0, 0, 0, 0, 0, 200000, 100000];
  const pData = [0, 0, 0, 0, 0, 0, 100000];
  const xLabels = [
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12',
    'T1',
  ];
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

        <main style={{ margin: "20px 20px 20px 20px" }}>
          <div class="container-fluid p-0">

            <h1 class="h3 mb-3"><strong>Phân tích </strong> Dashboard</h1>

            <div class="row">
              <div class="col-xl-6 col-xxl-5 d-flex">
                <div class="w-100">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Khách hàng</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">2</h1>
                          <div class="mb-0">
                            <span class="text-success"> <i class="mdi mdi-arrow-bottom-right"></i> 100% </span>
                            <span class="text-muted">Tuần trước</span>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Sản phẩm</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">8</h1>
                          <div class="mb-0">
                            <span class="text-success"> <i class="mdi mdi-arrow-bottom-right"></i> 100% </span>
                            <span class="text-muted">Tuần trước</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Doanh số</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">400,000 đ</h1>
                          <div class="mb-0">
                            <span class="text-success"> <i class="mdi mdi-arrow-bottom-right"></i> 100% </span>
                            <span class="text-muted">Tuần trước</span>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Đơn bán</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">3</h1>
                          <div class="mb-0">
                            <span class="text-success"> <i class="mdi mdi-arrow-bottom-right"></i> 100% </span>
                            <span class="text-muted">Tuần trước</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-6 col-xxl-7">
                <div class="card flex-fill w-100">
                  <div class="card-header">

                    <h5 class="card-title mb-0">Doanh số theo các tháng</h5>
                  </div>
                  <div class="card-body py-3">
                    <div class="chart chart-sm">
                      <BarChart
                        width={500}
                        height={300}
                        series={[
                          { data: pData, label: 'Cầu Giấy', id: 'pvId' },
                          { data: uData, label: 'Hoàn Kiếm', id: 'uvId' },
                        ]}
                        xAxis={[{ data: xLabels, scaleType: 'band' }]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
                <div class="card flex-fill w-100">
                  <div class="card-header">
                  </div>
                  <div class="card-body d-flex">
                    <div class="align-self-center w-100">
                      <div class="py-3">
                        <div class="chart chart-xs">
                          <PieChart
                            series={[
                              {
                                data: [
                                  { id: 0, value: 1, label: 'Cầu Giấy' },
                                  { id: 1, value: 1, label: 'Hoàn Kiếm' },

                                ],
                              },
                            ]}
                            width={400}
                            height={200}
                          />                        
                          </div>
                      </div>

                      <table class="table mb-0">
                        <tbody>
                          <tr>
                            <td>Cửa hàng khu vực Cầu Giấy</td>
                            <td class="text-end">1 (Nhân viên)</td>
                          </tr>
                          <tr>
                            <td>Cửa hàng khu vực Hoàn Kiếm</td>
                            <td class="text-end">1 (Nhân viên)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
                <div class="card flex-fill">
                  <div class="card-header">

                    <h5 class="card-title mb-0">Lịch làm việc</h5>
                  </div>
                  <div class="card-body d-flex">
                    <div class="align-self-center w-100">
                      <div class="chart">
                      <iframe src="https://calendar.google.com/calendar/embed?src=classroom114340045882805619780%40group.calendar.google.com&ctz=Asia%2FHo_Chi_Minh" style={{border:"solid 1px #777"}} width="440" height="600" frameborder="0" scrolling="no"></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>

  )
}

export default DashboardAdmin;