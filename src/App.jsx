import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Button, Form } from 'react-bootstrap'

class App extends React.Component {

  constructor(properties) {
    super(properties);
    this.state = ({
      to_do_list: [],
      description: '',
      stage: 'pending'
    })
    this.updateDescription = this.updateDescription.bind(this);
    this.save = this.save.bind(this);
  }

  // e = event
  updateDescription(e) {
    // console.log(e.target.value);
    this.setState({
      description: e.target.value
    })

  }


  save(e) {
    e.preventDefault();
    const dataTask = {
      description: this.state.description,
      stage: this.state.stage
    }
    // console.log(dataTask)
    // Record of a new task
    axios.post('https://ywaac-api-assignments.onrender.com/task', dataTask)
  }




  componentDidMount() {
    console.log("Loading to-do list...")
    axios.get('https://ywaac-api-assignments.onrender.com/task')
      .then(res => {
        console.log(res.data.content);
        this.setState({
          to_do_list: res.data.content
        })
      })
  }


  render() {
    return (
      <div>
        <Container>
          <h1>To-do List</h1>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Task</th>
                <th>Stage</th>
              </tr>
            </thead>

            <tbody>
              {this.state.to_do_list.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.description}</td>
                    <td>{task.stage}</td>
                  </tr>
                )

              })
              }
            </tbody>


          </Table>
          <h1> Add task</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" />
            </Form.Group>
            <Button variant="primary" type="submit">Save</Button>
          </Form>

        </Container>

      </div >
    )
  }
}

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App
