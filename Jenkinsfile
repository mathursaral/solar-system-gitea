pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    environment {
        SONAR_SCANNER_HOME = tool 'sonarqube'
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
                catchError(buildResult: 'SUCCESS', message: 'This stage failed', stageResult: 'UNSTABLE'){
                    sh 'npm test'
                }
                
            }
        }
        stage('Code Coverage'){
            steps{
                catchError(buildResult: 'SUCCESS', message: 'This stage failed', stageResult: 'UNSTABLE'){
                    sh 'npm run coverage'
                }
            }
        }
        stage('SAST Sonarqube'){
            steps{
                sh 'echo $SONAR_SCANNER_HOME'
                sh '''
                    $SONAR_SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectKey=nodejs-solar-system \
                    -Dsonar.sources=app.js \
                    -Dsonar.host.url=http://localhost:9000 \
                    -Dsonar.token=sqp_76b0aebbce6e799bd77dd76f52e266c6c29dcf14
                '''
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
