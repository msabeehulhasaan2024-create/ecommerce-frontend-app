import { useEffect, useState } from "react"
import { Col, Row, Typography, Table, Dropdown, Button, Modal, Form, Input, Select, message, Tag, Popconfirm, Card } from "antd"
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, QuestionCircleOutlined, ShoppingOutlined, FileTextOutlined } from "@ant-design/icons"
import { useAuth } from "@/context/Auth"
import dayjs from "dayjs"
import axios from "axios"
import Aos from "aos"

const { Title, Text, Paragraph } = Typography
const { Option } = Select

const initialState = { id: "", status: "" }

const Orders = () => {
  const [documents, setDocuments] = useState([])
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    Aos.init({ duration: 700, once: true })
  }, [])

  const handleViewProducts = (order) => {
    setSelectedOrder(order)
    setIsViewModalOpen(true)
  }

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  // Get All Orders
  useEffect(() => {
    setIsProcessing(true)
    const jwt = localStorage.getItem("token")

    axios.get(`${import.meta.env.VITE_API_URL}/orders/all`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          setDocuments(data.orders)
        }
      })
      .catch((err) => {
        console.error(err)
        message.error("Something went wrong while fetching orders")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }, [])

  // Show Modal or Open Modal Button
  const showModal = (id) => {
    setIsModalOpen(true)
    const jwt = localStorage.getItem("token")

    axios.get(`${import.meta.env.VITE_API_URL}/orders/single/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          setState(data.order)
        }
      })
      .catch((error) => {
        console.error(error)
        message.error("Something went wrong while fetching the order")
      })
  }

  // Handle Ok Button
  const handleOk = () => {
    let { id, status } = state
    if (id === "" || status === "") { return message.error("All fields are required") }

    const formData = { id, status }
    const jwt = localStorage.getItem("token")

    axios.patch(`${import.meta.env.VITE_API_URL}/orders/update/${state.id}`, formData, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          setDocuments(prevOrder => prevOrder.map(order => order.id === state.id ? data.updatedOrder : order))
          setIsModalOpen(false)
        }
      })
      .catch((error) => {
        console.error(error)
        message.error("Something went wrong while updating an order")
      })
  }

  // Handle Cancel Button
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // Delete Order Button
  const deleteOrder = (id) => {
    const jwt = localStorage.getItem("token")

    axios.delete(`${import.meta.env.VITE_API_URL}/orders/delete/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          const filteredDocuments = documents.filter(item => item.id !== id)
          setDocuments(filteredDocuments)
        }
      })
      .catch((error) => {
        console.error(error)
        message.error("Something went wrong while deleting an order")
      })
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "warning"
      case "processing": return "processing"
      case "shipped": return "cyan"
      case "delivered": return "success"
      case "cancelled": return "error"
      default: return "default"
    }
  }

  const getPaymentColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": return "success"
      case "failed": return "error"
      default: return "warning"
    }
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      render: text => (
        <span className="font-monospace text-primary fw-semibold" style={{ fontSize: "0.88rem" }}>
          #{text?.slice(-8) || text}
        </span>
      )
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: text => <span className="fw-bold text-dark">Rs. {Number(text || 0).toLocaleString()}</span>
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddress',
      render: text => (
        <div className="text-truncate" style={{ maxWidth: 220 }} title={text}>
          {text || "Standard Delivery"}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: text => (
        <Tag color={getStatusColor(text)} className="text-uppercase fw-semibold px-2 py-0" style={{ borderRadius: 6 }}>
          {text}
        </Tag>
      )
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      render: text => (
        <Tag color={getPaymentColor(text)} className="text-uppercase fw-semibold px-2 py-0" style={{ borderRadius: 6 }}>
          {text || "Pending"}
        </Tag>
      )
    },
    {
      title: 'Placed At',
      dataIndex: 'createdAt',
      render: text => <span className="text-muted small">{dayjs(text).format("DD-MMM-YYYY, hh:mm A")}</span>
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="d-flex align-items-center gap-2">
          <Button
            type="text"
            className="rounded-circle p-1"
            icon={<EyeOutlined style={{ fontSize: "1rem", color: "#4f46e5" }} />}
            onClick={() => handleViewProducts(record)}
            title="View Order Items"
          />
          {user?.role === "superAdmin" && (
            <Dropdown
              menu={{
                items: [
                  { label: "Update Status", key: "edit", icon: <EditOutlined />, onClick: () => { showModal(record.id) } },
                  {
                    label: (
                      <Popconfirm
                        title="Delete Order"
                        description="Are you sure you want to delete this order record?"
                        onConfirm={() => deleteOrder(record.id)}
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
              <Button type="text" className="rounded-circle p-1" icon={<MoreOutlined style={{ fontSize: "1.1rem" }} />} />
            </Dropdown>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="py-2" data-aos="fade-up">
      {/* Header Toolbar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2">
            <Title level={2} className="mb-0 font-heading fw-bold">Orders Management</Title>
            <Tag color="gold" className="fw-semibold px-2" style={{ borderRadius: 20 }}>
              {documents.length} Total
            </Tag>
          </div>
          <Paragraph className="text-muted mb-0 small">
            Track orders, inspect item details, payment status, and customer shipping addresses
          </Paragraph>
        </div>
      </div>

      {/* Orders Table Card */}
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

      {/* Update Order Status Modal */}
      <Modal
        title={<span className="fw-bold font-heading fs-5">Update Order Fulfillment Status</span>}
        confirmLoading={isProcessing}
        centered={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update Status"
        width={500}
      >
        <Form layout="vertical" className="pt-3">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label={<span className="fw-semibold text-dark">Order ID</span>} className="mb-3">
                <Input size="large" value={state.id} name="id" onChange={handleChange} disabled style={{ borderRadius: 8 }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={<span className="fw-semibold text-dark">Fulfillment Status</span>} required className="mb-2">
                <Select size="large" value={state.status} onChange={(value) => { setState({ ...state, status: value }) }} style={{ borderRadius: 8 }}>
                  <Option value="pending">Pending</Option>
                  <Option value="processing">Processing</Option>
                  <Option value="shipped">Shipped</Option>
                  <Option value="delivered">Delivered</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* View Order Products Modal (Receipt/Invoice View) */}
      <Modal
        title={
          <div className="d-flex align-items-center gap-2">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(79, 70, 229, 0.1)",
                color: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FileTextOutlined />
            </div>
            <span className="fw-bold font-heading fs-5">
              Order Receipt #{selectedOrder?.id?.slice(-8) || selectedOrder?.id}
            </span>
          </div>
        }
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsViewModalOpen(false)} style={{ borderRadius: 8 }}>
            Close Details
          </Button>
        ]}
        width={720}
        centered
      >
        {selectedOrder && (
          <div className="pt-2">
            {/* Summary Highlights */}
            <div className="p-3 rounded-3 mb-4" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <Row gutter={[16, 16]}>
                <Col xs={12} sm={6}>
                  <div className="text-muted small">Status</div>
                  <div className="mt-1">
                    <Tag color={getStatusColor(selectedOrder.status)} className="text-uppercase fw-semibold m-0">
                      {selectedOrder.status}
                    </Tag>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="text-muted small">Payment</div>
                  <div className="mt-1">
                    <Tag color={getPaymentColor(selectedOrder.paymentStatus)} className="text-uppercase fw-semibold m-0">
                      {selectedOrder.paymentStatus || "Pending"}
                    </Tag>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="text-muted small">Total Paid Amount</div>
                  <div className="fw-bold text-success fs-5">
                    Rs. {Number(selectedOrder.totalAmount || 0).toLocaleString()}
                  </div>
                </Col>
                <Col xs={24}>
                  <div className="text-muted small">Shipping Destination</div>
                  <div className="fw-semibold text-dark">
                    {selectedOrder.shippingAddress || "Not specified"}
                  </div>
                </Col>
              </Row>
            </div>

            {/* Products Table */}
            <Title level={5} className="mb-3 font-heading fw-bold d-flex align-items-center gap-2">
              <ShoppingOutlined className="text-primary" /> Purchased Items ({selectedOrder.products?.length || 0})
            </Title>
            <Table
              dataSource={selectedOrder.products}
              columns={[
                {
                  title: 'Item Name',
                  dataIndex: 'name',
                  render: text => <span className="fw-semibold text-dark text-capitalize">{text}</span>
                },
                {
                  title: 'Unit Price',
                  dataIndex: 'price',
                  render: text => <span>Rs. {Number(text || 0).toLocaleString()}</span>
                },
                {
                  title: 'Qty',
                  dataIndex: 'quantity',
                  render: text => <Tag color="blue">{text}</Tag>
                },
                {
                  title: 'Subtotal',
                  render: (_, item) => (
                    <span className="fw-bold text-dark">
                      Rs. {(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString()}
                    </span>
                  )
                }
              ]}
              pagination={false}
              rowKey="productId"
              size="small"
              bordered
            />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Orders