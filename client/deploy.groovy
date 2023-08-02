pipeline {
    agent any
    environment{
        CLIENT_BASE_DIR = '/www/wwwroot/www.llchaoblogs.work/blogs/myblogs/'
        ITEM_NAME = 'myblogs'
        JENKINS_WORKSPACE_NAME = 'workspace'
        LAST_WORK_DIR = "${JENKINS_HOME}/${JENKINS_WORKSPACE_NAME}/${JOB_BASE_NAME}/myblogs"
    }

    stages {
        stage('clear_last') {
            steps {
                cleanWs()
            }
        }
        stage('init') {
            steps {
                sh "git clone 'https://github.com/lcmomo/myblogs.git'"
            }
        }
        stage('build_client') {
            steps {
                sh 'CURRENTDIR=`pwd`'
                dir('myblogs/client') {
                    echo "构建客户端..............."
                    echo "安装依赖.............."
                    sh 'yarn'

                    echo "下载依赖完成......"
                    echo "构建ing..............."
                    sh 'yarn build'
                    echo "客户端构建 完成"
                }
            }
        }
        stage('deploy_client') {
            steps {
                echo "部署client..............."

                sh 'mv -f ${LAST_WORK_DIR}/client/dist/* ${CLIENT_BASE_DIR}'
                echo "部署client完成....."
            }
        }
    }
}
