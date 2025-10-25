import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useMenu } from '../hooks/useMenu';
import './MenuPage.css';

const categories = [
  { id: 'all', label: 'All Pies' },
  { id: 'pizza', label: 'Pizza Pies' },
  { id: 'savory', label: 'Savory Pies' },
  { id: 'dessert', label: 'Dessert Pies' },
  { id: 'seasonal', label: 'Seasonal Specials' },
];

function MenuPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: menuData, isLoading, error } = useMenu({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    available: true,
  });

  return (
    <div className="menu-page">
      <Navigation />

      {/* Hero Header */}
      <header className="menu-hero">
        <div className="container">
          <h1>PIE MENU</h1>
          <p>Browse our arsenal of flavors. Each pie is handcrafted with premium ingredients.</p>
        </div>
      </header>

      {/* Menu Items */}
      <section className="menu-items">
        <div className="container">
          {isLoading && <p className="loading">Loading menu...</p>}

          {error && (
            <div className="error-message">
              <p>Failed to load menu. Please try again later.</p>
            </div>
          )}

          {menuData && menuData.data.length === 0 && (
            <p className="no-items">No items available in this category.</p>
          )}

          {menuData && menuData.data.length > 0 && (
            <div className="menu-grid">
              {menuData.data.map((item, index) => {
                // Map pie images based on category and name
                const getImageUrl = () => {
                  const name = item.name.toLowerCase();
                  if (name.includes('apple')) return 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&h=600&fit=crop';
                  if (name.includes('cherry')) return 'https://images.unsplash.com/photo-1621955964441-c173e01c135b?w=800&h=600&fit=crop';
                  if (name.includes('chocolate')) return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop';
                  if (name.includes('pumpkin')) return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop';
                  if (name.includes('chicken')) return 'https://images.unsplash.com/photo-1619897303780-033598db6e0f?w=800&h=600&fit=crop';
                  if (item.category === 'pizza') return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop';
                  return 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&h=600&fit=crop';
                };

                return (
                  <div key={item.id} className="menu-item-card">
                    <div className="item-image">
                      <img src={getImageUrl()} alt={item.name} loading="lazy" />
                      {index === 0 && <span className="featured-badge">★ Featured</span>}
                    </div>
                    <div className="item-content">
                      <h3>{item.name.toUpperCase()}</h3>
                      <p className="item-description">{item.description}</p>

                      {/* Dietary Icons */}
                      {(item.isVegetarian || item.isVegan || item.isGlutenFree) && (
                        <div className="dietary-icons">
                          {item.isVegetarian && <span className="icon" title="Vegetarian">🌱</span>}
                          {item.isVegan && <span className="icon" title="Vegan">🌿</span>}
                          {item.isGlutenFree && <span className="icon" title="Gluten Free">🌾</span>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="menu-cta">
        <div className="container">
          <h2>READY TO TRY OUR PIES?</h2>
          <p>Find out where we'll be next!</p>
          <button className="btn btn-primary" onClick={() => navigate('/events')}>
            FIND THE BOMBER
          </button>
        </div>
      </section>
    </div>
  );
}

export default MenuPage;
