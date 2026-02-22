import { NavLink } from 'react-router-dom';
import { Home, Activity, Utensils, Stethoscope, Bot } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Fitness', path: '/fitness', icon: Activity },
    { name: 'Diet', path: '/diet', icon: Utensils },
    { name: 'Medical', path: '/medical', icon: Stethoscope },
    { name: 'AI Coach', path: '/ai-coach', icon: Bot },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-3 md:py-4 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                  isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <Icon size={24} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}