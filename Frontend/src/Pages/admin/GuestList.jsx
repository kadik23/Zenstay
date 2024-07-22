import React from 'react'
import search from '../../assets/icons/search-blue.png'
import more from '../../assets/icons/more.png'
import room from "../../assets/img/room5.jpg"
import axios from "axios";
import {useState,useEffect} from "react"

function GuestList() {
  const [guest, setGuest] = useState([]);
  useEffect(()=>{
      getOrders()
  }   
  ,[])
  async function getOrders(){
      try{
          let response = await axios.get('getUsers')
          if(response){
              console.log(response.data)
              setGuest(response.data)
          }else{
              console.log('some issues')
          }
      }catch(e){
          console.log(e)
      }
  }
  return (
    <div>
       <div className='mb-5 d-flex align-items-center justify-content-between'>
            <h3 className='fw-bold' style={{color:"#7d7d7d"}}>Guest List</h3>
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
                  <a href="#" className='text-decoration-none text-dark'>All Guests (457)</a>
                </div>
                <div className='fw-bold' style={{color:"#adadad"}}>
                  <a href="#" className='text-decoration-none text-secondary'>Booked (457)</a>
                </div>
                <div className='fw-bold' style={{color:"#adadad"}}>
                  <a href="#" className='text-decoration-none text-secondary'>new Booked (457)</a>
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
                <th scope="col">Guest Name</th>
                <th scope="col">Date order</th>
                <th scope="col">Check-in</th>
                <th scope="col">Check-out</th>
                <th scope="col">Reviews</th>
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
                  <div className='d-flex gap-4 align-items-center'>
                    <img src="https://github.com/mdo.png" alt="mdo" width="40" height="40" className="rounded-circle"/>
                    <div className='d-flex flex-column'>
                      <span  style={{fontWeight:"600",color:"#699cf4"}}>#0002</span>
                      <div className='d-flex flex-column'>
                        <strong >Jhonathen Smith</strong>
                        Join in january 28th 2020
                      </div>
                      
                    </div>
                  </div>
                </td>
                <td>
                  <div className='pt-3 h-100 d-flex flex-column'>
                    <small>
                      <strong className='d-flex flex-column'>
                        Sunday,Oct 24th, 2020 
                        <span style={{color:"#7d7d7d"}}>06:19 AM</span>
                      </strong>
                    </small>
                  </div>
                </td>
                <td>
                  <div className='pt-3 h-100 d-flex flex-column'>
                    <small>
                      <strong className='d-flex flex-column'>
                        Sunday,Oct 24th, 2020 
                        <span style={{color:"#7d7d7d"}}>06:19 AM</span>
                      </strong>
                    </small>
                  </div>
                  </td>
                <td>
                  <div className='pt-3 h-100 d-flex flex-column'>
                    <small>
                      <strong className='d-flex flex-column'>
                        Sunday,Oct 24th, 2020 
                        <span style={{color:"#7d7d7d"}}>06:19 AM</span>
                      </strong>
                    </small>
                  </div>
                </td>
                <td>
                  <div className='text-end pt-3 pe-5 h-100 d-flex flex-column'>
                    8/10
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

export default GuestList