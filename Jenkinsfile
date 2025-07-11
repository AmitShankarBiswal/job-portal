pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/AmitShankarBiswal/job-portal.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('server') {
                    sh 'docker build -t job-portal-backend .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('client') {
                    sh 'docker build -t job-portal-frontend .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                    docker run -d -p 3000:3000 job-portal-frontend
                    docker run -d -p 5000:5000 job-portal-backend
                '''
            }
        }
    }
}
