import "./Navbar.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import canvasStoreService from '../../services/canvas-store.service'
import { CanvasContext } from "../../context/canvas.context";


function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { navbarComponents , bodyComponents , footerComponents} = useContext(CanvasContext);
  const [websiteID, setWebsiteID] = useState('')
  const location = useLocation();

  const regex = /^.*\/websites\/edit\/(\w+)$/;
  const match = location.pathname.match(regex);

  useEffect(() => {
    if (match) {
      const id = match[1];
      setWebsiteID(id);
    }
   
  }, [match])
  
 const saveChangesBTN = () => {
  let siteData = {
    id:websiteID,
    navbarComponents,
    bodyComponents,
    footerComponents
  }

  canvasStoreService.saveChanges(siteData).then((res) =>
  console.log(res.data))

  }



  const isEditPage = /^\/websites\/edit\/\w+$/.test(location.pathname)

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>

          <Link to="/dashboard">
            <button>Dashboard</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <span>{user && user.name}</span>
        </>
      )} 

        {isEditPage &&(
       <button onClick={() => saveChangesBTN()}>Save Changes</button>
      )}
     


      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
           
    </nav>
  );
}

export default Navbar;
