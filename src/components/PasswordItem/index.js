import './index.css'

const PasswordItem = props => {
  const {eachPassword, filterList, isCheckboxClicked} = props
  const {id, website, username, password} = eachPassword

  const displayPassword = isCheckboxClicked ? (
    password
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star"
    />
  )

  const deleteBtn = () => {
    filterList(id)
  }

  return (
    <li className="li-container">
      <div className="user-pass-cont">
        <p className="detail">{website}</p>
        <p className="detail">{username}</p>
        <p className="detail">{displayPassword}</p>
      </div>
      <button
        className="delete-btn"
        onClick={deleteBtn}
        type="button"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
