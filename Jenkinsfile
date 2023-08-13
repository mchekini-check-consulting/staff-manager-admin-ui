node("ci-node") {

    def branchName = env.BRANCH_NAME
    def instancesNumber = 2;
    def branchEnvMapping = new HashMap<String, String>()
    branchEnvMapping.put("develop", "int")
    branchEnvMapping.put("qua", "qua")
    branchEnvMapping.put("master", "prod")

    def commitSHA = null
    def environment = branchEnvMapping.get(branchName)


    stage("checkout") {
        checkout scmGit(branches: [[name: branchName]], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mchekini-check-consulting/staff-manager-admin-ui']])
        commitSHA = sh(script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
    }
//
//    stage("Quality Analyses"){
//
//        sh "chmod 700 mvnw && ./mvnw clean verify -Dspring.profiles.active=test sonar:sonar \\\n" +
//                "  -Dsonar.projectKey=staff-manager-api \\\n" +
//                "  -Dsonar.projectName='staff-manager-api' \\\n" +
//                "  -Dsonar.host.url=http://ci.check-consulting.net:11001 \\\n" +
//                "  -Dsonar.token=sqp_5083a3124779353423b8a578cf6ef5f598dd8721"
//    }
//
    stage("build") {
        sh "npm install"
        sh "npm run build"
    }

    stage("build image") {
        sh "sudo docker build -t staff-manager-admin-ui ."
    }

    stage("push docker image") {

        withCredentials([usernamePassword(credentialsId: 'mchekini', usernameVariable: 'username',
                passwordVariable: 'password')]) {
            sh "sudo docker login -u mchekini -p $password"
            sh "sudo docker tag staff-manager-admin-ui mchekini/staff-manager-admin-ui:$branchName"
            sh "sudo docker push mchekini/staff-manager-admin-ui:$branchName"
            sh "sudo docker rmi mchekini/staff-manager-admin-ui:$branchName"
            sh "sudo docker rmi staff-manager-admin-ui"
            stash includes: 'docker-compose.yml', name: 'utils'
        }
    }

    def nodeNamePrefix = environment + "-node-"

    for (int i = 1; i <= instancesNumber; i++) {
        node(nodeNamePrefix + i) {
            stage("deploy-" + environment + "-instance-" + i) {
                unstash 'utils'
                sh "echo TAG=$branchName > .env"
                try {
                    sh "sudo docker-compose down"
                    sh "sudo docker-compose pull"
                    sh "sudo docker-compose up -d"

                } catch (Exception e) {
                    println "No Docker Compose Running"
                    sh "sudo docker-compose pull"
                    sh "sudo docker-compose up -d"
                }

            }
        }

    }


}