import React from 'react'
import search from '../../assets/icons/search-blue.png'
import more from '../../assets/icons/more.png'
import room from "../../assets/img/room5.jpg"
import axios from "axios";
import {useState,useEffect} from "react"

function RoomList() {
  const [rooms, setRooms] = useState([]);
  useEffect(()=>{
      getRooms()
  }   
  ,[])
  async function getRooms(){
      try{
          let response = await axios.get('getAllRooms')
          if(response){
              console.log(response.data)
              setRooms(response.data)
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
            <div className='d-flex flex-column gap-1'>
                <h3 className='fw-bold mb-0' style={{color:"#2b2b2b"}}>Room List</h3>
            </div>
        </div>
        <div className='mb-4'>
          <div className='d-flex justify-content-between gap-5'>
            <div className='flex-grow-1 px-5 me-auto bg-white d-flex align-items-center justify-content-between'>
                <div className='fw-bold border-bottom py-3 border-primary border-4 rounded-1'>
                  <a href="#" className='text-decoration-none text-dark'>All Rooms (457)</a>
                </div>
                <div className='fw-bold' style={{color:"#adadad"}}>
                  <a href="#" className='text-decoration-none text-secondary'>Available Room (457)</a>
                </div>
                <div className='fw-bold' style={{color:"#adadad"}}>
                  <a href="#" className='text-decoration-none text-secondary'>Booked (457)</a>
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
                <th scope="col">Room Name</th>
                <th scope="col">Bad Type</th>
                <th scope="col">Room Floor</th>
                <th scope="col">Room Facility</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className='ps-4'>
                  <div style={{paddingTop:"40px"}}>
                    <input className='d-flex align-items-center' type="checkbox" />
                  </div>
                </th>
                <td>
                  <div className='d-flex gap-4 align-items-center'>
                    <img src={room} width={200} height={100} 
                      className='rounded-3' 
                      style={{objectFit:"cover"}} alt="" 
                    />
                    <div className='d-flex flex-column' style={{fontWeight:"600"}}>
                      <span>#0002</span>
                      Deluxe B-0004
                    </div>
                  </div>
                </td>
                <td>
                  <div className='pt-4 h-100 d-flex flex-column'>
                    Double Bed
                  </div>
                </td>
                <td>
                  <div className='pt-4 h-100 d-flex flex-column'>
                    Floor G-05
                  </div>
                  </td>
                <td>
                  <div className='pt-4 h-100 d-flex flex-column'>
                    AC, Shower, Double Bed, Towel, Bathup,<br />Coffe Set,LED TV, Wifi
                  </div>
                </td>
                <td>
                  <div className='pt-4 h-100 d-flex flex-column'>
                    <span className='fw-bold' style={{color:"#ff806f"}}>Booked</span>
                    Oct 24th - 26th
                  </div>
                </td>
                <td className='pt-5'>
                  <a href='#'>
                    <img src={more} width={20} alt="" />
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row" className='ps-4'>
                  <div style={{paddingTop:"40px"}}>
                    <input className='d-flex align-items-center' type="checkbox" />
                  </div>
                </th>
                <td>
                  <div className='d-flex gap-4 align-items-center'>
                    <img src={room} width={200} height={100} 
                      className='rounded-3' 
                      style={{objectFit:"cover"}} alt="" 
                    />
                    <div className='d-flex flex-column' style={{fontWeight:"600"}}>
                      <span>#0004</span>
                      King B-923
                    </div>
                  </div>
                </td>
                <td>
                  <div className='pt-4 h-100 d-flex flex-column'>
                    Double Bed
                  </div>
                </td>
                <td>
                  <div className='pt-4 h-100 d-flex flex-column'>
                    Floor G-05
                  </div>
                  </td>
                <td>
                  <div className='pt-4 h-100 d-flex flex-column'>
                    AC, Shower, Double Bed, Towel, Bathup,<br />Coffe Set,LED TV, Wifi
                  </div>
                </td>
                <td>
                  <div className='pt-4 h-100 d-flex flex-column'>
                    <span className='fw-bold' style={{color:"#77da7e"}}>Available</span>
                  </div>
                </td>
                <td className='pt-5'>
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

export default RoomList