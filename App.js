import React, { Component } from 'react';
import './App.css';
import Asana from './Asana'

const PERSONAL_ACCESS_TOKEN = "0/553d0b619ade85fe35a7a905f70da48e"
const asana = new Asana(PERSONAL_ACCESS_TOKEN)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        name: '',
        email: ''
      },
      projects: []
    }
  }

  componentDidMount() {
    asana.getUser()
      .then(data => this.setState({user: data}))

    asana.getProjects()
      .then((data) => Promise.all(
        data.map(project => asana.getProject(project.id))
      ))
      .then(data => data.map((data) => data))
      .then(data => Promise.all(
        data.map(project => 
        new Promise((resolve, reject) => {
          asana.getTasks(project.id)
            .then(data => Promise.all(data.map(task => asana.getTask(task.id))))
          .then(data => {
            project.tasks = data
            resolve(project)
          })
          .catch(reject)
      }))))
      .then(data => this.setState({projects: data}))
      .catch(console.log)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="user-header">{this.state.user.name}</h1>
          <h2>{this.state.user.email}</h2>
        </header>
        <div>
          <h2>Projects</h2>
          {this.state.projects.map(project => (
            <div className="Project" key={project.id}>
              <h3>{project.name}</h3>
              <ul>
                {project.tasks.map(task => (
                  <li>{task.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
