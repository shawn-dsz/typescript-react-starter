import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  name: string;
}
export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data: Task[]) => {
        console.log({data})
        setTasks(data);
      });
  }, []);
  return (
    <div>
      <h1>Task List</h1>
      {JSON.stringify(tasks)}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}
