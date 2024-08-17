import { useReducer, useState } from "react";
import useUserStore from "../../Hooks/useUserStore";
import { motion } from "framer-motion";

export default function PersonalDetails() {
  const { user, setUser, logout, update } = useUserStore();
  const initState = {
    name: user.firstname + " " + user.lastname || "",
    email: user.email || "",
    location: user.location || "",
    nationality: user.nationality || "",
    date_of_birth: user.date_of_birth || "",
  };

  const [isEditing, setIsEditing] = useState({
    name: false,
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
        <img src="https://github.com/mdo.png" alt="mdo" width="80" height="80" className="rounded-circle" />
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
            <button onClick={Signout} className="btn btn-outline-primary rounded-pill w-100">Sign up now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
