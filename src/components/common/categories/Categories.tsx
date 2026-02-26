import React, { useEffect, useState } from 'react';
import s from './Categories.module.css';

interface CategoryItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загрузка категорий с API
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        
        // Берем только 4 категории
        const formattedCategories = data.slice(0, 4).map((cat: string, index: number) => ({
          id: index + 1,
          title: cat.charAt(0).toUpperCase() + cat.slice(1), // Делаем первую букву заглавной
          image: `https://via.placeholder.com/400x225/4295E4/ffffff?text=${cat}`, // Заглушка
          link: `/category/${cat}`
        }));
        
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        // Заглушка при ошибке
        setCategories([
          { id: 1, title: 'Электроника', image: 'https://via.placeholder.com/400x225/4295E4/ffffff?text=Electronics', link: '/category/electronics' },
          { id: 2, title: 'Одежда', image: 'https://via.placeholder.com/400x225/4295E4/ffffff?text=Clothing', link: '/category/clothing' },
          { id: 3, title: 'Дом и сад', image: 'https://via.placeholder.com/400x225/4295E4/ffffff?text=Home', link: '/category/home' },
          { id: 4, title: 'Спорт', image: 'https://via.placeholder.com/400x225/4295E4/ffffff?text=Sports', link: '/category/sports' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className={s.categories}>
        <div className={s.categories_container}>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Загрузка категорий...
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={s.categories}>
      <div className={s.categories_container}>
        <h1 className={s.categories_title}>Категории</h1>
        
        <div className={s.categories_grid}>
          {categories.map((category) => (
            <div key={category.id} className={s.category_card}>
              <div className={s.category_header}>
                <h3 className={s.category_title}>{category.title}</h3>
                <a href={category.link} className={s.category_button}>
                  Перейти
                  <span className={s.category_button_arrow}>→</span>
                </a>
              </div>
              
              <div className={s.category_image_container}>
                <img 
                  src={category.image} 
                  alt={category.title}
                  className={s.category_image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;