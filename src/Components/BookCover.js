import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'

const BookCover = ({ url }) => {
  return (
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 193,
        backgroundImage: url
      }}>
    </div>
  );
}

BookCover.propTypes = {
  url: PropTypes.string.isRequired
};

export default BookCover
