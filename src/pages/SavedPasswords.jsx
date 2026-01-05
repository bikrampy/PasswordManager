import { useOutletContext } from "react-router-dom";

function SavedPasswords() {
  const { savedPasswords, copySavedPassword, deleteSavedPassword } =
    useOutletContext();

  if (savedPasswords.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No saved passwords yet
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-5 rounded-xl shadow-lg">
      <h2 className="text-white text-lg mb-4 font-semibold">
        Saved Passwords
      </h2>

      <div className="space-y-3">
        {savedPasswords.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-900 p-3 rounded"
          >
            <div>
              <p className="text-orange-400">{item.site}</p>
              <p className="text-xs text-gray-300 font-mono">
                {item.password}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => copySavedPassword(item.password)}
                className="bg-blue-600 px-3 py-1 text-xs text-white"
              >
                Copy
              </button>
              <button
                onClick={() => deleteSavedPassword(item.id)}
                className="bg-red-600 px-3 py-1 text-xs text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPasswords;