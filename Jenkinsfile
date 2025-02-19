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
        stage('Dependancy Scanning'){
            parallel {
                    stage('NPM Dependancy Audit'){
                        steps{
                            sh 'npm audit --audit-level=critical'
                        }
                    }
                    // // stage('OWASP Dependency-Check') {
                    // //     steps {
                    // //         script {
                    // //             def dependencyCheckHome = tool 'owasp' // Ensure it's configured in Jenkins Global Tool Configuration
                    // //             sh """
                    // //                 ${dependencyCheckHome}/bin/dependency-check.sh \
                    // //                 --scan . \
                    // //                 --format HTML \
                    // //                 --out reports/
                    // //             """
                    // //         }
                    //      }
                    // }
            }
        }
        

        stage('Publish OWASP Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'reports',
                    reportFiles: 'dependency-check-report.html',
                    reportName: 'OWASP Dependency Check Report'
                ])
            }
        }
    }
}
