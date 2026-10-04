import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Products from "./Products"
import Orders from "./Orders"
import Users from "./Users"
import ProtectedRoute from "@/components/Misc/ProtectedRoute"
import PageNotFound from "@/components/Misc/PageNotFound"

const Index = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/*" element={<ProtectedRoute allowedroles={['superAdmin']} Component={Products} />} />
                <Route path="/orders/*" element={<ProtectedRoute allowedroles={['superAdmin', 'customer']} Component={Orders} />} />
                <Route path="/users/*" element={<ProtectedRoute allowedroles={["superAdmin"]} Component={Users} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default Index