#!/bin/bash

source /etc/profile #声明环境变量;


set -x;

CURRENTDIR=`pwd`
echo "aaa${CURRENTDIR}"

CLIENT_BASE_DIR="/www/wwwroot/blog.llchaoblogs.work/blogs"
ITEM_NAME="myblogs"
LAST_WORK_DIR="${JENKINS_HOME}/${JOB_BASE_NAME}/myblogs"

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

  cd ${CURRENTDIR}/${ITEM_NAME}/client
  # cp -rf ${CURRENTDIR}/${ITEM_NAME}/client/dist  ${CLIENT_BASE_DIR}

  mv ${CURRENTDIR}/${ITEM_NAME}/client/dist ${CLIENT_BASE_DIR}/myblogs

  if [$? -ne 0 ]
  then
    echo "部署失败"
    exit -1
  fi
  echo "部署client完成....."

}

echo "清理上次构建信息"
rm -rf ${LAST_WORK_DIR}/

echo "下载代码开始.................."

git clone https://github.com/lcmomo/myblogs.git


echo "代码下载完成.................."

check_env

build_client

deploy_client