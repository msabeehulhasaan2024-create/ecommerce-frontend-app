import { message } from "antd"
import axios from "axios"
import { createContext, useContext, useEffect, useReducer, useState } from "react"

const AuthContext = createContext()

const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {

    switch (type) {
        case "SET_LOGIN":
            return { isAuth: true, user: payload.user }
        case "SET_LOGOUT":
            return initialState
        default:
            return state
    }
}

const Auth = ({ children }) => {
    const [isAppLoading, setIsAppLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)
    const [cart, setCart] = useState([])
    const { isAuth, user } = state

    // Load cart on login or user change
    useEffect(() => {
        if (isAuth && user?.uid) {
            const savedCart = localStorage.getItem(`cart_${user.uid}`)
            if (savedCart) {
                try {
                    setCart(JSON.parse(savedCart))
                } catch (e) {
                    console.error("Error parsing cart", e)
                    setCart([])
                }
            } else {
                setCart([])
            }
        } else {
            setCart([])
        }
    }, [isAuth, user?.uid])

    const readProfile = (token) => {
        const jwt = token || localStorage.getItem("token")
        if (!jwt) {
            setTimeout(() => {
                setIsAppLoading(false)
            }, 2000);
            return
        }

        axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, { headers: { Authorization: `Bearer ${jwt}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    dispatch({ type: "SET_LOGIN", payload: { user: data.user } })
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while fetching user")
            })
        setTimeout(() => {
            setIsAppLoading(false)
        }, 2000)
    }

    useEffect(() => { readProfile() }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch({ type: "SET_LOGOUT" })
        message.success("Logout successful")
    }

    const addToCart = (product) => {
        if (!isAuth) {
            message.error("Please login to add items to cart")
            return false
        }
        if (user?.role !== "customer") {
            message.error("Only customers can add items to cart")
            return false
        }

        let added = false
        setCart(prevCart => {
            const existingIndex = prevCart.findIndex(item => item.id === product.id)
            let updatedCart
            if (existingIndex > -1) {
                updatedCart = prevCart.map((item, idx) => {
                    if (idx === existingIndex) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                })
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1 }]
            }
            localStorage.setItem(`cart_${state.user.uid}`, JSON.stringify(updatedCart))
            added = true
            return updatedCart
        })
        message.success(`${product.name} added to cart`)
        return added
    }

    const removeFromCart = (productId) => {
        if (!isAuth || !user?.uid) return
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== productId)
            localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart))
            return updatedCart
        })
        message.success("Item removed from cart")
    }

    const updateQuantity = (productId, newQty) => {
        if (!isAuth || !user?.uid) return
        const qty = Number(newQty)
        if (qty < 1) return
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === productId) {
                    if (qty > item.stock) {
                        message.warning(`Quantity cannot exceed available stock (${item.stock})`)
                        return { ...item, quantity: item.stock }
                    }
                    return { ...item, quantity: qty }
                }
                return item
            })
            localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart))
            return updatedCart
        })
    }

    const clearCart = () => {
        if (!user?.uid) return
        setCart([])
        localStorage.removeItem(`cart_${user.uid}`)
    }

    return (
        <AuthContext.Provider value={{ ...state, isAppLoading, dispatch, readProfile, handleLogout, cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </AuthContext.Provider >
    )
}

export default Auth

export const useAuth = () => { return useContext(AuthContext) }