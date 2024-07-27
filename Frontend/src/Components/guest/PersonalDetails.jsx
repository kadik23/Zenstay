import { useReducer } from "react"
import useUserStore from "../../Hooks/useUserStore"

export default function PersonalDetails(){
  const [user,setUser] = useUserStore()
    const initState = {
        email:"",
        password:""
    }
    const Reducer = (state , action)=>{
        switch(action.type){
            case "SET_EMAIL": return{...state,email:action.payload}
            case "SET_PASSWORD":return{...state,password:action.payload}
            default :return state;
        }
    }
    
    const [state,dispatch] = useReducer(Reducer,initState) 
  return(
    <div className="p-5 row">
      <div className="col-8">
        <div className="mb-5">
          <h3>Personal details</h3>
          <span className="text-secondary">Edit your personal details</span>
        </div>
        <img src="https://github.com/mdo.png" alt="mdo" width="80" height="80" className="rounded-circle"/>
        <div className="mt-4 d-flex flex-column gap-4">
            <div className="row">
              <div className="col-3">
                <strong>Full Name</strong>
              </div>
              <div className="col-4">
                <span className="text-secondary">
                  Maria Lost
                </span>
              </div>
              <div className="col-1">
                <span className="text-secondary">
                  Edit
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <strong>Location</strong>
              </div>
              <div className="col-4">
                <span className="text-secondary">
                  Hamburg, Germany
                </span>
              </div>
              <div className="col-1">
                <span className="text-secondary">
                  Edit
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <strong>Email</strong>
              </div>
              <div className="col-4">
                <span className="text-secondary">
                  maria@lostpost.de
                </span>
              </div>
              <div className="col-1">
                <span className="text-secondary">
                  Edit
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <strong>Nationality</strong>
              </div>
              <div className="col-4">
                <span className="text-secondary">
                  German
                </span>
              </div>
              <div className="col-1">
                <span className="text-secondary">
                  Edit
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <strong>Date of birth</strong>
              </div>
              <div className="col-4">
                <span className="text-secondary">
                  06/11/1988
                </span>
              </div>
              <div className="col-1">
                <span className="text-secondary">
                  Edit
                </span>
              </div>
            </div>
        </div>
      </div>
      <div className="col-4 d-flex justify-content-end align-items-center">
        <div className="shadow rounded-4 w-md-75 p-3">
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
            <button className="btn btn-outline-primary rounded-pill w-100">Sign up now</button>
          </div>
        </div>
      </div>
    </div>  
  )
}