import { useState, useEffect, useRef } from "react";
function App() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);
    const [site, setSite] = useState("");
    const [savedPasswords, setSavedPasswords] = useState([]);

    // Removed unused copyPasswordToClipboard
    const copySavedPassword = (password) => {
        window.navigator.clipboard.writeText(password);
    };

    const deleteSavedPassword = (id) => {
        const filtered = savedPasswords.filter(item => item.id !== id);
        setSavedPasswords(filtered);
        localStorage.setItem("passwords", JSON.stringify(filtered));
    };
    const savePassword = () => {
        if (!site || !password) return;
        const newEntry = {
            id: Date.now(),
            site,
            password,
        };
        const updatedPasswords = [...savedPasswords, newEntry];
        setSavedPasswords(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setSite("");
    };

    useEffect(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
        for (let i = 0; i < length; i++) {
            const charIndex = Math.floor(Math.random() * str.length);
            pass += str.charAt(charIndex);
        }
        setPassword(pass);
    }, [length, numberAllowed, charAllowed]);
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("passwords"));
        if (stored) {
            setSavedPasswords(stored);
        }
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full bg-gray-800 text-orange-400 shadow-xl rounded-xl p-6 border border-gray-700">
                    <h1 className="text-white text-2xl font-semibold text-center mb-6">
                        Password Generator
                    </h1>
                    <div className="flex rounded-lg overflow-hidden mb-5 border border-gray-700 bg-gray-900">
                        <input
                            type="text"
                            value={password}
                            className="w-full px-3 py-2 bg-gray-900 text-orange-400 outline-none text-sm"
                            placeholder="Password"
                            readOnly
                            ref={passwordRef}
                        />
                        <button
                            onClick={() => {
                                let pass = "";
                                let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                                if (numberAllowed) str += "0123456789";
                                if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
                                for (let i = 0; i < length; i++) {
                                    const charIndex = Math.floor(Math.random() * str.length);
                                    pass += str.charAt(charIndex);
                                }
                                setPassword(pass);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 text-sm font-medium"
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
                            className="flex-1 px-3 py-2 bg-gray-900 text-orange-400 outline-none text-sm rounded-md border border-gray-700"
                        />
                        <button
                            onClick={savePassword}
                            className="bg-green-600 hover:bg-green-700 active:scale-95 transition-all text-white px-4 rounded-md text-sm font-medium"
                        >
                            Save
                        </button>
                    </div>
                    <div className="space-y-4 text-sm text-gray-200">
                        <div className="flex items-center justify-between gap-3">
                            <label className="whitespace-nowrap">
                                Length:{" "}
                                <span className="font-semibold text-orange-400">
                                    {length}
                                </span>
                            </label>
                            <input
                                type="range"
                                min={6}
                                max={30}
                                value={length}
                                className="w-full accent-orange-500 cursor-pointer"
                                onChange={(e) => {
                                    setLength(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                defaultChecked={numberAllowed}
                                id="numberInput"
                                className="accent-orange-500 cursor-pointer"
                                onChange={() => {
                                    setNumberAllowed((prev) => !prev);
                                }}
                            />
                            <label
                                htmlFor="numberInput"
                                className="cursor-pointer"
                            >
                                Include Numbers
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                defaultChecked={charAllowed}
                                id="characterInput"
                                className="accent-orange-500 cursor-pointer"
                                onChange={() => {
                                    setCharAllowed((prev) => !prev);
                                }}
                            />
                            <label
                                htmlFor="characterInput"
                                className="cursor-pointer"
                            >
                                Include Characters
                            </label>
                        </div>
                    </div>
                </div>
                {savedPasswords.length > 0 && (
                    <div className="bg-gray-800 rounded-xl p-5 shadow-xl">
                        <h2 className="text-white text-lg mb-3 font-semibold">
                            Saved Passwords
                        </h2>

                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {savedPasswords.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center bg-gray-900 p-3 rounded-lg text-sm border border-gray-700 gap-3"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-orange-400">{item.site}</span>
                                        <span className="text-gray-300 font-mono text-xs">
                                            {item.password}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => copySavedPassword(item.password)}
                                            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs text-white"
                                        >
                                            Copy
                                        </button>
                                        <button
                                            onClick={() => deleteSavedPassword(item.id)}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default App;
