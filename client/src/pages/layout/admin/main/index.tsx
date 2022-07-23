import React from 'react';
function AdminMain(props: any) {

  const { children } = props;
  const childRoutes = children && children.props.children;
  const hasChildren =  childRoutes && childRoutes.length > 0;
  console.log("admin props: ", props)
  return (
    <div>
        {
          children
        }
    </div>
  )
};

export default AdminMain;