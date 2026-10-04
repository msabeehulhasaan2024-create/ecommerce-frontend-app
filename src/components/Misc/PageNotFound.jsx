import { Result } from 'antd'
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const PageNotFound = () => (
    <main className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "75vh" }}>
        <div className="modern-card p-5 text-center" style={{ maxWidth: 540 }}>
            <Result
                status="404"
                title={<span className="font-heading" style={{ fontSize: '4.5rem', fontWeight: 900, color: '#4f46e5' }}>404</span>}
                subTitle={<span style={{ fontSize: '1.1rem', color: '#64748b' }}>Oops! The page you are looking for doesn't exist or has moved.</span>}
                extra={
                    <Link to="/" className='btn btn-indigo d-inline-flex align-items-center gap-2'>
                        <HomeOutlined /> Return to Homepage
                    </Link>
                }
            />
        </div>
    </main>
)
export default PageNotFound