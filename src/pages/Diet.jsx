import { Plus } from 'lucide-react';

export default function Diet() {
  const meals = [
    { name: 'Breakfast', time: '08:00 AM', desc: 'Oatmeal with Berries', cal: 350, icon: '🥣' },
    { name: 'Lunch', time: '01:00 PM', desc: 'Grilled Chicken Salad', cal: 550, icon: '🥗' },
    { name: 'Snack', time: '04:30 PM', desc: 'Greek Yogurt', cal: 150, icon: '🍎' },
    { name: 'Dinner', time: '08:00 PM', desc: 'Salmon & Quinoa', cal: 480, icon: '🐟' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Diet Plan</h1>
          <p className="text-gray-500">Track your nutrition</p>
        </div>
        <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50">
          <Plus size={20} />
        </button>
      </div>

      {/* Dark Dashboard */}
      <div className="bg-[#111827] rounded-3xl p-6 text-white shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold">Calories Today</h2>
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium">Goal: 2,400</span>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Simple SVG Circle for the ring */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#374151" strokeWidth="12" />
              <circle cx="80" cy="80" r="70" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="440" strokeDashoffset="200" strokeLinecap="round" />
            </svg>
            <div className="text-center z-10">
              <span className="text-4xl font-bold block">1,250</span>
              <span className="text-sm text-gray-400">Left</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-[#a855f7] mb-2 font-medium">Protein</p>
            <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2"><div className="bg-[#a855f7] h-1.5 rounded-full w-[60%]"></div></div>
            <p className="text-xs font-bold">90<span className="text-gray-400 font-normal">/150g</span></p>
          </div>
          <div>
            <p className="text-xs text-[#f97316] mb-2 font-medium">Carbs</p>
            <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2"><div className="bg-[#f97316] h-1.5 rounded-full w-[40%]"></div></div>
            <p className="text-xs font-bold">120<span className="text-gray-400 font-normal">/300g</span></p>
          </div>
          <div>
            <p className="text-xs text-[#eab308] mb-2 font-medium">Fats</p>
            <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2"><div className="bg-[#eab308] h-1.5 rounded-full w-[25%]"></div></div>
            <p className="text-xs font-bold">15<span className="text-gray-400 font-normal">/60g</span></p>
          </div>
        </div>
      </div>

      {/* Meals Timeline */}
      <h3 className="font-bold text-gray-900 mb-4 text-lg">Today's Meals</h3>
      <div className="relative pl-4 space-y-6 border-l-2 border-gray-100 ml-3">
        {meals.map((meal, idx) => (
          <div key={idx} className="relative pl-6">
            <div className={`absolute -left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white ${idx === 0 ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-2xl">
                  {meal.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{meal.name} <span className="text-xs font-normal text-gray-400 ml-2">{meal.time}</span></h4>
                  <p className="text-sm text-gray-500">{meal.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-gray-900">{meal.cal}</span>
                <span className="text-xs text-gray-400">kcal</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tip Box */}
      <div className="mt-8 bg-teal-50 rounded-2xl p-4 flex gap-4 border border-teal-100">
        <div className="text-teal-500 mt-1">🌿</div>
        <div>
          <h4 className="font-bold text-teal-900 text-sm mb-1">Nutrition Tip</h4>
          <p className="text-sm text-teal-800 opacity-90 leading-relaxed">Based on your activity, you should increase your protein intake for dinner. Try adding some grilled tofu or chicken.</p>
        </div>
      </div>
    </div>
  );
}