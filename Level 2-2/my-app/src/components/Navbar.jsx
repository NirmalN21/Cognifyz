import NavItem from './NavItem'
import "../styles/navbar.css"

const Navbar = () => {

    const RenderMenu = () => {
        return (
            <>
                <NavItem to="/" name="Home" />
                <NavItem to="/about" name="About" />
                <NavItem to="/register" name="Register" />
                <NavItem to="/login" name="Login" />
                <NavItem to="/logout" name="Logout" />
            </>
        )
    }

    return (
        <>
            <div className='navbar-container'  >

                <div className="nav-items">
                    <RenderMenu />
                </div>

            </div>
        </>
    )
}

export default Navbar
