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
        stage('NPM Dependancy Audit'){
            steps{
                sh 'npm audit --audit-level=critical'
            }
        }
    }
}