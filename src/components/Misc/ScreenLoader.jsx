import { ShopOutlined } from "@ant-design/icons"

const ScreenLoader = () => {
    return (
        <div className="screen-loader">
            <div className="loader-container">
                <div className="loader-ring"></div>
                <div className="loader-ring-inner"></div>
                <ShopOutlined className="loader-icon" />
            </div>
            <div className="text-center">
                <div className="loader-text">ApexStore</div>
                <div className="loader-subtext mt-1">Preparing your marketplace...</div>
            </div>
        </div>
    )
}

export default ScreenLoader