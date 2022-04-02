import Layout, { Content, Header } from "antd/lib/layout/layout";
import React, { FC } from "react"
import { useLocation } from "react-router-dom";
import AdminHeader from "./header";
import '@/styles/admin.less';
import Sider from "antd/lib/layout/Sider";
import AdminSidebar from "./sidebar";
import BlogBreadcrumb from "@/pages/components/breadcrumb";
import AdminMain from "./main";

type AdminLayoutProps = {

}
const AdminLayout: FC<any> = (props: any) => {

  const location = useLocation();

  return (
    <Layout className="admin-container">
      <Header className="admin-header">
        <AdminHeader />
      </Header>
      <Layout>
        <Sider width={200} className='admin-sider' >
          <AdminSidebar selectedKeys={[location.pathname]} />
        </Sider>
        <Layout className='admin-content-wrap'>
          <BlogBreadcrumb />
          <Content className='admin-content'>
           <AdminMain {...props} />
          </Content>
        </Layout>

      </Layout>
    </Layout>
  )
}

export default AdminLayout;