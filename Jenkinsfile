pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.63.0-noble'
            args '--ipc=host'
        }
    }

    environment {
        CI = 'true'
    }
    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }

    stages {
        stage('Install') {
            steps {
                withChecks('Install') {
                    sh 'npm ci'
                }
            }
        }
        stage('Build') {
            steps {
                withChecks('Build') {
                    sh 'npm run build'
                }
            }
        }
        stage('Test') {
            parallel {
                stage('Unit tests') {
                    steps {
                        sh 'npx vitest run || true'
                        withChecks('Unit tests') {
                            junit testResults: 'reports/unit-junit.xml', allowEmptyResults: false
                        }
                    }
                }
                stage('Smoke tests') {
                    steps {
                        sh 'npm run test:e2e || true'
                        withChecks('Smoke tests') {
                            junit testResults: 'reports/e2e-junit.xml', allowEmptyResults: false
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploy here'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, reports/**, test-results/**',
                       allowEmptyArchive: true
        }
    }
}
