import useBreadcrumb from "@/hooks/use_breadcrumb";
import useFetchTable from "@/hooks/use_fetch_table";
import dayjs from "@/utils/dayjs";
import request from "@/utils/request";
import Popconfirm from "antd/lib/popconfirm";
import Switch from "antd/lib/switch";
import Tag from "antd/lib/tag";
import React, { FC, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Table } from 'antd';
type AdminUserProps = {}

const FormItem = Form.Item;

const typeMapList = [
  { value: 1, label: "github用户"},
  { value: 2, label: "注册用户"}
]
const AdminUser: FC<{}> = () => {
  useBreadcrumb(['用户管理']);
  const [queryParams, setQueryParams] = useState({});
  const [form] = Form.useForm();

  const { tableProps, updateList, onSearch } = useFetchTable({
    requestUrl: '/user/list',
    queryParams,
    columns: [
      { title: '用户名', dataIndex: 'username' },
      { title: '邮箱', dataIndex: 'email' },
      // {
      //   title: '邮件通知',
      //   dataIndex: 'notice',
      //   render: (text: boolean, record: { id: any; }) => (
      //     <Switch
      //       defaultChecked={text}
      //       onChange={checked => updateList(() => request(`/user/${record.id}`, { notice: checked }))}
      //     />
      //   )
      // },
      // {
      //   title: '禁言',
      //   dataIndex: 'disabledDiscuss',
      //   render: (text, record) => (
      //     <Switch
      //       defaultChecked={text}
      //       onChange={checked => updateList(() => axios.put(`/user/${record.id}`, { disabledDiscuss: checked }))}
      //     />
      //   )
      // },
      {
        title: '用户类型',
        dataIndex: 'type',
        render: (text: any, record: { github: any; }) => {
          return record.github ? <Tag color='#1890ff'>github 用户</Tag> : <Tag color='magenta'>站内用户</Tag>
        }
      },
      {
        title: '注册时间',
        dataIndex: 'createdAt',
        sorter: (a: any, b: any) => (dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
      },
      {
        dataIndex: 'id',
        title: '操作',
        render: (userId: number, record: any) => (
          <Popconfirm
            title='Are you sure？'
            onConfirm={e => updateList(() => request(`/user/${userId}`))}>
            <a className='delete-text'>删除</a>
          </Popconfirm>
        )
      }
    ]
  })

  function handleSubmit(e: any) {
    e.preventDefault()
    form.validateFields().then(
      (values) => {
        if (Array.isArray(values.rangeDate)) {
          values.rangeDate = values.rangeDate.map((m: any) => m.format('YYYY-MM-DD'))
        }
        setQueryParams({ ...queryParams, ...values })
        onSearch({ ...queryParams, ...values })
      }
    )
  }
  return (
    <>
    <Form
        layout="inline"
        form={form}
      >
        <FormItem label="姓名" name="username">
          <Input placeholder="请输入姓名" autoComplete="off" allowClear />
        </FormItem>
        <FormItem label="用户类型" name="type">
          <Select style={{ width: 200 }} allowClear>
            {typeMapList.map(item => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
              ))}
          </Select>
        </FormItem>
        <FormItem label="创建日期" name="rangeDate" >
          <DatePicker.RangePicker />
        </FormItem>
        <Form.Item>
          <Button type='primary' onClick={handleSubmit} style={{ marginRight: 8 }}>搜索</Button>

        </Form.Item>
      </Form>

   <Table {...tableProps} />
   </>
  )
}

export default AdminUser;