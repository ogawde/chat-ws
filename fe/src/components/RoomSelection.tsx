import type { Room } from "../types";

interface RoomSelectionProps {
  rooms: Room[];
  onJoinRoom: (roomId: string) => void;
}

export const RoomSelection = ({ rooms, onJoinRoom }: RoomSelectionProps) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">Chat-WS</h1>
          <p className="text-gray-400 text-center text-lg">Choose a room that matches your vibe</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => onJoinRoom(room.id)}
              className="group cursor-pointer bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-700 hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-center">
                <div className={`${room.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-white text-3xl font-bold">{room.symbol}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-400 mb-4">Join the {room.name.toLowerCase()} room</p>
                <div className="bg-gray-800 rounded-md px-4 py-2 text-sm text-gray-300">
                    Click to join
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
