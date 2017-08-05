import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'

export const BookStatusEnum = {
  CURRENTLYREADING: 'Currently Reading',
  WANTTOREAD: 'Want To Read',
  READ: 'Read',
  NONE: 'None'
}

class BookShelfSelector extends Component {
  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    selectedOption: PropTypes.oneOf(Object.values(BookStatusEnum)).isRequired
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfSelector
