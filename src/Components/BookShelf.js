import React, { Component, PropTypes } from 'react'
import BookShelfItem from './BookShelfItem'
import '../App.css'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(
      PropTypes.shape({
        authors: PropTypes.arrayOf(PropTypes.string.isRequired),
        imageLinks: PropTypes.shape({
          smallThumbnail: PropTypes.string.isRequired,
          thumbnail: PropTypes.string.isRequired
        }),
        shelf: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ),
    title: PropTypes.oneOf(['Currently Reading', 'Read', 'Want To Read'])
  }

  render() {
    const { books, title } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book, index) => (
                <li key={ index }>
                  <BookShelfItem
                    author={ book.authors[0] }
                    onShelfChange={ () => {} }
                    selectedOption="Currently Reading"
                    title={ book.title }
                    thumbnail={ book.imageLinks.smallThumbnail }
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
