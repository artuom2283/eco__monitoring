import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>Data Management</h1>
      <nav>
        <Link to="/HomePage" className="nav-link">Home</Link>
        {/* <Link to="/pollution-calculation" className="nav-link">Pollution Calculation</Link> */}
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <h3>© 2024 Environmental Monitoring</h3>
    </footer>
  );
};

const PollutionPage: React.FC = () => {
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const addItem = () => {
    if (newItem.trim()) {
      setData([...data, { id: Date.now(), name: newItem }]);
      setNewItem('');
    }
  };

  const deleteItem = (id: number) => {
    setData(data.filter(item => item.id !== id));
  };

  const editItem = (id: number, newName: string) => {
    setData(data.map(item => item.id === id ? { ...item, name: newName } : item));
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) =>
    sortAscending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div className="container">
      <Header />
      <main className="main">
        <div className="input-group">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
          />
          <button onClick={addItem}>Add</button>
        </div>
        <div className="search-group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
          <button onClick={() => setSortAscending(!sortAscending)}>
            Sort {sortAscending ? 'Descending' : 'Ascending'}
          </button>
        </div>
        <ul>
          {sortedData.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => deleteItem(item.id)}>Delete</button>
              <button onClick={() => {
                const newName = prompt('Enter new name:', item.name);
                if (newName) editItem(item.id, newName);
              }}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default PollutionPage;
