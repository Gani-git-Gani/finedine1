import React from 'react';
import '../styles/CategoryIcons.css';

function CategoryIcons() {
  const categories = [
    { name: 'Preorder', icon: '🍽️' },
    { name: 'Dine', icon: '🏠' },
    { name: 'Top', icon: '⭐' },
    { name: 'Popular', icon: '🔥' },
  ];

  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <div className="category-item" key={index}>
          <div className="icon">{category.icon}</div>
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
}

export default CategoryIcons;