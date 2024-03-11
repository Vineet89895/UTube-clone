import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo_icon from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/user_profile_icon.png";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  return (
    <nav className="flex-div">
      <div className="left-side flex-div">
        <img
          className="menu-icon"
          src={menu_icon}
          onClick={() => setSidebar((prev) => (prev === false ? true : false))}
          alt=""
        ></img>
        <Link to={"/"}>
          <img className="logo-icon" src={logo_icon} alt=""></img>
        </Link>
      </div>

      <div className="middle-side flex-div">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <img className="search-icon" src={search_icon} alt=""></img>
        </div>
      </div>

      <div className="right-side flex-div">
        <img src={upload_icon} alt=""></img>
        <img src={more_icon} alt=""></img>
        <img src={notification_icon} alt=""></img>
        <img className="user-icon" src={profile_icon} alt=""></img>
      </div>
    </nav>
  );
};

export default Navbar;
