import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isCheckboxClicked: false,
  }

  checkboxClicked = () => {
    this.setState(prevState => ({
      isCheckboxClicked: !prevState.isCheckboxClicked,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  filterList = id => {
    const {passwordsList} = this.state
    const filteredAfterDelete = passwordsList.filter(each => id !== each.id)

    this.setState({passwordsList: filteredAfterDelete})
  }

  addNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  render() {
    const {
      passwordInput,
      websiteInput,
      usernameInput,
      passwordsList,
      searchInput,
      isCheckboxClicked,
    } = this.state

    const searchResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const listLength = searchResults.length
    const isLenEqualToZero = listLength === 0

    return (
      <div className="bg-container">
        <div className="app-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo-image"
          />
          <div className="card-section">
            <form className="form-container" onSubmit={this.addNewPassword}>
              <h1 className="head">Add New Password</h1>
              <div className="input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="image"
                />
                <input
                  onChange={this.onChangeWebsite}
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={websiteInput}
                />
              </div>
              <div className="input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="image"
                />
                <input
                  onChange={this.onChangeUsername}
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={usernameInput}
                />
              </div>
              <div className="input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="image"
                />
                <input
                  onChange={this.onChangePassword}
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={passwordInput}
                />
              </div>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
          <div className="password-section">
            <div className="password-search-section">
              <div className="count-container">
                <h1 className="head">Your Passwords</h1>
                <p className="count">{listLength}</p>
              </div>
              <div className="search-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-img"
                />
                <input
                  onChange={this.onChangeSearchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="show-password-cont">
              <input
                id="showPassword"
                className="checkbox"
                type="checkbox"
                onClick={this.checkboxClicked}
              />
              <label className="checkbox-label" htmlFor="showPassword">
                Show Passwords
              </label>
            </div>
            <div>
              {!isLenEqualToZero && (
                <ul className="ul-container">
                  {searchResults.map(each => (
                    <PasswordItem
                      filterList={this.filterList}
                      eachPassword={each}
                      key={each.id}
                      isCheckboxClicked={isCheckboxClicked}
                    />
                  ))}
                </ul>
              )}
              {isLenEqualToZero && (
                <div className="no-password-cont">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-password-image"
                  />
                  <p className="no-password-text">No Passwords</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
