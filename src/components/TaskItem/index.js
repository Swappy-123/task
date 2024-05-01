import './index.css'

const TaskItem = props => {
  const {taskDetails, onClickDelete} = props
  const {id, title, date, des} = taskDetails

  const onDelete = () => {
    onClickDelete(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <h1 className="title">{title}</h1>

        <button
          type="button"
          data-testid="delete"
          className="delete-button"
          onClick={onDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            className="delete"
            alt="delete"
          />
        </button>
      </div>
      <p className="para">{des}</p>

      <p className="date">Date: {date}</p>
    </li>
  )
}

export default TaskItem
