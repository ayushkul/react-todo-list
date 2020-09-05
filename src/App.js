import React, {useState} from "react";
import trash from './trash.svg'

function App() {
    const [taskInput, updateTaskInput] = useState("");
    const [toDoList, updateToDOList] = useState([]);

    const inputKeyDown = (event) => {
        if (event.keyCode === 13) addNote();
    };
    const getTaskObject = (description, isComplete) => {
        return {
            description,
            isComplete
        }
    }

    const addNote = () => {
        if (!taskInput || !taskInput.length)
            return;
        toDoList.push(getTaskObject(taskInput, false));
        updateToDOList(toDoList);
        updateTaskInput("")
    };

    const deleteTask = (index) => {
        let splice = toDoList.filter((item, i) => i !== index);
        updateToDOList(splice);
    }

    const markComplete = (index) => {
        const list = [...toDoList]
        list[index].isComplete = !list[index].isComplete
        updateToDOList(list)
    }

    return (
        <div className="app-background">
            <p className="heading-text">React To Do List <span role="img" aria-label="react">🔥</span></p>
            <div className="task-container column">
                <div className="row">
                    <input
                        className="text-input"
                        value={taskInput}
                        onKeyDown={inputKeyDown}
                        onChange={(event) => updateTaskInput(event.target.value)}
                    />
                    <button className="add-button" onClick={addNote}>
                        ADD
                    </button>
                </div>
                {toDoList?.length ?
                    toDoList.map((toDoObject, index) =>
                        <ListItem key={index} itemData={toDoObject} markComplete={markComplete}
                                  index={index} deleteTask={deleteTask}/>) :
                    <p className="no-item-text"><span role="img" aria-label="react">📌</span> &nbsp;No Task Added !</p>}
            </div>
            <p className="footer-text">The Indian Dev</p>
        </div>
    );
}

function ListItem(props) {
    return (
        <div className="list-item row jc-space-between">
            <span className={props.itemData.isComplete ? 'task-complete' : ''}
                  onClick={() => props.markComplete(props.index)}>{props.itemData.isComplete ? `✅ ` : ''}&nbsp;{props.itemData?.description}</span>
            <img className="delete-icon" src={trash} alt="delete-task"
                 onClick={() => props.deleteTask(props.index)}/>
        </div>
    );
}

export default App;
