import { useEffect, useState } from "react"
import { Col, Row, Typography, Table, Dropdown, Button, Modal, Form, Input, Select, message, Tag, Popconfirm, Card, Avatar } from "antd"
import { DeleteOutlined, EditOutlined, MoreOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import axios from "axios"
import Aos from "aos"

const { Title, Text, Paragraph } = Typography
const { Option } = Select

const initialState = { fullName: "", role: "", status: "" }

const Users = () => {
  const [documents, setDocuments] = useState([])
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  useEffect(() => {
    Aos.init({ duration: 700, once: true })
  }, [])

  // Get All Users
  useEffect(() => {
    setIsProcessing(true)
    const jwt = localStorage.getItem("token")

    axios.get(`${import.meta.env.VITE_API_URL}/auth/users`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          setDocuments(data.users)
        }
      })
      .catch((err) => {
        console.error(err)
        message.error("Something went wrong while fetching users")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }, [])

  // Show Modal or Open Modal Button
  const showModal = (_id) => {
    setIsModalOpen(true)
    const jwt = localStorage.getItem("token")

    axios.get(`${import.meta.env.VITE_API_URL}/auth/single/user/${_id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          setState(data.singleUser)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // Handle Ok Button
  const handleOk = () => {
    let { fullName, role, status } = state
    if (fullName === "" || role === "" || status === "") { return message.error("All fields are required") }

    const formData = { fullName, role, status }
    const jwt = localStorage.getItem("token")

    axios.patch(`${import.meta.env.VITE_API_URL}/auth/update-user-by-admin/${state._id}`, formData, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          setDocuments(prevUser => prevUser.map(user => user.uid === state.uid ? data.updatedUser : user))
          setIsModalOpen(false)
        }
      })
      .catch((err) => {
        console.error(err)
        message.error("Something went wrong while updating a user")
      })
  }

  // Handle Cancel Button
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // Delete User Button
  const deleteUser = (_id) => {
    const jwt = localStorage.getItem("token")

    axios.delete(`${import.meta.env.VITE_API_URL}/auth/delete-user-by-admin/${_id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          const filteredDocuments = documents.filter(item => item._id !== _id)
          setDocuments(filteredDocuments)
        }
      })
      .catch((err) => {
        console.error(err)
        message.error("Something went wrong while deleting a user")
      })
  }

  const columns = [
    {
      title: 'Member',
      dataIndex: 'fullName',
      render: (text, record) => (
        <div className="d-flex align-items-center gap-3">
          <Avatar
            size={40}
            style={{
              background: record.role === 'superAdmin' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              fontWeight: 700,
              color: '#ffffff'
            }}
          >
            {text ? text[0].toUpperCase() : <UserOutlined />}
          </Avatar>
          <div>
            <div className="fw-bold text-dark text-capitalize" style={{ fontSize: "0.95rem" }}>{text || "Unnamed Member"}</div>
            <div className="text-muted small">{record.email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Account Role',
      dataIndex: 'role',
      render: text => (
        <Tag color={text === 'superAdmin' ? 'gold' : 'blue'} className="text-uppercase fw-semibold px-2 py-0" style={{ borderRadius: 6 }}>
          {text === 'superAdmin' ? 'Super Admin' : 'Customer'}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: text => (
        <Tag color={text === 'active' ? 'success' : 'default'} className="text-uppercase fw-semibold px-2 py-0" style={{ borderRadius: 6 }}>
          {text || 'Active'}
        </Tag>
      )
    },
    {
      title: 'Registered On',
      dataIndex: 'createdAt',
      render: text => <span className="text-muted small">{dayjs(text).format("DD-MMM-YYYY, hh:mm A")}</span>
    },
    {
      title: 'Last Modified',
      dataIndex: 'updatedAt',
      render: text => <span className="text-muted small">{dayjs(text).format("DD-MMM-YYYY, hh:mm A")}</span>
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              { label: "Edit Role & Status", key: "edit", icon: <EditOutlined />, onClick: () => { showModal(record._id) } },
              {
                label: (
                  <Popconfirm
                    title="Delete User"
                    description="Are you sure you want to permanently delete this user account?"
                    onConfirm={() => deleteUser(record._id)}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  >
                    Delete Account
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
      )
    }
  ]

  return (
    <div className="py-2" data-aos="fade-up">
      {/* Header Toolbar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2">
            <Title level={2} className="mb-0 font-heading fw-bold">User Directory</Title>
            <Tag color="cyan" className="fw-semibold px-2" style={{ borderRadius: 20 }}>
              {documents.length} Accounts
            </Tag>
          </div>
          <Paragraph className="text-muted mb-0 small">
            Manage authenticated marketplace shoppers, administrators, permissions, and account status
          </Paragraph>
        </div>
      </div>

      {/* Users Table Card */}
      <Card bordered={false} className="modern-card" style={{ borderRadius: 16 }} bodyStyle={{ padding: 0 }}>
        <Table
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={documents}
          rowKey={(record) => record.uid || record._id}
          loading={isProcessing}
          pagination={{ pageSize: 8, showSizeChanger: true }}
        />
      </Card>

      {/* Edit User Modal */}
      <Modal
        title={<span className="fw-bold font-heading fs-5">Edit User Role & Permissions</span>}
        confirmLoading={isProcessing}
        centered={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save Changes"
        width={500}
      >
        <Form layout="vertical" className="pt-3">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label={<span className="fw-semibold text-dark">Full Name</span>} required className="mb-3">
                <Input size="large" value={state.fullName} name="fullName" onChange={handleChange} disabled style={{ borderRadius: 8 }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={<span className="fw-semibold text-dark">Assigned Role</span>} required className="mb-3">
                <Select size="large" value={state.role} onChange={(value) => { setState({ ...state, role: value }) }} style={{ borderRadius: 8 }}>
                  <Option value="customer">Customer (Standard User)</Option>
                  <Option value="superAdmin">Super Admin (Full Access)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={<span className="fw-semibold text-dark">Account Status</span>} required className="mb-2">
                <Select size="large" value={state.status} onChange={(value) => { setState({ ...state, status: value }) }} style={{ borderRadius: 8 }}>
                  <Option value="active">Active (Access Granted)</Option>
                  <Option value="inactive">Inactive (Suspended)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default Users