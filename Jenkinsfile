pipeline {
    agent any

    stages {
        stage('Clonando e instalando Dependencias') {
            steps {
                git branch: 'main', url: 'https://github.com/IsmaelGabrielDev/teste-api-ebac.git'
                bat 'npm isntall'
            }
        }
        stage('Subir o serverest e realizar os testes') {
            steps {
                bat '''set NO_COLOR=1
npm run cy:run-ci'''
            }
        }
    }
}