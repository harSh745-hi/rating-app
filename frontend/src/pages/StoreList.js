export default function StoreList({ stores, onRate }) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Stores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold">{store.name}</h3>
            <p className="text-gray-600">{store.address}</p>
            <p className="mt-2">{store.avgRating || "No ratings yet"}</p>
            <button 
              onClick={() => onRate(store.id)}
              className="mt-4 bg-accent text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Rate Store
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
