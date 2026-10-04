import { ConfigProvider } from 'antd'
import './App.scss'
import ScreenLoader from './components/Misc/ScreenLoader'
import { useAuth } from './context/Auth'
import Routes from "./pages/Routes"

const App = () => {
  const { isAppLoading } = useAuth()
  return (
    <>
      <ConfigProvider theme={{
        token: {
          colorPrimary: "#4f46e5",
          colorInfo: "#06b6d4",
          colorSuccess: "#10b981",
          colorWarning: "#f59e0b",
          colorError: "#ef4444",
          borderRadius: 12,
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          controlOutline: "rgba(79, 70, 229, 0.15)",
        },
        components: {
          Button: {
            borderRadius: 10,
            controlHeight: 42,
            fontWeight: 600,
          },
          Card: {
            borderRadiusLG: 18,
          },
          Input: {
            borderRadius: 10,
            controlHeight: 44,
          },
          Select: {
            borderRadius: 10,
            controlHeight: 44,
          },
          Modal: {
            borderRadiusLG: 20,
          },
          Table: {
            borderRadiusLG: 14,
          }
        }
      }}>
        {!isAppLoading
          ? <Routes />
          : <ScreenLoader />
        }
      </ConfigProvider>
    </>
  )
}

export default App