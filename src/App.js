import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { BookStatusEnum } from './Helpers'
import BookShelf from './Components/BookShelf'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    query: '',
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onChangeShelf = (bookId, newShelf) => {
    function matchingId(book) { return book.id === bookId }

    BooksAPI.update(bookId, newShelf).then((book) => {
      const updatedBook = this.state.books.find(matchingId)     // TODO: refactor this logic
      updatedBook.shelf = newShelf
      this.setState({ books: this.state.books })
    })
  }

  handleSearchInput = (e) => {
    const searchQuery = e.target.value

    if (searchQuery === '') {
      this.resetSearch()
    } else {
      this.setState({ query: searchQuery })
      this.onSearchInputChange(searchQuery)
    }
  }

  resetSearch = () => {
    this.setState({
      query: '',
      searchResults: []
    })
  }

  onSearchInputChange = (input) => {
    BooksAPI.search(input, 10).then((results) => {
      this.setState({ searchResults: results })
    })
  }

  render() {
    const { books, searchResults } = this.state;

    const currentlyReadingBooks =
      books.filter((books) => books.shelf === BookStatusEnum.CURRENTLYREADING)
    const wantToReadBooks =
      books.filter((books) => books.shelf === BookStatusEnum.WANTTOREAD)
    const readBooks =
      books.filter((books) => books.shelf === BookStatusEnum.READ)

    return (
      <div className="app">
        <Route exact path='/search' render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={ () => history.push('/') }
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={ this.handleSearchInput.bind(this) }
                />
              </div>
            </div>
            <div className="search-books-results">
              <BookShelf
                books={ searchResults }
                onChangeShelf={ this.onChangeShelf }
                title="Search Results"
              />
            </div>
          </div>
        )}/>
      <Route exact path='/' render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={ currentlyReadingBooks }
                  onChangeShelf={ this.onChangeShelf }
                  title="Currently Reading"
                />
                <BookShelf
                  books={ wantToReadBooks }
                  onChangeShelf={ this.onChangeShelf }
                  title="Want To Read"
                />
                <BookShelf
                  books={ readBooks }
                  onChangeShelf={ this.onChangeShelf }
                  title="Read"
                />
              </div>
            </div>
            <div className="open-search">
              <a
                onClick={ () => history.push('/search') }
              >
                Add a book
              </a>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
