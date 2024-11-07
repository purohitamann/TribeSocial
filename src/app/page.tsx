'use client';
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
// {api} or api? api is a variable, not a function
// interface Messages {
//   sender: string;
//   content: string;
// }
export default function Home() {
  // const [messages, setMessages] = useState<Messages[]>([
  //   { sender: "Alice", content: "Welcome to Tribes" },
  //   { sender: "Bob", content: "Hi there" },
  // ]);
  const messages = useQuery(api.functions.messages.list);
  const createMessage = useMutation(api.functions.messages.create);
  const [input, setInput] = useState("");
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    createMessage({ sender: "Alice", content: input });
    setInput("");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Welcome to Tribes</h1>
      <div>
        {messages?.map((message, key) => (
          <div key={key} className="flex gap-2">
            <div className="font-bold">{message.sender}:</div>
            <div>{message.content}</div>
          </div>
        ))}
        <form onSubmit={sendMessage} className="flex gap-2 bg-[#f2f2f2] p-2">
          <input className="w-full border-black" type="text" name="message" id="message" onChange={e => setInput(e.target.value)} />
          <button className="bg-black text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  );
}
