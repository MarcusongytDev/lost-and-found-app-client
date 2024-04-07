import './GoogleMapsTemplate.css';
import navbaricon from '../../assets/navbar-dropdown-icon.png';

export default function GoogleMapsTemplate(){

    /* Set the width of the side navigation to 250px */
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
  
  /* Set the width of the side navigation to 0 */
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    return(

    <>
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
            <a href="/home">Home</a>
            <a href="/lostItemNotice">Lost Item Notice</a>
            <a href="/lostItemCatalog">Lost Item Catalog</a>
            <a href="/settings">Settings</a>
        </div>

        <span style={{ position:"fixed", right:"13px", top:"70px", fontSize:"30px", cursor:"pointer", zIndex:"1"}} onClick={openNav}><img className="gmaps-navbar-icon" src={navbaricon} alt="NavBar Icon"/></span>
        <div className='gmaps-template-cantfind'><a className="gmaps-template-link" href="/filteredSearch"><u>Can't find your item? Click here</u></a></div>
    </>
    )
}