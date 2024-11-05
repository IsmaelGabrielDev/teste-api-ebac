pipeline {
    agent any

    stages {
        stage('Clonando e instalando Dependencias') {
            steps {
                git branch: 'main', url: 'https://github.com/IsmaelGabrielDev/teste-api-ebac.git'
                bat 'npm install'
            }
        }
        stage('Subir o servidor') {
            steps {
                bat '''set NO_COLOR=1
start /b npm start'''
            }
        }
        stage('Realizar os testes') {
            steps {
                bat '''set NO_COLOR=1
npm run cy:run'''
            }
        }
    }
}