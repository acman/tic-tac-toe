import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((wasEditing) => !wasEditing);
    if (!isEditing) {
      onChangeName(symbol, name);
    }
  }

  function changeName(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing
          ? <input type="text" placeholder={name} onChange={changeName}/>
          : <span className="player-name">{name}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  )
}