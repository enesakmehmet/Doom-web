import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Format price to Turkish Lira
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} TL`;
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Ödeme yapmak için giriş yapmalısınız.');
      return;
    }
    
    // In a real app, this would redirect to a checkout page or process
    alert('Ödeme işlemi başlatılıyor...');
    clearCart();
    onClose();
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <div className="cart-modal-header">
          <h2>Sepetim ({totalItems})</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-modal-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Sepetiniz boş</p>
              <button className="cart-continue-btn" onClick={onClose}>
                Alışverişe Devam Et
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={`${item.id}-${item.type}`} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    
                    <div className="cart-item-details">
                      <h3>{item.title}</h3>
                      <p className="cart-item-type">{item.type === 'game' ? 'Oyun' : 'DLC'}</p>
                      <p className="cart-item-price">{formatPrice(item.price)}</p>
                    </div>
                    
                    <div className="cart-item-actions">
                      <div className="cart-item-quantity">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="cart-remove-btn"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="cart-total">
                  <span>Toplam:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="cart-actions">
                  <button 
                    className="cart-clear-btn"
                    onClick={clearCart}
                  >
                    Sepeti Temizle
                  </button>
                  
                  <button 
                    className="cart-checkout-btn"
                    onClick={handleCheckout}
                  >
                    Ödeme Yap
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
