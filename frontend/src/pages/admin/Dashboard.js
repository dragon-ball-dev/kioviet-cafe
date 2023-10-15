import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import '../../assets/css/app.css';
import useScript from '../../components/useScripts';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

const DashboardAdmin = (props) => {
  const { authenticated, roleName, location, currentUser, onLogout } = props;


  const [number, setNumber] = useState({
    numberOfAccount: '',
    numberOfApprove: '',
    numberOfApproving: '',
    numberOfAccountLocked: '',
  });

  useScript("../../assets/js/app.js");
    if (!authenticated) {
      return <Navigate
        to={{
          pathname: "/",
          state: { from: location }
        }} />;
    }

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
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

        <main style={{ margin: "20px 20px 20px 20px" }}>
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
                              <h5 class="card-title">Sales</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="truck"></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">2.382</h1>
                          <div class="mb-0">
                            <span class="text-danger"> <i class="mdi mdi-arrow-bottom-right"></i> -3.65% </span>
                            <span class="text-muted">Since last week</span>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Visitors</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="users"></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">14.212</h1>
                          <div class="mb-0">
                            <span class="text-success"> <i class="mdi mdi-arrow-bottom-right"></i> 5.25% </span>
                            <span class="text-muted">Since last week</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Earnings</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="dollar-sign"></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">$21.300</h1>
                          <div class="mb-0">
                            <span class="text-success"> <i class="mdi mdi-arrow-bottom-right"></i> 6.65% </span>
                            <span class="text-muted">Since last week</span>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">Orders</h5>
                            </div>

                            <div class="col-auto">
                              <div class="stat text-primary">
                                <i class="align-middle" data-feather="shopping-cart"></i>
                              </div>
                            </div>
                          </div>
                          <h1 class="mt-1 mb-3">64</h1>
                          <div class="mb-0">
                            <span class="text-danger"> <i class="mdi mdi-arrow-bottom-right"></i> -2.25% </span>
                            <span class="text-muted">Since last week</span>
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

                    <h5 class="card-title mb-0">Recent Movement</h5>
                  </div>
                  <div class="card-body py-3">

                    <BarChart
                      xAxis={[
                        {
                          id: 'barCategories',
                          data: ['bar A', 'bar B', 'bar C', 'bar D'],
                          scaleType: 'band',
                        },
                      ]}
                      series={[
                        {
                          data: [2, 5, 3, 5],
                        },
                      ]}
                      width={500}
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

                    <h5 class="card-title mb-0">Browser Usage</h5>
                  </div>
                  <div class="card-body d-flex">
                    <div class="align-self-center">
                      <PieChart
                        series={[
                          {
                            data: [
                              { id: 0, value: 10, label: 'series A' },
                              { id: 1, value: 15, label: 'series B' },
                              { id: 2, value: 20, label: 'series C' },
                            ],
                          },
                        ]}
                        width={400}
                        height={200}
                      />

                      <table class="table mb-0">
                        <tbody>
                          <tr>
                            <td>Chrome</td>
                            <td class="text-end">4306</td>
                          </tr>
                          <tr>
                            <td>Firefox</td>
                            <td class="text-end">3801</td>
                          </tr>
                          <tr>
                            <td>IE</td>
                            <td class="text-end">1689</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                <div class="card flex-fill w-100">
                  <div class="card-header">

                    <h5 class="card-title mb-0">Real-Time</h5>
                  </div>
                  <div class="card-body px-4">
                    <LineChart
                      width={500}
                      height={300}
                      series={[{ data: uData, label: 'uv', area: true, showMark: false }]}
                      xAxis={[{ scaleType: 'point', data: xLabels }]}
                      sx={{
                        '.MuiLineElement-root': {
                          display: 'none',
                        },
                      }}
                    />
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