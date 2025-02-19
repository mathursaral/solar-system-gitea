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
                            sh """
                                mkdir -p reports
                                apt-get update -y && apt-get install -y jq
                                npm audit --audit-level=critical --json > audit-report.json
                                cat audit-report.json | jq '.' > reports/audit-report.html
                            """

                        }
                    }
                    // stage('OWASP Dependency-Check') {
                    //      steps {
                    //          script {
                    //              def dependencyCheckHome = tool 'owasp' // Ensure it's configured in Jenkins Global Tool Configuration
                    //              sh """
                    //                  ${dependencyCheckHome}/bin/dependency-check.sh \
                    //                  --scan . \
                    //                  --format HTML \
                    //                  --out reports/
                    //              """
                    //          }
                    //      }
                    // }
            }
        }
        stage('Unit testing'){
            steps{
                sh 'npm test'
            }
        }
        

        stage('Publish Audit Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'reports',
                    reportFiles: 'reports/audit-report.html',
                    reportName: 'NPM Audit Report'
                ])
            }
        }
    }
}
