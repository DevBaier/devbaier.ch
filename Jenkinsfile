pipeline {
  agent any
  tools {
    nodejs 'recent node'
  }
  stages {
    stage('Get JWT Token') {
        steps {
            script {
                withCredentials([usernamePassword(credentialsId: 'portainer', usernameVariable: 'PORTAINER_USERNAME', passwordVariable: 'PORTAINER_PASSWORD')]) {
                    def json = """
                        {"Username": "$PORTAINER_USERNAME", "Password": "$PORTAINER_PASSWORD"}
                    """
                    def jwtResponse = httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', validResponseCodes: '200', httpMode: 'POST', ignoreSslErrors: true, consoleLogResponseBody: true, requestBody: json, url: "https://portainer.devbaier.ch/api/auth"
                    def jwtObject = new groovy.json.JsonSlurper().parseText(jwtResponse.getContent())
                    env.JWTTOKEN = "Bearer ${jwtObject.jwt}"
                }
            }
            echo "${env.JWTTOKEN}"
        }
    }
    stage('Build Docker Image on Portainer') {
      steps {
        script {
          // Build the image
              def repoURL = """
                https://portainer.devbaier.ch/api/endpoints/1/docker/build?t=dev:latest&remote=https://raw.githubusercontent.com/DevBaier/devbaier.ch/main/Dockerfile&nocache=true
              """
              def imageResponse = httpRequest httpMode: 'POST', ignoreSslErrors: true, url: repoURL, validResponseCodes: '200', customHeaders:[[name:"Authorization", value: env.JWTTOKEN ], [name: "cache-control", value: "no-cache"]]
        }
      }
    }
    stage('Delete old Stack') {
      steps {
        script {

          // Get all stacks
          String existingStackId = ""
          if("true") {
            def stackResponse = httpRequest httpMode: 'GET', ignoreSslErrors: true, url: "https://portainer.devbaier.ch/api/stacks", validResponseCodes: '200', consoleLogResponseBody: true, customHeaders:[[name:"Authorization", value: env.JWTTOKEN ], [name: "cache-control", value: "no-cache"]]
            def stacks = new groovy.json.JsonSlurper().parseText(stackResponse.getContent())
            
            stacks.each { stack ->
              if(stack.Name == "devbaier") {
                existingStackId = stack.Id
              }
            }
          }

          if(existingStackId?.trim()) {
            // Delete the stack
            def stackURL = """
              https://portainer.devbaier.ch/api/stacks/$existingStackId
            """
            httpRequest acceptType: 'APPLICATION_JSON', validResponseCodes: '204', httpMode: 'DELETE', ignoreSslErrors: true, url: stackURL, customHeaders:[[name:"Authorization", value: env.JWTTOKEN ], [name: "cache-control", value: "no-cache"]]

          }

        }
      }
    }
    stage('Deploy new stack to Portainer') {
      steps {
        script {
          
          def createStackJson = ""

          // Stack does not exist
          // Generate JSON for when the stack is created
          withCredentials([usernamePassword(credentialsId: 'github', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_PASSWORD')]) {
            def swarmResponse = httpRequest acceptType: 'APPLICATION_JSON', validResponseCodes: '200', httpMode: 'GET', ignoreSslErrors: true, consoleLogResponseBody: true, url: "https://portainer.devbaier.ch/api/endpoints/1", customHeaders:[[name:"Authorization", value: env.JWTTOKEN ], [name: "cache-control", value: "no-cache"]]
            def swarmInfo = new groovy.json.JsonSlurper().parseText(swarmResponse.getContent())

            createStackJson = """
              {"Name": "devbaier", "RepositoryURL": "https://github.com/$GITHUB_USERNAME/devbaier.ch", "ComposeFilePathInRepository": "docker-compose.yml", "RepositoryAuthentication": true, "RepositoryUsername": "$GITHUB_USERNAME", "RepositoryPassword": "$GITHUB_PASSWORD", "RepositoryReferenceName": "refs/heads/main"}
            """

          }

          if(createStackJson?.trim()) {
            httpRequest acceptType: 'APPLICATION_JSON', contentType: 'APPLICATION_JSON', validResponseCodes: '200', httpMode: 'POST', ignoreSslErrors: true, consoleLogResponseBody: true, requestBody: createStackJson, url: "https://portainer.devbaier.ch/api/stacks?method=repository&type=2&endpointId=1", customHeaders:[[name:"Authorization", value: env.JWTTOKEN ], [name: "cache-control", value: "no-cache"]]
          }

        }
      }
    }
  }
}