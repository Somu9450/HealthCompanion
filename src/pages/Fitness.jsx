import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Target, Trophy, PlayCircle, Flame } from 'lucide-react';

const weeklyData = [
  { day: 'M', cal: 400 }, { day: 'T', cal: 600 }, { day: 'W', cal: 350 },
  { day: 'T', cal: 700 }, { day: 'F', cal: 500 }, { day: 'S', cal: 900 }, { day: 'S', cal: 550 }
];

export default function Fitness() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fitness Goals</h1>
        <p className="text-gray-500">Workouts & Activity Tracking</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Target Weight Card */}
        <div className="bg-purple-500 rounded-3xl p-5 text-white shadow-md">
          <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mb-3">
            <Target size={18} />
          </div>
          <p className="text-sm opacity-90 mb-1">Target Weight</p>
          <h2 className="text-2xl font-bold mb-1">65 kg</h2>
          <p className="text-xs opacity-80">Current: 70 kg</p>
        </div>

        {/* Streak Card */}
        <div className="bg-orange-500 rounded-3xl p-5 text-white shadow-md">
          <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mb-3">
            <Trophy size={18} />
          </div>
          <p className="text-sm opacity-90 mb-1">Streak</p>
          <h2 className="text-2xl font-bold mb-1">12 Days</h2>
          <p className="text-xs opacity-80">Keep it up!</p>
        </div>
      </div>

      {/* Calories Burned Chart */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900">Calories Burned</h3>
          <span className="text-sm text-gray-400">This Week</span>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="cal" fill="#6366f1" radius={[4, 4, 4, 4]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Workout */}
      <h3 className="font-bold text-gray-900 mb-4">Today's Workout</h3>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative h-40 bg-gray-800 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80" alt="Workout" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-800">45 min</div>
          <button className="relative z-10 text-white hover:scale-110 transition-transform">
            <PlayCircle size={48} strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Full Body HIIT</h4>
              <p className="text-sm text-gray-500">High Intensity Interval Training</p>
            </div>
            <div className="flex items-center text-orange-500 text-sm font-semibold">
              <Flame size={16} className="mr-1" /> 320 cal
            </div>
          </div>
          <div className="mt-4 mb-5">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Progress</span>
              <span>0%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div className="bg-teal-500 h-2 rounded-full w-0"></div>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition">
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
}