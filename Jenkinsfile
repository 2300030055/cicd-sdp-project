pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                dir('HomeServices') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                    if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\homeservices-frontend" (
                        rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\homeservices-frontend"
                    )
                    mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\kabaddi"
                    xcopy /E /I /Y HomeServices\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\homeservices-frontend"
                '''
            }
        }

        stage('Build Backend') {
            steps {
                dir('HomeServices-Backend1') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                    if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\homeservices-backend.war" (
                        del "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\homeservices-backend.war"
                    )
                    copy HomeServices-Backend1\\target\\homeservices-backend.war "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully."
        }
        failure {
            echo "Pipeline Failed."
        }
    }
}
     