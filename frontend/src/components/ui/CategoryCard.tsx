import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  to: string;
  subtext: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id, title, icon, description, color, to, subtext
})=> (
  <div id={id} className={`bg-gradient-to-br ${color} border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group`}>
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-5xl">{icon}</span>
        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all">
          <span className="text-white text-xl group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      <Link to={to} className="inline-block text-blue-400 text-sm font-medium">
        {subtext}
      </Link>
    </div>
  </div>
);

export default CategoryCard;
