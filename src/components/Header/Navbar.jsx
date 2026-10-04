import { useState, useEffect } from "react"
import { useAuth } from "@/context/Auth"
import {
    DashboardOutlined,
    LoginOutlined,
    LogoutOutlined,
    ShopOutlined,
    UserAddOutlined,
    ShoppingCartOutlined,
    MenuOutlined,
    CloseOutlined
} from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
    const { isAuth, user, handleLogout, cart } = useAuth()
    const [navOpen, setNavOpen] = useState(false)
    const location = useLocation()

    let totalCartQuantity = 0
    if (cart) {
        for (const item of cart) {
            totalCartQuantity += item.quantity
        }
    }

    // Auto-close mobile menu on route change
    useEffect(() => {
        setNavOpen(false)
    }, [location.pathname])

    const isActive = (path) => location.pathname === path

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg luxury-navbar navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <div className="brand-icon-wrap">
                            <ShopOutlined style={{ fontSize: "20px" }} />
                        </div>
                        <span>Apex<span style={{ color: "#f59e0b" }}>Store</span></span>
                    </Link>

                    {/* Mobile quick actions: Cart pill + Hamburger toggle */}
                    <div className="d-flex align-items-center gap-2 d-lg-none">
                        {isAuth && user?.role === 'customer' && (
                            <Link to="/cart" className="cart-pill text-decoration-none py-1 px-2" style={{ fontSize: '0.8rem' }}>
                                <ShoppingCartOutlined style={{ fontSize: '15px' }} />
                                <span className="badge-count" style={{ padding: '1px 5px', fontSize: '0.7rem' }}>
                                    {totalCartQuantity}
                                </span>
                            </Link>
                        )}

                        <button 
                            className="btn btn-glass d-flex align-items-center justify-content-center p-2 border-0 shadow-none text-white" 
                            type="button" 
                            onClick={() => setNavOpen(!navOpen)}
                            aria-expanded={navOpen} 
                            aria-label="Toggle navigation"
                            style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.08)' }}
                        >
                            {navOpen ? <CloseOutlined style={{ fontSize: '18px' }} /> : <MenuOutlined style={{ fontSize: '18px' }} />}
                        </button>
                    </div>

                    <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
                            <li className="nav-item">
                                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
                                    Services
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
                                    Contact
                                </Link>
                            </li>
                            {isAuth && user?.role === 'customer' && (
                                <li className="nav-item ms-lg-2 my-2 my-lg-0 d-none d-lg-block">
                                    <Link to="/cart" className="cart-pill text-decoration-none">
                                        <ShoppingCartOutlined style={{ fontSize: '17px' }} />
                                        <span>Cart</span>
                                        <span className="badge-count">{totalCartQuantity}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>

                        <div className="mobile-auth-actions d-lg-flex align-items-center gap-2 mt-3 mt-lg-0">
                            {!isAuth ? (
                                <>
                                    <Link to="/auth/login" className="btn btn-glass text-decoration-none d-flex align-items-center gap-2" onClick={() => setNavOpen(false)}>
                                        <LoginOutlined /> Login
                                    </Link>
                                    <Link to="/auth/register" className="btn btn-gold text-decoration-none d-flex align-items-center gap-2" onClick={() => setNavOpen(false)}>
                                        <UserAddOutlined /> Register
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/dashboard" className="btn btn-gold text-decoration-none d-flex align-items-center gap-2" onClick={() => setNavOpen(false)}>
                                        <DashboardOutlined /> Dashboard
                                    </Link>
                                    <button
                                        className="btn btn-glass d-flex align-items-center gap-2"
                                        onClick={() => {
                                            setNavOpen(false)
                                            handleLogout()
                                        }}
                                    >
                                        <LogoutOutlined /> Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar