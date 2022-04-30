import useBreadcrumb from "@/hooks/use_breadcrumb"
import useFetchTable from "@/hooks/use_fetch_table";
import { selectorTags, TagInfo } from "@/store/slice/article";
import dayjs from "@/utils/dayjs";
import request from "@/utils/request";
import Popconfirm from "antd/lib/popconfirm";
import Table from "antd/lib/table/Table";
import Tag from "antd/lib/tag";
import { Button, Form, Input, message, Select, Switch } from 'antd';
import React, { FC, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type ArticleListProps = {

}
const FormItem = Form.Item;
const ArticleList: FC<ArticleListProps> = (props: ArticleListProps) => {

  useBreadcrumb(['文章管理']);

  const tagList = useSelector(selectorTags);
  const [queryParams, setQueryParams] = useState({});
  const [batch, setBatch] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const rowSelection = batch ? {
    selectedRowKeys,
    onChange: (selectList: Array<number>) => setSelectedRowKeys(selectList)
  } : null
  const { tableProps, updateList, onSearch } = useFetchTable({
    requestUrl: '/article/list',
    queryParams,
    columns: [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '标签',
        dataIndex: 'tags',
        render: (text:Array<any>) => {
          return text.map(d => (
            <Tag color={renderColor(d.name, tagList)} key={d.name}>
              <Link to={`/tags/${d.name}`}>{d.name}</Link>
            </Tag>
          ))
        }
      },
      {
        title: '浏览数',
        dataIndex: 'viewCount',
        sorter: (a: any, b: any) => b.viewCount - a.viewCount
      },
      {
        title: '发布时间',
        dataIndex: 'createdAt',
        sorter: (a: any, b: any) => (dayjs(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
      },
      {
        title: '修改时间',
        dataIndex: 'updatedAt',
        sorter: (a: any, b: any) => (dayjs(a.updatedAt).isBefore(b.updatedAt) ? 1 : -1)
      },
      {
        dataIndex: 'id',
        title: '操作',
        render: (articleId: number, record: any) => {
          return (
            <ul className='action-list'>
              <li>
                <Link to={`/article/${articleId}`}>查看</Link>
              </li>
              <li>
                <Link to={{ pathname: `/admin/article/edit/${record.id}` }}>编辑</Link>
              </li>
              {/* <li>
                <a onClick={e => output(record.id, record.title)}>导出</a>
              </li> */}
              <li>
                <Popconfirm title='确认删除吗' cancelText='取消' okText="确定" onConfirm={() => updateList(() =>
                  request(`/article/${articleId}`,{ method: 'DELETE'}).then(message.success('删除成功'))
                  )}>
                  <a className='delete-text'>删除</a>
                </Popconfirm>
              </li>
            </ul>
          )
        }
      }
    ]
  });

  function renderColor(name: string, list: Array<TagInfo>) {
    const target = list.find(l => l.name === name);
    return target && target.color;
  }
  function outputAll() {
    // download('/article/output/all')
  }
  function outputSelected() {
    // download(`/article/output/list/${selectedRowKeys}`)
  }


  function delList() {
    // axios.delete(`/article/list/${selectedRowKeys}`).then(() => {
    //   onSearch()
    //   setSelectedRowKeys([])
    // })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    form.validateFields().then(
      (values) => {
        setQueryParams({ ...queryParams, ...values })
        onSearch({ ...queryParams, ...values })
      }
    ).catch(e => {
      console.error(e)
    })
  }
  return (
    <div className="admin-article-manager">
      <Form
        layout="inline"
        form={form}
        style={{ marginBottom: 20 }}
      >
        <FormItem label="关键字" name="keyword">
          <Input placeholder="请输入文章关键字" autoComplete="off" allowClear />
        </FormItem>
        <FormItem label="标签" name="tag">
          <Select style={{ width: 200 }} allowClear>
            {tagList.map((item:any) => (
              <Select.Option key={item.name} value={item.name}>
                {item.name}
              </Select.Option>
              ))}
          </Select>
        </FormItem>
        <Form.Item>
          <Button type='primary' onClick={handleSubmit} style={{ marginRight: 8 }}>搜索</Button>
          <Button type='primary' onClick={outputAll} style={{ marginRight: 8 }}>
            导出全部文章
          </Button>
        </Form.Item>
      </Form>
      <Table
        {...tableProps}
        rowSelection={rowSelection}
        footer={
          () => (
            <>
              批量操作<Switch checked={batch} onChange={() => setBatch(prev => !prev)} style={{ marginRight: 8 }} />
              {
              batch && (
                <>
                  <Button type='primary' size='small' style={{ marginRight: 8 }} disabled={selectedRowKeys.length === 0} onClick={outputSelected}>导出选中项</Button>
                  <Popconfirm
                    title='确认删除选中的文章吗?'
                    onConfirm={delList}
                    // onCancel={cancel}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button type='ghost' size='small' disabled={selectedRowKeys.length === 0}>批量删除</Button>
                  </Popconfirm>

                </>
              )
            }
            </>
          )
        }
      >

      </Table>
    </div>
  )
}

export default ArticleList;