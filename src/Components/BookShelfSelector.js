import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'

class BookShelfSelector extends Component {
  static propTypes = {
    selectedOption: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {

  }
}

export default BookShelfSelector
