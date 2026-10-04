import { useEffect, useState } from "react"
import { Col, Row, Typography, Table, Dropdown, Button, Modal, Form, Input, Select, message, Popconfirm, Image, Tag, Card } from "antd"
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined, QuestionCircleOutlined, EyeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import axios from "axios"
import Aos from "aos"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TextArea } = Input

const initialState = { name: "", price: "", stock: "", category: "", description: "", status: "" }

const All = () => {
    const [documents, setDocuments] = useState([])
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    useEffect(() => {
        Aos.init({ duration: 700, once: true })
    }, [])

    // Get All Products
    useEffect(() => {
        setIsProcessing(true)
        const token = localStorage.getItem("token")

        axios.get(`${import.meta.env.VITE_API_URL}/products/all`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    setDocuments(data.products)
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while fetching products")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }, [])

    // Show Modal or Open Modal Button
    const showModal = (id) => {
        setIsModalOpen(true)
        setIsProcessing(true)

        const token = localStorage.getItem("token")

        axios.get(`${import.meta.env.VITE_API_URL}/products/single/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    message.success(data.message)
                    setState(data.product)
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while fetching product")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    // Handle Ok Button
    const handleOk = () => {
        let { id, uid, name, price, stock, category, description, status } = state

        if (name === "" || price === "" || stock === "" || category === "" || description === "" || status === "") {
            return message.error("All fields are required")
        }

        const formData = { id, uid, name, price, stock, category, description, status }

        setIsProcessing(true)
        const token = localStorage.getItem("token")

        axios.patch(`${import.meta.env.VITE_API_URL}/products/update/${id}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    message.success(data.message)
                    const updatedDocuments = documents.map(document => document.id === id ? data.updatedProduct : document)
                    setDocuments(updatedDocuments)
                    setIsModalOpen(false)
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while updating a product")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    // Handle Cancel Button
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    // Delete Product Button
    const deleteProduct = (id) => {
        setIsProcessing(true)
        const token = localStorage.getItem("token")

        axios.delete(`${import.meta.env.VITE_API_URL}/products/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const filteredDocuments = documents.filter(document => document.id !== id)
                    setDocuments(filteredDocuments)
                    message.success(data.message)
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while deleting a product")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    const columns = [
        {
            title: 'Product',
            dataIndex: 'imageURL',
            render: (text, record) => (
                <div className="d-flex align-items-center gap-3">
                    <Image
                        src={text}
                        alt={record.name}
                        width={54}
                        height={54}
                        style={{
                            borderRadius: 10,
                            objectFit: "cover",
                            border: "1px solid #e2e8f0"
                        }}
                    />
                    <div>
                        <div className="fw-bold text-dark text-capitalize" style={{ fontSize: "0.95rem" }}>{record.name}</div>
                        <div className="text-muted small">ID: <span className="font-monospace">{record.id?.slice(0, 8)}...</span></div>
                    </div>
                </div>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: text => (
                <Tag color="geekblue" className="text-capitalize px-2 py-0 fw-semibold" style={{ borderRadius: 6 }}>
                    {text}
                </Tag>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: text => <span className="fw-bold text-dark">Rs. {Number(text).toLocaleString()}</span>
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            render: text => {
                const stockVal = Number(text)
                const color = stockVal > 10 ? "green" : stockVal > 0 ? "orange" : "red"
                return (
                    <Tag color={color} className="fw-semibold px-2 py-0" style={{ borderRadius: 6 }}>
                        {stockVal} units
                    </Tag>
                )
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            render: text => (
                <Tag color={text === "active" ? "success" : "default"} className="text-uppercase fw-semibold" style={{ borderRadius: 6 }}>
                    {text}
                </Tag>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: text => (
                <div className="text-muted text-truncate" style={{ maxWidth: 200 }} title={text}>
                    {text}
                </div>
            )
        },
        {
            title: 'Created Time',
            dataIndex: 'createdAt',
            render: text => <span className="text-muted small">{dayjs(text).format("DD-MMM-YYYY, hh:mm A")}</span>
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            { label: "Edit Details", key: "edit", icon: <EditOutlined />, onClick: () => { showModal(record.id) } },
                            {
                                label: (
                                    <Popconfirm
                                        title="Delete Product"
                                        description="Are you sure you want to permanently delete this product?"
                                        onConfirm={() => deleteProduct(record.id)}
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    >
                                        Delete
                                    </Popconfirm>
                                ),
                                key: "delete",
                                icon: <DeleteOutlined />,
                                danger: true
                            }
                        ]
                    }}
                    trigger={['click']}
                >
                    <Button type="text" className="p-1 rounded-circle" icon={<MoreOutlined style={{ fontSize: "1.1rem" }} />} />
                </Dropdown>
            )
        }
    ]

    return (
        <div className="py-2" data-aos="fade-up">
            {/* Header Toolbar */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <div>
                    <div className="d-flex align-items-center gap-2">
                        <Title level={2} className="mb-0 font-heading fw-bold">Product Inventory</Title>
                        <Tag color="purple" className="fw-semibold px-2" style={{ borderRadius: 20 }}>
                            {documents.length} Total
                        </Tag>
                    </div>
                    <Paragraph className="text-muted mb-0 small">
                        Manage your live catalog items, pricing tiers, descriptions, and stock quantities
                    </Paragraph>
                </div>

                <Link
                    to="/dashboard/products/add"
                    className="btn btn-warning rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 fw-semibold shadow-sm text-decoration-none"
                    style={{ fontSize: "0.92rem" }}
                >
                    <PlusOutlined /> Add New Product
                </Link>
            </div>

            {/* Table Container */}
            <Card bordered={false} className="modern-card" style={{ borderRadius: 16 }} bodyStyle={{ padding: 0 }}>
                <Table
                    scroll={{ x: 'max-content' }}
                    columns={columns}
                    dataSource={documents}
                    rowKey="id"
                    loading={isProcessing}
                    pagination={{ pageSize: 8, showSizeChanger: true }}
                />
            </Card>

            {/* Edit Modal */}
            <Modal
                title={<span className="fw-bold font-heading fs-5">Edit Product Details</span>}
                confirmLoading={isProcessing}
                centered={true}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save Changes"
                width={620}
            >
                <Form layout="vertical" className="pt-2">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label={<span className="fw-semibold text-dark">Product Name</span>} required className="mb-3">
                                <Input size="large" value={state.name} placeholder="Enter product name" name="name" onChange={handleChange} style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<span className="fw-semibold text-dark">Price (Rs.)</span>} required className="mb-3">
                                <Input type="number" size="large" value={state.price} placeholder="Enter price" name="price" onChange={handleChange} style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<span className="fw-semibold text-dark">Stock Units</span>} required className="mb-3">
                                <Input type="number" size="large" value={state.stock} placeholder="Available units" name="stock" onChange={handleChange} style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<span className="fw-semibold text-dark">Category</span>} required className="mb-3">
                                <Select size="large" value={state.category} placeholder="Select a category" onChange={(value) => { setState({ ...state, category: value }) }} style={{ borderRadius: 8 }}>
                                    <Option value="electronics">Electronics</Option>
                                    <Option value="glasses">Glasses</Option>
                                    <Option value="furnitures">Furnitures</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<span className="fw-semibold text-dark">Publication Status</span>} required className="mb-3">
                                <Select size="large" value={state.status} placeholder="Select status" onChange={(value) => { setState({ ...state, status: value }) }} style={{ borderRadius: 8 }}>
                                    <Option value="active">Active (Visible)</Option>
                                    <Option value="inactive">Inactive (Hidden)</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label={<span className="fw-semibold text-dark">Product Description</span>} required className="mb-2">
                                <TextArea rows={4} placeholder="Describe features, material, and warranty..." value={state.description} name="description" onChange={handleChange} style={{ borderRadius: 8, resize: "none" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default All