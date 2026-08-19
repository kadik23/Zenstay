import { useReducer, useState } from "react";
import useUserStore from "../../Hooks/useUserStore";
import { motion } from "framer-motion";
import axios from "axios";

export default function PersonalDetails() {
  const { user, setUser, logout, update } = useUserStore();
  const initState = {
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    telephone: user.telephone || "",
    email: user.email || "",
    location: user.location || "",
    nationality: user.nationality || "",
    date_of_birth: user.date_of_birth || "",
  };

  const [isEditing, setIsEditing] = useState({
    firstname: false,
    lastname: false,
    telephone: false,
    location: false,
    email: false,
    nationality: false,
    date_of_birth: false,
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

  const update_user = async () =>{
    await update()
  }

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

  const [state, dispatch] = useReducer(Reducer, initState);

  const Signout = async () => {
    const response = await logout();
    console.log(response);
    if (response) {
      window.location.href = "/";
    }
  };

  return (
    <div className="p-md-5 row">
      <div className="col-10 col-md-7">
        <div className="mb-5">
          <h3>Personal details</h3>
          <span className="text-secondary">Edit your personal details</span>
        </div>
        <div className="position-relative d-inline-block">
          <img src={imageUrl} alt="mdo" width="80" height="80" className="rounded-circle" style={{objectFit:"cover"}} />
          <label className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1" style={{cursor: 'pointer'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
              </svg>
              <input type="file" className="d-none" onChange={uploadPhoto} />
          </label>
        </div>
        <div className="mt-4 d-flex flex-column gap-4">
          {["firstname", "lastname", "location", "email",  "telephone", "nationality", "date_of_birth"].map((field) => (
            <div className="row" key={field}>
              <div className="col-4">
                <strong>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}</strong>
              </div>
              <div className="col-7 col-md-5">
                {isEditing[field] ? (
                  <motion.input
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    value={state[field]}
                    onChange={(e) => dispatch({ type: "SET_FIELD", field, payload: e.target.value })}
                    className="form-control"
                    placeholder={field}
                  />
                ) : (
                  <span className="text-secondary">
                    {state[field]}
                  </span>
                )}
              </div>
              <div className="col-1">
                {isEditing[field] ? (
                  <div className="d-flex">
                    <button onClick={() => handleSave(field)} className="btn btn-success ml-2 rounded-pill px-2 py-1 btn-sm me-2">Save</button>
                    <button onClick={() => handleEditToggle(field)} className="btn btn-danger rounded-pill px-2 py-1 btn-sm">Close</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditToggle(field)} className="btn btn-secondary rounded-pill px-2 py-1 btn-sm">Edit</button>
                )}
              </div>
            </div>
          ))}
            <button onClick={update_user} className="btn btn-outline-primary rounded-pill">Update</button>
        </div>
      </div>
      <div className="col-8 col-md-10 custom-sidebar-width mt-5 mt-md-0 d-flex justify-content-end align-items-center">
        <div className="shadow rounded-4 w-md-75 w-md-75 w-100 p-3">
          <strong>Pssst!</strong>
          <div className="mb-3 text-secondary">
            <span>
              Do you want to get secret <br />
              offers and best prices for <br />
              amazing stays?
            </span>
          </div>
          <div className="mb-3 text-secondary">
            <span>
              Sign up to join our Travel <br /> Club
            </span>
          </div>
          <div>
            <button onClick={() => alert("Thanks for joining our Travel Club! You will receive our secret offers soon.")} className="btn btn-outline-primary rounded-pill w-100">Sign up now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
