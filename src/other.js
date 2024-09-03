import "./styles.css";
import { useState, useEffect } from "react";
//import Task from "./components/Task";
/*
  INSTRUCTIONS:
  Create a "todo"(add cities) app with the following criteria.
    1. The user can add new cities
    2. The user can remove existing cities items
*/

export default function App() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({ task, completed });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="App">
      <h1>Scotty's Task List</h1>
      <div>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        ></input>
        <button
          onClick={() => {
            if (newItem) {
              setItems([...items, newItem]);
              setNewItem("");
            }
          }}
        >
          add
        </button>
      </div>{" "}
      <div>
        <h2> Tasks</h2>
        {items.map((item, index) => (
          <Task item={item} index={index} />
          // <div>
          //   <span key={index}>
          //     {index + 1}. {item}
          //   </span>
          //   <button
          //     onClick={() => {
          //       setItems(items.filter((item) => item !== items[index]));
          //       // reset the array to NOT inclue that onChange
          //     }}
          //   >
          //     delete
          //   </button>
          //   <button
          //     onClick={() => {
          //       setItems(items.filter((item) => item !== items[index]));
          //       // reset the array to NOT inclue that onChange
          //     }}
          //   >
          //     edit
          //   </button>
          // </div>
        ))}{" "}
      </div>
    </div>
  );
}

export function Task({ item, index }) {
  let [isEditing, setIsEditing] = useState(false);
  let [localItem, setLocalItem] = useState(item);
  let [isComplete, setIsComplete] = useState(false);

  if (isEditing) {
    return (
      <>
        <span key={index}>{index + 1}.</span>
        <input
          value={localItem}
          onChange={(e) => setLocalItem(e.target.value)}
        ></input>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (localItem) {
              // edit specific item in array to match newItem
              setItems([
                ...items.filter((item) => item !== items[index]),
                localItem,
              ]);
              //setNewItem("");
            }
          }}
        >
          done
        </button>
      </>
    );
  } else {
    return (
      <div>
        <input type="checkbox" onChange={() => setIsComplete(!isComplete)} />
        {isComplete ? (
          <span key={index}>
            <s>
              {index + 1}. {localItem}
            </s>
          </span>
        ) : (
          <span key={index}>
            {index + 1}. {localItem}
          </span>
        )}

        <button
          onClick={() => {
            setItems(items.filter((item) => item !== items[index]));
            // reset the array to NOT inclue that onChange
          }}
        >
          delete
        </button>
        {isComplete ? (
          <button disabled onClick={() => setIsEditing(!isEditing)}>
            edit
          </button>
        ) : (
          <button onClick={() => setIsEditing(!isEditing)}>edit</button>
        )}
      </div>
    );
  }
}
