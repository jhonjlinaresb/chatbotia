import { useState } from 'react';
import { sendMessage } from '../services/chatService';

export function Chat() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Añadir mensaje del usuario
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botResponse = await sendMessage(input);
      setMessages((prev) => [...prev, { from: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Error conectando con el servidor.' }]);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu mensaje..."
          className="flex-1 p-2 rounded-l border"
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r">
          Enviar
        </button>
      </div>
    </div>
  );
}
