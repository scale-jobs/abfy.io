// Personal/openSource/abfy.io/apps/dashboard/app/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/hello');
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {data && <p>{data}</p>}
    </div>
  );
}
