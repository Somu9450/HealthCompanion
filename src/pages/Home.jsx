import { useSelector } from 'react-redux';
import { Bell, ShieldAlert, Flame, Footprints, Droplets, Moon, Stethoscope, Bot, Utensils, ChevronRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const mockChartData = [
  { day: 'Mon', value: 30 }, { day: 'Tue', value: 50 }, { day: 'Wed', value: 40 },
  { day: 'Thu', value: 65 }, { day: 'Fri', value: 45 }, { day: 'Sat', value: 80 }, { day: 'Sun', value: 60 }
];

export default function Home() {
  const navigate = useNavigate();
  const { userName, currentActivity, dailyGoal } = useSelector((state) => state.health);

  const quickActions = [
    { title: 'Symptom Check', desc: 'Check health issues', icon: '🤒', path: '/medical', bg: 'bg-orange-50' },
    { title: 'Ask AI Coach', desc: 'Get instant advice', icon: '🤖', path: '/ai-coach', bg: 'bg-blue-50' },
    { title: 'Diet Plan', desc: "View today's meals", icon: '🥗', path: '/diet', bg: 'bg-green-50' },
    { title: 'Find Doctors', desc: 'Nearby specialists', icon: '🏥', path: '/medical', bg: 'bg-purple-50' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 md:pt-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Good Morning,</p>
            <h1 className="text-xl font-bold text-gray-900">{userName}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-red-500 bg-red-50 rounded-full hover:bg-red-100 transition">
            <ShieldAlert size={20} />
          </button>
          <button className="p-2 text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <Bell size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Activity Card (Green Gradient) */}
        <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-medium opacity-90">Daily Activity</h2>
              <p className="text-sm opacity-80">You are doing great today!</p>
            </div>
            <div className="p-2 bg-white/20 rounded-full">
              <Flame size={20} className="text-white" />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{currentActivity.calories.toLocaleString()}</span>
              <span className="text-sm opacity-80">/ {dailyGoal.calories.toLocaleString()} kcal</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-black/10 h-2 rounded-full mt-3">
              <div 
                className="bg-white h-2 rounded-full" 
                style={{ width: `${(currentActivity.calories / dailyGoal.calories) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-2xl p-3">
              <div className="flex items-center gap-1 opacity-80 text-sm mb-1"><Footprints size={14}/> Steps</div>
              <div className="font-bold text-lg">{currentActivity.steps.toLocaleString()}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3">
              <div className="flex items-center gap-1 opacity-80 text-sm mb-1"><Droplets size={14}/> Water</div>
              <div className="font-bold text-lg">{currentActivity.water}L</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3">
              <div className="flex items-center gap-1 opacity-80 text-sm mb-1"><Moon size={14}/> Sleep</div>
              <div className="font-bold text-lg">{currentActivity.sleep}</div>
            </div>
          </div>
        </div>

        {/* Right side for Desktop (Quick Actions & Chart) */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <button 
                  key={idx} 
                  onClick={() => navigate(action.path)}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-left"
                >
                  <div className={`w-10 h-10 ${action.bg} rounded-full flex items-center justify-center text-xl mb-3`}>
                    {action.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900">{action.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Trend Chart */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Activity Trend</h3>
              <button className="text-teal-600 text-sm font-medium flex items-center">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-xs text-gray-400 px-2 mt-2">
                <span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}