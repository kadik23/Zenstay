import React, { useReducer, useState } from 'react';
import useUserStore from "../../Hooks/useUserStore";
import { motion } from "framer-motion";

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
                <img src={user.image || "https://github.com/mdo.png"} alt="Admin Avatar" width="100" height="100" className="rounded-circle shadow-sm" style={{objectFit:"cover"}} />
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
