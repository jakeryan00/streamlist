import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";

function StreamList() {
  const [title, setTitle] = useState("");
  const [streamItems, setStreamItems] = useState(() => {
    const savedItems = localStorage.getItem("streamItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("streamItems", JSON.stringify(streamItems));
  }, [streamItems]);

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a movie or show title.");
      return;
    }

    if (editIndex !== null) {
      const updatedItems = [...streamItems];
      updatedItems[editIndex].name = title;
      setStreamItems(updatedItems);
      setEditIndex(null);
    } else {
      const newItem = {
        name: title,
        completed: false,
      };

      setStreamItems([...streamItems, newItem]);
    }

    console.log("User added:", title);
    setTitle("");
  }

  function handleDelete(index) {
    const updatedItems = streamItems.filter((item, itemIndex) => itemIndex !== index);
    setStreamItems(updatedItems);
  }

  function handleEdit(index) {
    setTitle(streamItems[index].name);
    setEditIndex(index);
  }

  function handleComplete(index) {
    const updatedItems = [...streamItems];
    updatedItems[index].completed = !updatedItems[index].completed;
    setStreamItems(updatedItems);
  }

  return (
    <main className="page">
      <h1>My StreamList</h1>
      <p>Add movies or shows you want to watch later.</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter movie or show title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">
          {editIndex !== null ? "Update Item" : "Add to StreamList"}
        </button>
      </form>

      <section className="list-section">
        {streamItems.length === 0 ? (
          <p className="empty-message">No movies or shows added yet.</p>
        ) : (
          <ul className="stream-list">
            {streamItems.map((item, index) => (
              <li key={index} className={item.completed ? "completed item" : "item"}>
                <span>{item.name}</span>

                <div className="item-buttons">
                  <button onClick={() => handleComplete(index)} className="icon-button">
                    <FaCheckCircle />
                  </button>

                  <button onClick={() => handleEdit(index)} className="icon-button">
                    <FaEdit />
                  </button>

                  <button onClick={() => handleDelete(index)} className="icon-button delete">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default StreamList;