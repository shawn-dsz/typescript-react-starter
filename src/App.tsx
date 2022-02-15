import { useEffect, useState } from 'react';
import './App.css';

import { Board, Column, Card } from './types';

const TaskCard = (card: Card) => {
  return (
    <div className="card">
      <div className="card-content">
        <p>{card.id}</p>
        <p>{card.name}</p>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

const StatusColumn = ({
  id,
  name,
  cards,
  toggleSort,
}: Column & { toggleSort: Function }) => {
  const orderMe = () => {
    toggleSort(id);
  };
  return (
    <div className="column" key={id}>
      <div className="column-title">
        {name}
        {id}
        <button onClick={orderMe}>Order</button>
      </div>
      <div className="card-container">
        {cards && cards.map((card) => <TaskCard key={id} {...card} />)}
      </div>
    </div>
  );
};
function App() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const toggleSort = (columId: string) => {
    console.log('toggleSort', columId);
    const ncol = [...columns];
    const column = ncol.find((col) => col.id === columId);
    if (column?.cards) {
      column.cards = column.cards.sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0,
      );
    }
    setColumns(ncol);
  };
  useEffect(() => {
    fetch('http://localhost:3001/board')
      .then((response) => response.json())
      .then(({ columns }: Board) => {
        setColumns(columns);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <div className="column-container">
        {loading && !error && <div>Loading...</div>}
        {error && <div>Error!</div>}
        {!loading &&
          !error &&
          columns.map((column: Column) => (
            <StatusColumn {...column} toggleSort={toggleSort} />
          ))}
      </div>
    </div>
  );
}

export default App;
