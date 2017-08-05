import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookCover from './BookCover'
import BookShelfSelector, { BookStatusEnum } from './BookShelfSelector'
import '../App.css'

class BookShelfItem extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    selectedOption: PropTypes.oneOf(Object.values(BookStatusEnum)).isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }

  render() {
    const {
      author,
      onShelfChange,
      selectedOption,
      title,
      thumbnail
    } = this.props;

    const url = 'url("' + thumbnail + '")'    // TODO: Better way to do this

    return (
      <div className="book">
        <div className="book-top">
          <BookCover url={ url } />
          <BookShelfSelector
            selectedOption={ selectedOption }
            onShelfChange={ onShelfChange }
          />
        </div>
        <div className="book-title">{ title }</div>
        <div className="book-authors">{ author }</div>
      </div>
    )
  }
}

export default BookShelfItem
