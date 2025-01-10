declare module 'react-rating-stars-component' {
  import React from 'react';

  interface ReactStarsProps {
    count?: number; // Общее количество звезд (по умолчанию 5)
    value?: number; // Текущее значение рейтинга
    edit?: boolean; // Возможность редактировать рейтинг (по умолчанию true)
    size?: number; // Размер звезд
    color?: string; // Цвет неактивных звезд
    activeColor?: string; // Цвет активных звезд
    isHalf?: boolean; // Поддержка половинных звезд (по умолчанию false)
    onChange?: (newValue: number) => void; // Обработчик изменения значения рейтинга
  }

  const ReactStars: React.FC<ReactStarsProps>;

  export default ReactStars;
}
