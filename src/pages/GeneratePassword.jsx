import { useOutletContext } from "react-router-dom";

function GeneratePassword() {
  const {
    length,
    setLength,
    numberAllowed,
    setNumberAllowed,
    charAllowed,
    setCharAllowed,
    password,
    site,
    setSite,
    generatePassword,
    savePassword,
  } = useOutletContext();

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
      <h1 className="text-white text-2xl font-semibold text-center mb-5">
        Password Generator
      </h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={password}
          readOnly
          className="flex-1 px-3 py-2 bg-gray-900 text-orange-400 outline-none"
        />
        <button
          onClick={generatePassword}
          className="bg-blue-600 px-4 text-white"
        >
          Generate
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="Website / Username"
          className="flex-1 px-3 py-2 bg-gray-900 text-orange-400 outline-none"
        />
        <button
          onClick={savePassword}
          className="bg-green-600 px-4 text-white"
        >
          Save
        </button>
      </div>

      <div className="space-y-3 text-sm text-gray-200">
        <div>
          Length: <span className="text-orange-400">{length}</span>
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full accent-orange-500"
          />
        </div>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((p) => !p)}
          />
          Include Numbers
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((p) => !p)}
          />
          Include Characters
        </label>
      </div>
    </div>
  );
}

export default GeneratePassword;