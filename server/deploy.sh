
#!/bin/bash

source /etc/profile #声明环境变量;


set -x;

CURRENTDIR=`pwd`
echo "aaa${CURRENTDIR}"

SERVER_BASE_DIR="/usr/local/work/myblogs"
ITEM_NAME="myblogs"
LAST_WORK_DIR="${JENKINS_HOME}/${JOB_BASE_NAME}/myblogs"

echo $SERVER_BASE_DIR

check_env() {

  echo "环境检查....................";

  GITVERSION=`git --version `
  NODEVERSION=`node -v`
  NPMVERSION=`yarn -v`
  PM2VERSION=`pm2 -v`


  NOTFOUND="command not found"
  if [ $GITVERSION == *$NOTFOUND* || $NODEVERSION == *$NOTFOUND* || $NPMVERSION == *$NOTFOUND* || $PM2VERSION == *$NOTFOUND* ]
  then
    echo "环境检查失败，退出构建"
    exit -1
  fi
  echo "环境检查完成..............";

}



build_server() {
  echo "构建服务端...."
  echo "部署server..........."

  cd $CURRENTDIR/$ITEM_NAME/server

  cp  -rf $CURRENTDIR/$ITEM_NAME/server $SERVER_BASE_DIR
  cd $SERVER_BASE_DIR/server
  echo "下载依赖............"
  yarn

  echo "构建服务端........."
  yarn prod

  echo "启动服务"

  pm2 start ./dist/main.js -f --name="myblogs"

  echo "部署服务端完成......."
}

check_env

build_server
