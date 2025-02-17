pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    stages {
        stage('VM Node Version'){
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}