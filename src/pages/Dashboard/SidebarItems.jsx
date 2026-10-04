import { HomeOutlined, ProductOutlined, UnorderedListOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const sidebarItems = [
    { key: "1", label: <Link to="/dashboard" className='text-decoration-none'>Home</Link>, icon: <HomeOutlined /> },
    { key: "2", label: <Link to="/dashboard/products" className='text-decoration-none'>Products</Link>, icon: <ProductOutlined />, allowedroles: ["superAdmin"] },
    { key: "3", label: <Link to="/dashboard/orders" className='text-decoration-none'>Orders</Link>, icon: <UnorderedListOutlined />, allowedroles: ["superAdmin", "customer"] },
    { key: "4", label: <Link to="/dashboard/users" className='text-decoration-none'>Users</Link>, icon: <TeamOutlined />, allowedroles: ["superAdmin"] },

]
export default sidebarItems