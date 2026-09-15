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
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Build application') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            parallel {
                stage('Unit tests') {
                    steps {
                        sh 'npx vitest run --reporter=junit --outputFile=test-results/unit-junit.xml'
                    }
                }
                stage('Smoke tests') {
                    steps {
                        sh 'npm run test:e2e'
                    }
                }
            }
        }
        stage('Deploy application') {
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
            junit allowEmptyResults: true, testResults: 'test-results/*-junit.xml'
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**',
                       allowEmptyArchive: true
        }
    }
}
