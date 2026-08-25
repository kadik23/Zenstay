import React, { useReducer, useState } from 'react';
import useUserStore from "../../Hooks/useUserStore";
import { motion } from "framer-motion";
import axios from "axios";

export default function ProfileAdmin() {
  const { user, setUser, update } = useUserStore();
  
  if (!user) {
    return <div className="p-5">Loading profile...</div>;
  }

  const initState = {
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    location: user.location || "",
    nationality: user.nationality || "",
    date_of_birth: user.date_of_birth || "",
    telephone: user.telephone || ""
  };

  const [isEditing, setIsEditing] = useState({
    firstname: false,
    lastname: false,
    location: false,
    email: false,
    nationality: false,
    date_of_birth: false,
    telephone: false
  });

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (field) => {
    setUser({ ...user, [field]: state[field] });
    handleEditToggle(field);
  };

  const Reducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(Reducer, initState);

  const update_user = async () => {
    await update();
  };

  const uploadPhoto = async (ev) => {
    const files = ev.target.files;
    if (files.length > 0) {
      const data = new FormData();
      data.set('photos', files[0]);
      try {
        const response = await axios.post('/upload_photos', data, {
          headers: {'Content-Type': 'multipart/form-data'}
        });
        const filename = response.data[0];
        setUser({ ...user, image: filename });
      } catch (e) {
        console.error(e);
        alert('Upload failed');
      }
    }
  };

  const imageUrl = user?.image ? (user.image.startsWith('http') ? user.image : `http://localhost:3000/uploads/${user.image}`) : "https://github.com/mdo.png";

  return (
    <div>
        <div className='mb-5 d-flex align-items-center justify-content-between'>
            <div className='d-flex flex-column gap-1'>
                <h3 className='fw-bold mb-0' style={{color:"#2b2b2b"}}>Admin Profile</h3>
                <span className="text-secondary">Edit your personal details</span>
            </div>
        </div>
        
        <div className="bg-white rounded-4 shadow-sm p-5" style={{ maxWidth: '800px' }}>
            <div className="mb-5 d-flex align-items-center gap-4">
                <div className="position-relative">
                    <img src={imageUrl} alt="Admin Avatar" width="100" height="100" className="rounded-circle shadow-sm" style={{objectFit:"cover"}} />
                    <label className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1" style={{cursor: 'pointer'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                        <input type="file" className="d-none" onChange={uploadPhoto} />
                    </label>
                </div>
                <div>
                    <h4 className="fw-bold mb-1">{state.firstname} {state.lastname}</h4>
                    <span className="badge bg-primary rounded-pill px-3 py-1">Administrator</span>
                </div>
            </div>

            <div className="d-flex flex-column gap-4">
            {["firstname", "lastname", "location", "email", "telephone", "nationality", "date_of_birth"].map((field) => (
                <div className="row align-items-center border-bottom pb-3" key={field}>
                <div className="col-4">
                    <strong className="text-secondary">{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}</strong>
                </div>
                <div className="col-5">
                    {isEditing[field] ? (
                    <motion.input
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        value={state[field]}
                        onChange={(e) => dispatch({ type: "SET_FIELD", field, payload: e.target.value })}
                        className="form-control rounded-3"
                        placeholder={field}
                    />
                    ) : (
                    <span className="fw-medium">
                        {state[field] || <span className="text-muted fst-italic">Not set</span>}
                    </span>
                    )}
                </div>
                <div className="col-3 text-end">
                    {isEditing[field] ? (
                    <div className="d-flex justify-content-end gap-2">
                        <button onClick={() => handleSave(field)} className="btn btn-success rounded-pill px-3 py-1 btn-sm fw-bold shadow-sm">Save</button>
                        <button onClick={() => handleEditToggle(field)} className="btn btn-light rounded-pill px-3 py-1 btn-sm fw-bold shadow-sm">Cancel</button>
                    </div>
                    ) : (
                    <button onClick={() => handleEditToggle(field)} className="btn btn-outline-primary rounded-pill px-4 py-1 btn-sm fw-bold">Edit</button>
                    )}
                </div>
                </div>
            ))}
            </div>
            
            <div className="mt-5 d-flex justify-content-end">
                <button onClick={update_user} className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow-sm fs-5">Update Profile</button>
            </div>
        </div>
    </div>
  );
}
