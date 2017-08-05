import React, { Component } from 'react'
import BookShelfItem from './Components/BookShelfItem'
import './App.css'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.shape({
      PropTypes.arrayOf(
        PropTypes.shape({
          authors: PropTypes.arrayOf(PropTypes.string.isRequired),
          imageLinks: PropTypes.shape({
            smallThumbnail: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired
          }),
          shelf: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })
      )
    }),
    title: PropTypes.oneOf(['Currently Reading', 'Read', 'Want To read'])
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => {
                <li>
                  <BookShelfItem
                    author={ book.author }
                    onShelfChange={ () => {} }
                    selectedOption="Currently Reading"
                    title={ book.title }
                    url={ book.imageLinks.thumbnail }
                  />
                </li>
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
