import { useState, useRef, useEffect } from "react";
import { Send, Plus, X, Settings } from "lucide-react";
import Layout from "@/components/Layout";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  title: string;
  timestamp: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your AI Assistant. I can help you with leave requests, task management, performance insights, and general HR queries. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, title: "Leave Request Help", timestamp: "Today" },
    { id: 2, title: "Performance Tips", timestamp: "Yesterday" },
    { id: 3, title: "Task Management", timestamp: "Dec 10" },
  ]);
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: "user",
        content: inputValue,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages([...messages, newMessage]);
      setInputValue("");

      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "I understand. Can you provide more details about your request?",
          "That's a great question! Here's what I recommend...",
          "Let me help you with that. I've prepared some information for you.",
          "I can assist with that. Would you like me to draft a leave request?",
          "Based on our system, I can help you track your progress.",
        ];

        const aiResponse: Message = {
          id: messages.length + 2,
          type: "assistant",
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, aiResponse]);
      }, 500);
    }
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: 1,
        type: "assistant",
        content: "Hello! Starting a new conversation. How can I help you?",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setActiveConversation(null);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-120px)] gap-4">
        {/* Sidebar - Conversations */}
        <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col p-4 hidden lg:flex">
          <button
            onClick={handleNewConversation}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-sm mb-4"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>

          <div className="space-y-2 flex-1 overflow-y-auto">
            <h3 className="text-xs font-semibold text-gray-600 uppercase px-2 mb-2">Conversation History</h3>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm truncate ${
                  activeConversation === conv.id
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50 border border-transparent"
                }`}
              >
                <p className="font-medium truncate">{conv.title}</p>
                <p className="text-xs text-gray-500">{conv.timestamp}</p>
              </button>
            ))}
          </div>

          <button className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <h1 className="text-lg font-bold text-gray-900">AI Assistant</h1>
              <p className="text-xs text-gray-600">Your personal HR & productivity assistant</p>
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>{message.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything about your work, leave, tasks, or performance..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
