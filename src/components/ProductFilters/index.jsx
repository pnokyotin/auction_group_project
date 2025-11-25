// src/components/ProductFilters.jsx
export default function ProductFilters({
  search,
  setSearch,
  filterWarehouse,
  setFilterWarehouse,
  filterRoom,
  setFilterRoom,
  filterApproval,
  setFilterApproval,
  warehouseOptions,
  roomOptions,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded text-black flex-1"
      />

      <select
        value={filterWarehouse}
        onChange={(e) => setFilterWarehouse(e.target.value)}
        className="p-2 rounded text-black"
      >
        <option value="">All Warehouses</option>
        {warehouseOptions.map((w, i) => (
          <option key={i} value={w}>{w}</option>
        ))}
      </select>

      <select
        value={filterRoom}
        onChange={(e) => setFilterRoom(e.target.value)}
        className="p-2 rounded text-black"
      >
        <option value="">All Rooms</option>
        {roomOptions.map((r, i) => (
          <option key={i} value={r}>{r}</option>
        ))}
      </select>

      <select
        value={filterApproval}
        onChange={(e) => setFilterApproval(e.target.value)}
        className="p-2 rounded text-black"
      >
        <option value="">All Approval</option>
        <option value="0">Not Approved</option>
        <option value="1">Approved</option>
      </select>
    </div>
  );
}
