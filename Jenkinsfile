pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds(abortPrevious: true)
        skipDefaultCheckout()
        timestamps()
    }

    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'ref', value: '$.ref'],
                [key: 'repository_name', value: '$.repository.name'],
                [key: 'pusher', value: '$.pusher.name', defaultValue: '$.sender.login'],
                [key: 'commit_sha', value: '$.after']
            ],
            causeString: 'Push to $ref by $pusher',
            token: 'scylax-newsletter',
            regexpFilterText: '$ref',
            regexpFilterExpression: '^refs/heads/(main|dev)$',
            printContributedVariables: false,
            printPostContent: false
        )
    }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
        booleanParam(name: 'SKIP_TESTS', defaultValue: false, description: 'Skip test stage')
        booleanParam(name: 'FORCE_DEPLOY', defaultValue: false, description: 'Force deployment even on non-main branch')
    }

    environment {
        APP_NAME = 'scylax-newsletter'
        DOCKER_IMAGE = 'scylax-newsletter'
        DOCKER_TAG = "${BUILD_NUMBER}-${GIT_COMMIT?.take(7) ?: 'latest'}"
        CONTAINER_PORT = '3000'
        HOST_PORT = '3002'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${params.BRANCH}"]],
                    extensions: [[$class: 'CleanBeforeCheckout']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Mubz0/newsblog.git',
                        credentialsId: 'github-credentials'
                    ]]
                ])
                script {
                    env.GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    env.GIT_COMMIT_SHORT = env.GIT_COMMIT.take(7)
                    env.DOCKER_TAG = "${BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Type Check') {
            steps {
                sh 'npx tsc --noEmit || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([
                    string(credentialsId: 'turnstile-site-key', variable: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY')
                ]) {
                    sh '''
                        docker build \
                            --build-arg NEXT_PUBLIC_TURNSTILE_SITE_KEY="${NEXT_PUBLIC_TURNSTILE_SITE_KEY}" \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
                            -t ${DOCKER_IMAGE}:latest \
                            .
                    '''
                }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    expression { params.FORCE_DEPLOY }
                }
            }
            steps {
                withCredentials([
                    string(credentialsId: 'sendgrid-api-key', variable: 'SENDGRID_API_KEY'),
                    string(credentialsId: 'turnstile-secret-key', variable: 'TURNSTILE_SECRET_KEY')
                ]) {
                    sh '''
                        # Stop and remove existing container
                        docker stop ${APP_NAME} 2>/dev/null || true
                        docker rm ${APP_NAME} 2>/dev/null || true

                        # Run new container
                        docker run -d \
                            --name ${APP_NAME} \
                            --restart unless-stopped \
                            -p ${HOST_PORT}:${CONTAINER_PORT} \
                            -e NODE_ENV=production \
                            -e SENDGRID_API_KEY="${SENDGRID_API_KEY}" \
                            -e SENDGRID_FROM_EMAIL="contact@scylax.ai" \
                            -e TURNSTILE_SECRET_KEY="${TURNSTILE_SECRET_KEY}" \
                            ${DOCKER_IMAGE}:${DOCKER_TAG}

                        # Wait for container to start
                        sleep 10
                        docker ps | grep ${APP_NAME}
                    '''
                }
            }
        }

        stage('Health Check') {
            when {
                anyOf {
                    branch 'main'
                    expression { params.FORCE_DEPLOY }
                }
            }
            steps {
                sh '''
                    # Wait for app to start
                    sleep 5

                    # Health check
                    for i in 1 2 3 4 5; do
                        if curl -sf http://localhost:${HOST_PORT}/ > /dev/null; then
                            echo "Health check passed!"
                            exit 0
                        fi
                        echo "Attempt $i failed, retrying..."
                        sleep 5
                    done

                    echo "Health check failed!"
                    docker logs ${APP_NAME}
                    exit 1
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                    # Remove old images (keep last 5)
                    docker images ${DOCKER_IMAGE} --format "{{.ID}} {{.CreatedAt}}" | \
                        sort -k2 -r | tail -n +6 | awk '{print $1}' | \
                        xargs -r docker rmi 2>/dev/null || true
                '''
            }
        }
    }

    post {
        success {
            echo "Build and deployment successful for ${APP_NAME}!"
        }
        failure {
            echo "Build or deployment failed for ${APP_NAME}"
        }
        always {
            cleanWs()
        }
    }
}
