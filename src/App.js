import React ,{Component} from 'react'
import './App.css';

import axios from 'axios'
import {Input, FormGroup, Label, Model,ModelHeader, ModelBody, ModelFooter, Table, Button } from 'reactstrap'

class App extends Component{
    state ={
        books:[],
        newBookData:{
            title:'',
            rating:''
        },
        editBookData:{
            id:'',
            title:'',
            rating:''
        },
        newBookModel:false,
        editBookModel:false,
        ApiUrl:'http://localhost:3000/books/'
    }

    componentDidMount(){
        this.__refreshBooks__();
    }

    toggleNewBookModel(){
        this.setState({
            newBookModal: ! this.state.newBookModal
          });
    }

    toggleEditBookModel(){
        this.setState({
            editBookModal: ! this.state.editBookModal
          });
    }

    addBook(){
        axios.post(ApiUrl, this.state.newBookData).then((response) => {
            let { books } = this.state;
      
            books.push(response.data);
      
            this.setState({ books, newBookModal: false, newBookData: {
              title: '',
              rating: ''
            }});
          });
    }

    updateBook(){
        let { title, rating } = this.state.editBookData;

        axios.put(ApiUrl + this.state.editBookData.id, {
          title, rating
        }).then((response) => {
          this.__refreshBooks__();
    
          this.setState({
            editBookModal: false, editBookData: { id: '', title: '', rating: '' }
          })
        });
    }

    editBook(){
        this.setState({
            editBookData: { id, title, rating }, editBookModal: ! this.state.editBookModal
          });
    }

    deleteBook(id){
        axios.delete(this.state.ApiUrl+id)
            .then(response => {
                this.__refreshBooks__()
            })
    }

    __refreshBooks__(){
        axios.get(this.state.ApiUrl)
           .then(response => {
                this.setState({
                    books:response.data
            })
           })
    }
    
    render(){
        let books = this.state.books.map((book) => {
            return(
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.rating}</td>

                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this,book.id,book.title,book.rating)}>Edit</Button>
                        <Button color="danger" size="sm" className="mr-2" onClick={this.deleteBook.bind(this,book.id)}>Edit</Button>
                    </td>

                </tr>
            )
        })

        return(
        <div className="container App">

            <h1>Books App</h1>

            <Button className="my-3" color="primary" onClick={this.toggleNewBookModel.bind(this)}>Add Book</Button>

             {/* new book popUp for New Book Model*/}

            <Model isOpen={this.state.newBookModel} toggle={this.toggleNewBookModel.bind(this)}>
                    <ModelHeader toggle={this.toggleNewBookModel.bind(this)}>Add a new book</ModelHeader>

                    <ModelBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" value={this.state.newBookData.title} onChange={(Inputevent) => {
                                let { newBookData } = this.state

                                newBookData.title = Inputevent.target.value

                                this.setState({ newBookData })
                            }}></Input>
                        </FormGroup>

                        <FormGroup>
                                <Label for="rating">Rating</Label>
                                <Input id="rating" value={this.state.newBookData.rating} onChange={(Inputevent) => {
                                let { newBookData } = this.state;

                                newBookData.rating = Inputevent.target.value;

                                this.setState({ newBookData });
                                }} />
                        </FormGroup>
                    </ModelBody>

                    <ModelFooter>
                              <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
                              <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                    </ModelFooter>

                    </Model>

                    {/* another model editBook popUp */}

                    <Model isOpen={this.state.editBookModel} toggle={this.toggleEditBookModel.bind(this)}>
                        <ModelHeader toggle={this.toggleEditBookModel.bind(this)}></ModelHeader>

                        <ModelBody>
                            <FormGroup>
                                 <Label for="title">Title</Label>
                                 <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.title = e.target.value;

                                    this.setState({ editBookData });
                                    }} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="rating">Rating</Label>
                                <Input id="rating" value={this.state.editBookData.rating} onChange={(e) => {
                                    let { editBookData } = this.state;

                                    editBookData.rating = e.target.value;

                                    this.setState({ editBookData });
                                }} />
                            </FormGroup>
                        </ModelBody>

                    </Model>

                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {books}
                        </tbody>
                    </Table>
        </div>
             
        )
    }
}

export default App;
