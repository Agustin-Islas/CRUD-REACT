import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';


const data = [
  {id: 1, titule: "Rayuela", author: "Julio Cortazar"},
  {id: 2, titule: "1984", author: "George Orwell"},
  {id: 3, titule: "El Gen Egoista", author: "Richard Dawkins"},
  {id: 4, titule: "El grito de la victoria", author: "Vicky Xipolitakis"},
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id:'',
      titule: '',
      author: ''
    },
    modalInsert: false,
    modalActualize: false
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value, 
      }
    })
  }

  showModalInsert = () => {
    this.setState({modalInsert: true})
  }

  hideModalInsert = () => {
    this.setState({modalInsert: false})
  }

  showModalActualize = (register) => {
    this.setState({modalActualize: true, form: register})
  }

  hideModalActualize = () => {
    this.setState({modalActualize: false})
  }

  insert = () => {
    var newValue = {...this.state.form};
    newValue.id = this.state.data.length + 1;
    var list = this.state.data;
    list.push(newValue);
    this.setState({data: list, modalInsert: false});
  }

  actualize = (newData) => {
    var cont = 0;
    var list = this.state.data;
    list.map((register) => {
      if (newData.id === register.id) {
      list[cont].titule = newData.titule;
      list[cont].author = newData.author;
      }
      cont++;
    });
    this.setState({data: list, modalActualize: false})
  }

  delete = (reg) => {
    var option = window.confirm("want to delete the register " + reg.id);
    if (option) {
      var cont = 0;
      var list = this.state.data;
      list.map((register) => {
        if (reg.id === register.id) {
          list.splices(cont, 1);
        }
        cont++;
      });
      this.setState({data: list})
    }
  }

  render() {
    return (
      <>
      <Container>
      <br/>  
      <Button color="success" onClick={() => this.showModalInsert()}>Inset new book</Button>
      <br/><br/>

      <Table>
      <thead>
        <tr>
          <th> ID     </th>
          <th> TITULE </th>
          <th> AUTHOR </th>
          <th> ACTION </th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((elem)=> (
          <tr key={elem.id}>
            <td>{elem.id}</td>
            <td>{elem.titule}</td>
            <td>{elem.author}</td>
            <td><Button color="primary" onClick={() => this.showModalActualize(elem)}>Edit</Button> 
                {"   "}
                <Button color="danger" onClick={() => this.delete(elem)}>Delete</Button></td>
          </tr>
        ))}
      </tbody>
      </Table>
      </Container>

      <Modal isOpen={this.state.modalActualize}>
          <ModalHeader>
           <div><h3>Edit register</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>
            
            <FormGroup>
              <label> Titule: </label>
              <input className="form-control" name="titule" type="text"
                     onChange={this.handleChange} value={this.state.form.titule}/>
            </FormGroup>
            
            <FormGroup>
              <label> Author: </label>
              <input className="form-control" name="author" type="text"
                     onChange={this.handleChange} value={this.state.form.author}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.actualize(this.state.form)}>
              Edit
            </Button>
            <Button color="danger" onClick={() => this.hideModalActualize()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>


      <Modal isOpen={this.state.modalInsert}>
          <ModalHeader>
           <div><h3>Insert book</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label> Id: </label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>
            
            <FormGroup>
              <label> Titule: </label>
              <input className="form-control" name="titule" type="text" onChange={this.handleChange}/>
            </FormGroup>
            
            <FormGroup>
              <label> Author: </label>
              <input className="form-control" name="author" type="text" onChange={this.handleChange}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insert()}>
              Insert
            </Button>
            <Button className="btn btn-danger" onClick={() => this.hideModalInsert()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default App;
