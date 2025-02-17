pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    stages {
        stage('Installing Dependancies'){
            steps {
                sh 'npm install --no-audit'
            }
        }
    }
}