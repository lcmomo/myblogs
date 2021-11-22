import React, { useState, useCallback } from 'react';
import { Form, Input, Button, Modal, FormItemProps, FormInstance } from 'antd';
import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useListener } from '@/hooks/usebus';
import { save } from '@/utils/storage';
import { login } from '@/store/slice/user';

type ModalTitleType = {
  [key: string]: string
};

type SignModalProps = {
  form?: FormInstance
}
const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}



const ModalTitle: ModalTitleType = {
  'login': '登录',
  'register': '注册'
};

function FormItem(props: FormItemProps) {
  const { children, ...rest } = props;
  return <Form.Item {...FormItemLayout} {...rest}>{children}</Form.Item>
}


function SignModal(props: SignModalProps | null) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('login');
  const [form] = Form.useForm();

  useListener('openSignModal', (type: string) => {
    form.resetFields();
    setType(type);
    setVisible(true);
  })

const handleSubmit = useCallback((e) => {
    e.preventDefault()
    form.validateFields().then(value => {
      dispatch(login(value));
    }).then(() => {
      setVisible(false);
    })
  }, []);
  return (
    <Modal
      width={460}
      title={ModalTitle[type]}
      visible={visible}
      onCancel={e => setVisible(false)}
      footer={null}
    >
      <Form
        layout='horizontal'
        form={form}
        name="sign-form"
      >
        {
          type === 'login' ? (
            <>
              <FormItem label="用户名" name="account" rules={[ {required: true, message: '请输入用户名'}]}>
                <Input placeholder="请输入用户名" />
              </FormItem>
              <FormItem label="密码" name="password" rules={[ {required: true, message: '请输入密码'}]}>
                <Input placeholder="请输入密码" type="password" />
              </FormItem>
            </>
          ) : (
            <>
            <FormItem label="用户名" name="username" rules={[ {required: true, message: '请输入用户名'}]}>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem label="密码" name="password" rules={[ {required: true, message: '请输入密码'}]}>
              <Input placeholder="请输入密码" type="password" />
            </FormItem>
            <FormItem label="确认密码" name="confirm" rules={[ {required: true, message: '请再次输入密码'}]}>
              <Input placeholder="请再次输入密码" type="password" />
            </FormItem>
            <FormItem label="邮箱" name="email" rules={[ {required: true, message: '请输入邮箱'}, {type: 'email', message: '输入邮箱格式不正确'}]}>
              <Input placeholder="请再次输入密码"  />
            </FormItem>
          </>
          )
        }
      </Form>
      <Button type='primary' block onClick={handleSubmit}>
        {ModalTitle[type]}
      </Button>
    </Modal>
  )
}

export default SignModal;
