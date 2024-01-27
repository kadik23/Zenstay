import React from 'react'
import search from '../assets/icons/search-blue.png'
import more from '../assets/icons/more.png'
import room from "../assets/img/room5.jpg"

function OrderList() {
  return (
    <div>
       <div className='mb-5 d-flex align-items-center justify-content-between'>
            <h3 className='fw-bold' style={{color:"#7d7d7d"}}>Order List</h3>
            <a className="d-block p-3 link-body-emphasis text-decoration-none bg-white d-flex align-items-center gap-1 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="40" height="40" className="rounded-circle me-2"/>
                <div className="d-flex flex-column user-select-none me-5">
                    <strong>Jhonathen Smith</strong>
                    <span style={{color:"#adadad"}}>Traveller Enthusiast</span>
                </div>
            </a>
        </div>
        <div className='mb-4'>
          <div className='d-flex justify-content-between gap-5'>
            <div className='flex-grow-1 px-5 me-auto bg-white d-flex align-items-center justify-content-between'>
                <div className='fw-bold border-bottom py-3 border-primary border-4 rounded-1'>
                  <a href="#" className='text-decoration-none text-dark'>All Orders( 457)</a>
                </div>
                <div className='fw-bold' style={{color:"#adadad"}}>
                  <a href="#" className='text-decoration-none text-secondary'>Completed (457)</a>
                </div>
                <div className='fw-bold' style={{color:"#adadad"}}>
                  <a href="#" className='text-decoration-none text-secondary'>Canceled (457)</a>
                </div>
            </div>
            <div className='flex-grow-1 bg-white d-flex align-items-center p-3'>
              <input type="text" 
                className='w-100 h-100 ps-3 py border-0' 
                placeholder='Search here'  
              />
              <img src={search} width={25} alt="" />
            </div>
          </div>
        </div>
        <div className=''>
          <table class="table">
            <thead>
              <tr >
                <th scope="col" className='ps-4'><input type="checkbox" /></th>
                <th scope="col">Order ID</th>
                <th scope="col">Username</th>
                <th scope="col">Room ID</th>
                <th scope="col">Date</th>
                <th scope="col">Room Facility</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className='ps-4'>
                  <div style={{paddingTop:"20px"}}>
                    <input className='d-flex align-items-center' type="checkbox" />
                  </div>
                </th>
                <td>
                  <div className='pt-2 d-flex flex-column text-primary' style={{fontWeight:"600"}}>
                    <span>#001</span>
                  </div>
                </td>
                <td>
                  <div className='pt-2 d-flex gap-4 align-items-center'>
                    <div className='d-flex flex-column' style={{fontWeight:"600"}}>
                      <span style={{color:"#699cf4"}}>#0002</span>
                      Deluxe B-0004
                    </div>
                  </div>
                </td>
                <td>
                  <div className='pt-2 h-100 d-flex flex-column'>
                    RFG-10
                  </div>
                  </td>
                <td>
                  <div className='pt-2 h-100 d-flex flex-column'>
                    <small>
                      <strong className='d-flex flex-column'>
                        Sunday,Oct 24th, 2020 
                        <span style={{color:"#7d7d7d"}}>06:19 AM</span>
                      </strong>
                    </small>
                  </div>
                </td>
                <td>
                  <div className='pt-2 h-100 d-flex flex-column'>
                    AC, Shower, Double Bed, Towel, Bathup,<br />Coffe Set,LED TV, Wifi
                  </div>
                </td>
                <td >
                  <div className='pt-2'>
                    <strong >$80</strong>
                  </div>
                </td>
                <td >
                  <div className='pt-2'>
                    <strong >$300</strong>
                  </div>
                </td>
                <td className=''>
                  <div className='pt-2 h-100 d-flex flex-column'>
                      <span className='fw-bold' style={{color:"#ff806f"}}>Pending</span>
                  </div>
                </td>
                <td className='pt-4'>
                  <a href='#'>
                    <img src={more} width={20} alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row" className='ps-4'>
                  <div style={{paddingTop:"20px"}}>
                    <input className='d-flex align-items-center' type="checkbox" />
                  </div>
                </th>
                <td>
                  <div className='pt-2 d-flex flex-column text-primary' style={{fontWeight:"600"}}>
                    <span>#002</span>
                  </div>
                </td>
                <td>
                  <div className='pt-2 d-flex gap-4 align-items-center'>
                    <div className='d-flex flex-column' style={{fontWeight:"600"}}>
                      <span style={{color:"#699cf4"}}>#0004</span>
                      King B-923
                    </div>
                  </div>
                </td>
                <td>
                  <div className='pt-2 h-100 d-flex flex-column'>
                    RFG-05
                  </div>
                  </td>
                <td>
                  <div className='pt-2 h-100 d-flex flex-column'>
                    <small>
                      <strong className='d-flex flex-column'>
                        Sunday,Oct 24th, 2020 
                        <span style={{color:"#7d7d7d"}}>06:19 AM</span>
                      </strong>
                    </small>
                  </div>
                </td>
                <td>
                  <div className='pt-2 h-100 d-flex flex-column'>
                    AC, Shower, Double Bed, Towel, Bathup,<br />Coffe Set,LED TV, Wifi
                  </div>
                </td>
                <td >
                  <div className='pt-2'>
                    <strong >$80</strong>
                  </div>
                </td>
                <td >
                  <div className='pt-2'>
                    <strong >$300</strong>
                  </div>
                </td>
                <td className=''>
                  <div className='pt-2 h-100 d-flex flex-column'>
                      <span className='fw-bold' style={{color:"#77da7e"}}>Completed</span>
                  </div>
                </td>
                <td className='pt-4'>
                  <a href='#'>
                    <img src={more} width={20} alt="" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

    </div>
  )
}

export default OrderList