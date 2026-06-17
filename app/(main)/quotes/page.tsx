import ToastInterval from './ToastInterval';

interface Quote {
  id: number;
  quote: string;
  author: string;
}


// Task 5: SSR Implementation
async function getQuotes() {
  const res = await fetch('https://dummyjson.com/quotes', {
    cache: 'no-store', // Forces Server-Side Rendering (SSR) on every request
  });
  if (!res.ok) throw new Error('Failed to fetch quotes');
  return res.json();
}

export default async function QuotesPage() {
  const data = await getQuotes();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daily Quotes (SSR)</h1>
      <p>Stay on this page to see quotes pop up every 5 seconds.</p>
      
      {/* Client component to handle the interval toasts */}
      <ToastInterval quotes={data.quotes} />
      
      <div className="mt-8 space-y-4 text-black">
        {data.quotes.slice(0, 10).map((q: Quote) => (
          <div key={q.id} className="p-4 bg-gray-100 rounded">
            &quot;{q.quote}&quot; - <strong>{q.author}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}