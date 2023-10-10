import axios from "axios";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

axios.defaults.baseURL = "http://localhost:3000";

const ListItem = ({ todo, allTodos, setTodos }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`/todos/${todo.id}`)

      .then(() => {
        const filtred = allTodos.filter((i) => i.id !== todo.id);
        setTodos(filtred);
      })

      .catch((err) => alert("Veriyi bir hata oluştu.."));
  };

  const handleChange = () => {
    const updated = { ...todo, isDone: !todo.isDone };

  
    axios
      .put(`/todos/${updated.id}`, updated)

      .then(() => {
        const newTodos = allTodos.map((i) =>
          i.id === updated.id ? updated : i
        );

        setTodos(newTodos);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newTitle = e.target[0].value;
    // todonun güncel objesini oluşturma
    const updated = { ...todo, title: newTitle };

    axios
      .put(`/todos/${updated.id}`, updated)

      .then(() => {
      
        const newTodos = allTodos.map((i) =>
          i.id === updated.id ? updated : i
        );

        setTodos(newTodos);

        setIsEditMode(false);
      });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex gap-1">
        <input
          checked={todo.isDone}
          onChange={handleChange}
          className="form-check-input"
          type="checkbox"
        />
        <span>{todo.isDone ? "Tamamlandı" : "Devam Ediyor"}</span>
      </div>

      {isEditMode ? (
        <form onSubmit={handleEdit} className="d-flex gap-2">
          <input defaultValue={todo.title} className="rounded" type="text" />
          <button type="submit">
            <GiCheckMark />
          </button>
          <button type="button" onClick={() => setIsEditMode(false)}>
            <AiOutlineClose />
          </button>
        </form>
      ) : (
        <span>{todo.title}</span>
      )}

      {!isEditMode ? (
        <div className="d-flex align-items-center gap-1">
          <button disabled={isEditMode} onClick={() => setIsEditMode(true)}>
            Düzenle
          </button>

          <button className="bg-danger" onClick={handleDelete}>
            Sil
          </button>
        </div>
      ) : (
        <span></span>
      )}
    </li>
  );
};

export default ListItem;
