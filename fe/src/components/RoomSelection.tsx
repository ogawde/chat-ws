import { useState } from "react";
import type { Room } from "../types";

interface RoomSelectionProps {
  rooms: Room[];
  onJoinRoom: (roomId: string) => void;
}

export const RoomSelection = ({ rooms, onJoinRoom }: RoomSelectionProps) => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Header */}
      <div className="relative border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-xl font-bold">💬</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Chat-WS
              </h1>
            </div>
            <p className="text-slate-400 text-center text-lg max-w-2xl mx-auto">
              Step into a unique space. Choose the room that resonates with your vibe and connect with others in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              onClick={() => onJoinRoom(room.id)}
              className="group relative cursor-pointer"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Card Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                room.id === "rooftop" ? "from-slate-700 to-slate-800" :
                room.id === "cafe" ? "from-amber-600/20 to-slate-800" :
                room.id === "underground" ? "from-purple-600/20 to-slate-800" :
                "from-emerald-600/20 to-slate-800"
              } rounded-2xl transition-all duration-300 ${hoveredRoom === room.id ? "opacity-100" : "opacity-0"}`} />
              
              {/* Card Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                room.id === "rooftop" ? "from-slate-600 to-slate-700" :
                room.id === "cafe" ? "from-amber-500 to-slate-700" :
                room.id === "underground" ? "from-purple-500 to-slate-700" :
                "from-emerald-500 to-slate-700"
              } rounded-2xl p-[1px] transition-all duration-300 ${hoveredRoom === room.id ? "opacity-100" : "opacity-40"}`}>
                <div className="bg-slate-900 rounded-2xl inset-0 absolute" />
              </div>

              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="text-center space-y-6">
                  {/* Icon Circle */}
                  <div className={`relative w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300 transform ${hoveredRoom === room.id ? "scale-110" : "scale-100"}`}>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${room.color} blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300`} />
                    <div className={`relative ${room.color} w-full h-full rounded-full flex items-center justify-center`}>
                      <span className="text-4xl">{room.symbol}</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{room.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {room.id === "rooftop" && "High-rise conversations with a view"}
                      {room.id === "cafe" && "Cozy chats over steaming beverages"}
                      {room.id === "underground" && "Deep discussions below the surface"}
                      {room.id === "plaza" && "Vibrant community gathering space"}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      hoveredRoom === room.id
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}>
                      <span>Join Room</span>
                      <span className={`transition-transform duration-300 ${hoveredRoom === room.id ? "translate-x-1" : ""}`}>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="relative text-center py-8 text-slate-500 text-sm">
        <p>Select a room to begin your conversation</p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};
