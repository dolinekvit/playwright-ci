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
                sh 'npm ci'
            }
            // publishChecks in post always closes the check (green or red),
            // unlike withChecks around a plain sh which leaves it "in progress".
            post {
                success      { publishChecks name: 'Install', conclusion: 'SUCCESS', summary: 'npm ci' }
                unsuccessful { publishChecks name: 'Install', conclusion: 'FAILURE', summary: 'npm ci failed' }
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
            post {
                success      { publishChecks name: 'Build', conclusion: 'SUCCESS', summary: 'vite build' }
                unsuccessful { publishChecks name: 'Build', conclusion: 'FAILURE', summary: 'vite build failed' }
            }
        }
        stage('Test') {
            parallel {
                stage('Unit tests') {
                    steps {
                        sh 'npx vitest run || true'
                        // junit inside withChecks closes this check with test results.
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
