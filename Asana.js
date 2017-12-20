class Asana {
  constructor(personalAccessToken) {
    this.personalAccessToken = personalAccessToken
  }

  getUser() {
    return fetch('https://app.asana.com/api/1.0/users/me', 
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.personalAccessToken}`
      }
    })
      .then(response => response.json())
      .then(({data}) => data)
  }
  
  getTasks(projectId) {
    return fetch(`https://app.asana.com/api/1.0/projects/${projectId}/tasks`, 
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.personalAccessToken}`
        }
      })
        .then(data => data.json())
        .then(({data}) => data)
  }

  getTask(taskId) {
    return fetch(`https://app.asana.com/api/1.0/tasks/${taskId}`, 
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.personalAccessToken}`
        }
      })
        .then(data => data.json())
        .then(({data}) => data)
  }

  getProjects() {
    return fetch(`https://app.asana.com/api/1.0/projects`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.personalAccessToken}`
        }
    })
      .then(response => response.json())
      .then(({data}) => data)
   }

  getProject(projectId) {
    return fetch(`https://app.asana.com/api/1.0/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.personalAccessToken}`
      }
    })
      .then(response => response.json())
      .then(({data}) => data)
  }
}

export default Asana
