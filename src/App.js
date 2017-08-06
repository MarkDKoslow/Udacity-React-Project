import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './Components/BookShelf'
import { BookStatusEnum } from './Helpers'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: [],
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
    console.log(e.target.value);

    const searchQuery = e.target.value
    this.setState({ query: searchQuery })
    this.onSearchInputChange(searchQuery)
  }

  onSearchInputChange = (input) => {
    console.log("==================");
    BooksAPI.search(input, 10).then((results) => {
      console.log("-----------------------");
      this.setState({ searchResults: results })
    })
  }

  render() {
    const { books, searchResults } = this.state;

    console.log(books);
    const currentlyReadingBooks =
      books.filter((books) => books.shelf === BookStatusEnum.CURRENTLYREADING)
    const wantToReadBooks =
      books.filter((books) => books.shelf === BookStatusEnum.WANTTOREAD)
    const readBooks =
      books.filter((books) => books.shelf === BookStatusEnum.READ)

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={ this.handleSearchInput.bind(this) } />
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
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
