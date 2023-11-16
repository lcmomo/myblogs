import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { uploadI } from '@/services/common';
import { API_BASE_URL } from '@/config';
import { updateAvatar as uploadAvatar } from '@/services/user';


const baseDownloadUrl = `${API_BASE_URL }/common/download`;

function MyUpload (props: any) {

  const { buttonText, userInfo, updateAvatar } = props;


  const uploadProps: UploadProps = {
    name: 'file',
    accept: '*',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    async customRequest({filename, file }) {
      const res = await uploadI(file);
      const newUser = await uploadAvatar({...userInfo, avatar: res });
      updateAvatar(newUser)
      // return `${baseDownloadUrl}/${uuid}`;
    },
    showUploadList: false,
  };


 return  (
  <Upload {...uploadProps}>
    <Button icon={<UploadOutlined />}>{buttonText}</Button>
  </Upload>
);
  }

export default MyUpload;
