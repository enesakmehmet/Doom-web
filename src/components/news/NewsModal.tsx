import React from 'react';

interface NewsModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  image: string;
  date: string;
  content: string;
}

const NewsModal: React.FC<NewsModalProps> = ({ open, onClose, title, image, date, content }) => {
  if (!open) return null;
  return (
    <div className="news-modal-overlay">
      <div className="news-modal-card">
        <button className="news-modal-close" onClick={onClose}>×</button>
        <img src={image} alt={title} className="news-modal-img" />
        <div className="news-modal-content">
          <h2>{title}</h2>
          <span className="news-modal-date">{date}</span>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
