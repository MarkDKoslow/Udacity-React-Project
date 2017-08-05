import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BookStatusEnum } from '../Helpers' 
import '../App.css'

class BookShelfSelector extends Component {
  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    selectedOption: PropTypes.oneOf(Object.values(BookStatusEnum)).isRequired
  }

  render() {
    const { selectedOption } = this.props;

    return (
      <div className="book-shelf-changer">
        <select defaultValue={ selectedOption }>
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
