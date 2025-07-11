import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-white p-10 space-y-4">
      <div className="text-red-300 text-xl font-bold">Red 300 (should be light red)</div>
      <div className="text-red-600 text-xl font-bold">Red 600 (should be visible red)</div>
      <div className="text-blue-500 text-xl font-bold">Blue 500 (should be visible blue)</div>
      <div className="!text-green-500 text-xl font-bold">Green 500 with !important</div>
    </div>
  );
}

  
