"use client";

import Image from "next/image";
import { useState, KeyboardEvent } from "react";

type Tab = "files" | "suggestions";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("files");

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, trimmed]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleAddAttachment = () => {
    setInput((prev) => (prev ? `${prev} [attachment]` : "[attachment]"));
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 flex flex-col justify-between">
        <div>
          {/* Logo + Text */}
          <div className="p-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Image
              src="/logo.png"
              alt="OPEX AI logo"
              width={20}
              height= {20}
              className="object-contain"
            />
            <span>OPEX AI</span>
          </div>

          {/* Nav */}
          <nav className="mt-2 space-y-2">
            {/* Home Button */}
            <button className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md">
                          <Image
              src="/home.png"
              alt="Home Icon"
              width={20}
              height= {20}
              className="object-contain"
            />
              <span>Home</span>
            </button>

            {/* New Process Button */}
            <button className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md">
              <Image
              src="/border_color.png"
              alt="New Process Icon"
              width={20}
              height= {20}
              className="object-contain"
            />
              <span>New Process</span>
            </button>
          </nav>
        </div>

        {/* Tabs bar */}
        <div className="mt-6 border-y border-gray-200">
          <div className="flex items-center gap-4 px-4 py-3 bg-gray-100/60">
            {/* Files tab */}
            <button
              className={`px-3 py-1.5 rounded-md text-sm ${
                activeTab === "files"
                  ? "bg-white text-gray-900 font-medium ring-1 ring-gray-200 shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("files")}
            >
              Files
            </button>

            {/* Suggestions tab */}
            <button
              className={`px-3 py-1.5 rounded-md text-sm ${
                activeTab === "suggestions"
                  ? "bg-white text-gray-900 font-medium ring-1 ring-gray-200 shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("suggestions")}
            >
              Suggestions
            </button>
          </div>

          {/* Tab content */}
          <div className="py-6 space-y-6 px-6 text-gray-400 text-sm">
            {activeTab === "files" ? (
              <>
                <div>Generated Files</div>
                <div>Uploaded Files</div>
              </>
            ) : (
              <>
                <div>AI Suggestions</div>
                <div className="text-xs text-gray-400">
                  Start a process to see suggestions here.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Profile Footer */}
        <div className="p-4 flex items-center gap-3 border-t border-gray-200">
          <div className="w-8 h-8 bg-blue-400 text-white flex items-center justify-center rounded-full text-sm font-medium">
            C
          </div>
          <span className="text-sm font-medium text-gray-700">
            Claire Yokota
          </span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-gray-200 flex items-center px-6 text-gray-800 font-medium">
          Untitled Process 3
        </header>

        <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-lg font-semibold text-gray-800">
            Hello Claire Yokota
          </h1>
          <p className="text-gray-500 mt-1">
            What process can I help you with today?
          </p>

          <div className="mt-8 w-full max-w-xl">
            <div className="flex items-center bg-gray-100 rounded-full shadow-card px-4 py-3">
              <button
                className="text-gray-400 mr-3 hover:text-gray-600"
                onClick={handleAddAttachment}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <input
                placeholder="Type something"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                className="ml-3 text-gray-400 hover:text-gray-600"
                onClick={handleSubmit}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 19V5M12 5l-6 6M12 5l6 6"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 text-left space-y-2" id="messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg"
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
