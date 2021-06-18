import React from 'react';
import axios from 'axios';
import './App.css';
import BookList from './Book/BookList';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
  }

  componentDidMount() {
    const url = 'http://localhost:5000/api/book-list';

      axios.get(url)
      .then((Response) => {
        this.setState({
          books: Response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });

  };

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav>
            <div className="nav-wrapper blue darken-1">
              <a href="/" className="brand-logo">Book Management</a>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="col s12"><BookList books={this.state.books}/></div>
        </div>
      </div>
    );
  }
}

export default App;
