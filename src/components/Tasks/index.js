import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import TaskItem from '../TaskItem'

import './index.css'

const taksListItems = [
  {
    id: 1,
    title: 'HTML',
    date: '01 May 2022',
    des: 'Complete HTML project by May 1st week',
  },
  {
    id: 2,
    title: 'CSS',
    date: '01 May 2023',
    des: 'Complete CSS project by May 2nd week',
  },
]

class Tasks extends Component {
  state = {
    tasksList: taksListItems,
    titleInput: '',
    desInput: '',
    dateInput: '',
    isFilterActive: false,
    searchInput: '',
  }

  onClickDelete = id => {
    const {tasksList} = this.state
    const newTasksList = tasksList.filter(eachItem => eachItem.id !== id)
    this.setState({tasksList: newTasksList})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  handleSearch = () => {
    const searchInput = this.state
    if (searchInput === "") {
      alert('Please enter a valid search')
    
    }
  
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDescriptionInput = event => {
    this.setState({desInput: event.target.value})
  }

  onAddTask = event => {
    event.preventDefault()
    const {titleInput, dateInput, desInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newTask = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      des: desInput,
      isStarred: false,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      titleInput: '',
      dateInput: '',
      desInput: '',
    }))
  }

  render() {
    const {titleInput, dateInput, searchInput, desInput, tasksList} = this.state

    const filteredTasksList = tasksList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const taskListEmpty = tasksList.length === 0

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddTask}>
                <h1 className="add-appointment-heading">Add Task</h1>

                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="title" className="label">
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  id="title"
                  value={desInput}
                  onChange={this.onChangeDescriptionInput}
                  className="input"
                  placeholder="Description"
                />

                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />

            <h1 className="appointments-heading">Tasks</h1>
            <div className="header-with-filter-container">
              <input
                type="search"
                id="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="search"
                placeholder="Search"
              />
              <button className="btn" type="button" onClick={this.handleSearch}>
                Search
              </button>
            </div>

            {!taskListEmpty && (
              <ul className="appointments-list">
                {filteredTasksList.map(eachTask => (
                  <TaskItem
                    key={eachTask.id}
                    taskDetails={eachTask}
                    onClickDelete={this.onClickDelete}
                  />
                ))}
              </ul>
            )}
            {taskListEmpty && (
              <div className="no-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-image"
                />
                <p className="show-password">No Tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Tasks
