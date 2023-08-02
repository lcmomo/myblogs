#!/bin/bash

source /etc/profile #声明环境变量;


set -x;
git clone https://github.com/lcmomo/myblogs.git
CURRENTDIR=`pwd`
echo "aaa${CURRENTDIR}"

CLIENT_BASE_DIR="/www/wwwroot/www.llchaoblogs.work/blogs/myblogs/"
ITEM_NAME="myblogs"
JENKINS_WORKSPACE_NAME="workspace"
LAST_WORK_DIR="${JENKINS_HOME}/${JENKINS_WORKSPACE_NAME}/${JOB_BASE_NAME}/myblogs"

check_env() {

  echo "环境检查....................";

  GITVERSION=`git --version `
  NODEVERSION=`node -v`
  NPMVERSION=`yarn -v`
  PM2VERSION=`pm2 -v`

  NOTFOUND="command not found"
  if [ *$GITVERSION* == *$NOTFOUND* || *$NODEVERSION* == *$NOTFOUND* || *$NPMVERSION* == *$NOTFOUND* || *$PM2VERSION* == *$NOTFOUND* ]
  then
    echo "环境检查失败，退出构建"
    exit -1
  fi
  echo "环境检查完成..............";

}

build_client() {

  cd  $CURRENTDIR/${ITEM_NAME}/client
  echo "构建客户端..............."
  echo "安装依赖.............."

  yarn

  echo "下载依赖完成......"
  echo "构建ing..............."

  yarn build

  echo "客户端构建 完成"

}

deploy_client() {
  echo "部署client..............."

	rm -rf $CLIENT_BASE_DIR
   if [ ! -d "$CLIENT_BASE_DIR" ]; then
  		mkdir $CLIENT_BASE_DIR
	fi
  mv -f ${CURRENTDIR}/${ITEM_NAME}/client/dist/* ${CLIENT_BASE_DIR}

  if [ $? -ne 0 ]
  then
    echo "部署失败"
    exit -1
  fi
  echo "部署client完成....."

}

check_env

build_client

deploy_client