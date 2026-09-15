import { useState, useEffect } from 'react';
import './App.css';

interface Item {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  drink?: string;
  addOns?: string[];
  image: string;
}


const heroSlides = [
  {
    subtitle: "Satisfy your cravings with our handcrafted burgers, crispy fries, and cold milkshakes!",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&auto=format&fit=crop&q=80"
  },
  {
    subtitle: "Freshly cooked daily with 100% premium beef patties!",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1600&auto=format&fit=crop&q=80"
  },
  {
    subtitle: "Order now and enjoy special discounts on your favorite combos!",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1600&auto=format&fit=crop&q=80"
  },
  {
    subtitle: "The best taste in town — served hot, fast, and fresh!",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1600&auto=format&fit=crop&q=80"
  }
];

const menuItems: Item[] = [

  {
    id: 1,
    name: 'Cheesy Overload Burger',
    category: 'Beef',
    description: 'Juicy beef patty with double cheddar cheese, melted mozzarella, and signature cheese sauce.',
    price: 99.15,
    rating: 5,
    image: 'https://img.freepik.com/premium-photo/cheese-overload-burger-burger-with-multiple-types-burger-fries-photos-440jpg_995407-131153.jpg?w=1480'
  },
  {
    id: 2,
    name: 'Smoky Bacon Deluxe',
    category: 'Beef',
    description: 'Crispy bacon strips, grilled beef patty, caramelized onions, and smoky barbecue glaze.',
    price: 99.32,
    rating: 5,
    image: 'https://th.bing.com/th/id/OIP.TY25sQ_Xb-85k1exogl7XQHaHa?w=170&h=180&c=7&r=0&o=7&pid=1.7&rm=3'
  },
  {
    id: 3,
    name: 'Spicy Crunchy Chicken',
    category: 'Chicken',
    description: 'Crispy fried chicken fillet topped with spicy mayo, fresh lettuce, and sweet pickles.',
    price: 69.15,
    rating: 4,
    image: 'https://tse3.mm.bing.net/th/id/OIP.l2-JGr4ZcLzHCqffOKfOSwHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 4,
    name: 'Classic Veggie Special',
    category: 'Veggie',
    description: 'Plant-based patty served with fresh tomatoes, cucumbers, lettuce, and honey mustard sauce.',
    price: 99.25,
    rating: 4,
    image: 'https://www.recipetocook.co.uk/wp-content/uploads/2024/04/veggie-burger-recipe.jpg'
  },
  {
    id: 5,
    name: 'Double Mushroom Swiss',
    category: 'Beef',
    description: 'Two juicy beef patties loaded with sautéed mushrooms and creamy Swiss cheese.',
    price: 129.00,
    rating: 5,
    image: 'https://images.eatthismuch.com/med/1328973_tabitharwheeler_ec10666a-bbf8-40f4-9a47-7bcf484757f8.jpg'
  },
  {
    id: 6,
    name: 'Hawaiian Aloha Burger',
    category: 'Beef',
    description: 'Grilled pineapple ring, crispy bacon, beef patty, and sweet teriyaki sauce.',
    price: 115.00,
    rating: 5,
    image: 'https://th.bing.com/th/id/OIP.XEtU_VN91PdOaCpWwr-aZgHaJQ?w=202&h=253&c=7&r=0&o=7&pid=1.7&rm=3'
  },
  
  // FRIES & SIDES
  {
    id: 7,
    name: 'Crispy French Fries',
    category: 'Fries',
    description: 'Golden, crispy potato fries seasoned with salted goodness.',
    price: 49.00,
    rating: 5,
    image: 'https://www.recipetineats.com/wp-content/uploads/2022/09/Fries-with-rosemary-salt_1.jpg?resize=650'
  },
  {
    id: 8,
    name: 'Loaded Cheese & Bacon Fries',
    category: 'Fries',
    description: 'Crispy fries smothered in hot melted cheese and topped with crunchy bacon bits.',
    price: 79.00,
    rating: 5,
    image: 'https://www.carolynscooking.com/wp-content/uploads/2024/01/Loaded-Bacon-Cheese-Fries-3.jpg'
  },
  {
    id: 9,
    name: 'Spicy BBQ Fries',
    category: 'Fries',
    description: 'French fries tossed in smoky barbecue and chili powder blend.',
    price: 59.00,
    rating: 4,
    image: 'https://tse2.mm.bing.net/th/id/OIP.sjVONW-_Ycym1dtijWaqXwHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },

  {
    id: 10,
    name: 'Classic Chocolate Shake',
    category: 'Drinks',
    description: 'Rich and creamy chocolate milkshake topped with whipped cream and chocolate drizzle.',
    price: 89.00,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 11,
    name: 'Strawberry Bliss Milkshake',
    category: 'Drinks',
    description: 'Blend of real fresh strawberries, vanilla ice cream, and cold milk.',
    price: 89.00,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 12,
    name: 'Iced Lemon Tea',
    category: 'Drinks',
    description: 'Refreshing house-blend iced tea infused with natural lemon flavor.',
    price: 39.00,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=60'
  }
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  
  const [drink, setDrink] = useState('Coke');
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraPatty, setExtraPatty] = useState(false);
  const [qty, setQty] = useState(1);

  // Checkout Modal & Form State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'GCash' | 'Card'>('COD');

  // Selected Card Brand State
  const [selectedCardBrand, setSelectedCardBrand] = useState<string>('VISA');

  // Credit Card Input Fields State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Auto-switch background and text every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const openModal = (item: Item) => {
    setSelectedItem(item);
    setQty(1);
    setDrink('Coke');
    setExtraCheese(false);
    setExtraPatty(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleConfirmOrder = () => {
    if (!selectedItem) return;

    const addOns = [];
    if (extraCheese) addOns.push('Extra Cheese (+₱20)');
    if (extraPatty) addOns.push('Extra Patty (+₱50)');

    const calculatedPrice = selectedItem.price + (extraCheese ? 20 : 0) + (extraPatty ? 50 : 0);

    const newItem: CartItem = {
      id: Date.now(),
      name: selectedItem.name,
      price: calculatedPrice,
      quantity: qty,
      drink: ['Beef', 'Chicken', 'Veggie'].includes(selectedItem.category) ? drink : undefined,
      addOns: addOns.length > 0 ? addOns : undefined,
      image: selectedItem.image
    };

    setCart([...cart, newItem]);
    closeModal();
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleUpdateQty = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleSelectCardBrand = (brand: string) => {
    setPaymentMethod('Card');
    setSelectedCardBrand(brand);
  };

  const handleFinalCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !customerAddress || !customerPhone) {
      alert('Paki-fill up ang lahat ng impormasyon!');
      return;
    }

    if (paymentMethod === 'Card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert('Paki-kumpleto ang iyong card details!');
      return;
    }

    let paymentText = 'Cash on Delivery';
    if (paymentMethod === 'GCash') paymentText = 'GCash';
    if (paymentMethod === 'Card') paymentText = `Credit/Debit Card (${selectedCardBrand})`;

    alert(`Order Confirmed! 🎉\n\nSalamat ${customerName}!\nPayment Method: ${paymentText}\nTotal Amount: ₱${totalPrice.toFixed(2)}\n\nIhahatid na ang iyong order sa:\n${customerAddress}`);
    
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCustomerName('');
    setCustomerAddress('');
    setCustomerPhone('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const cardBrands = [
    { name: 'VISA', border: '#1A1F71', color: '#1A1F71', italic: true },
    { name: 'Mastercard', border: '#EB001B', color: '#EB001B', italic: false },
    { name: 'JCB', border: '#0060A8', color: '#0060A8', italic: false },
    { name: 'AMEX', border: '#0070D1', color: '#0070D1', italic: false },
    { name: 'UnionPay', border: '#D32F2F', color: '#D32F2F', italic: false }
  ];

  return (
    <div className="app-container">
      {/* HEADER / NAVBAR */}
      <header 
        className="navbar"
        style={{
          padding: '8px 24px',
          minHeight: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#181818',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="burger-icon-logo" style={{ fontSize: '26px' }}>🍔</div>
          <div className="logo-text" style={{ textAlign: 'left', lineHeight: '1.1' }}>
            <h2 style={{ fontSize: '18px', margin: 0, color: '#f39c12', fontWeight: 'bold', letterSpacing: '1px' }}>
              THE ROYAL PATTY
            </h2>
            <span style={{ fontSize: '10px', color: '#ccc', letterSpacing: '0.5px' }}>BURGER & DRINKS</span>
          </div>
        </div>

        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={() => setIsAboutOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#fff', letterSpacing: '0.5px' }}
          >
            ABOUT
          </button>
          <a href="#menu" style={{ fontSize: '12px', fontWeight: '600', textDecoration: 'none', color: '#fff', letterSpacing: '0.5px' }}>OUR MENU</a>
          <a href="#menu" style={{ fontSize: '12px', fontWeight: '600', textDecoration: 'none', color: '#fff', letterSpacing: '0.5px' }}>SHOP</a>
          <a href="#contact" style={{ fontSize: '12px', fontWeight: '600', textDecoration: 'none', color: '#fff', letterSpacing: '0.5px' }}>CONTACT</a>
          
          <div 
            className="cart-icon-container" 
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              cursor: 'pointer',
              background: '#333',
              padding: '6px 12px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span className="cart-icon" style={{ fontSize: '16px' }}>🛍️</span>
            {totalCartCount > 0 && (
              <span className="cart-badge" style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#e74c3c',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '50%'
              }}>
                {totalCartCount}
              </span>
            )}
          </div>
        </nav>
      </header>

      {/* HERO SECTION - INAYOS ANG BACKGROUND POSITION AT SHADE PARA LITAW NA LITAW ANG LARAWAN */}
      <section 
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${heroSlides[currentSlideIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%', // Naka-focus sa gitna ng burger
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 0.8s ease-in-out',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '30px 20px'
        }}
      >
        <h1 className="hero-title" style={{ fontSize: '32px', color: '#f39c12', fontWeight: 'bold', margin: '0 0 10px 0', textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
          CRAZY BURGERS, FRIES & SHAKES
        </h1>
        <p 
          className="hero-description" 
          style={{ 
            fontSize: '16px', 
            maxWidth: '600px', 
            lineHeight: '1.4',
            margin: 0,
            color: '#f1f1f1',
            textShadow: '1px 1px 4px rgba(0,0,0,0.9)',
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          {heroSlides[currentSlideIndex].subtitle}
        </p>
      </section>

      {/* ABOUT MODAL */}
      {isAboutOpen && (
        <div className="modal-backdrop" onClick={() => setIsAboutOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%' }}>
            <button className="close-btn" onClick={() => setIsAboutOpen(false)}>✕</button>
            <div className="about-header" style={{ textAlign: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>About The Royal Patty</h2>
              <p className="about-subtitle" style={{ color: '#666', margin: 0 }}>Serving Burgers, Fries & Drinks in Town!</p>
            </div>

            <div className="about-main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div className="about-image-wrapper" style={{ maxWidth: '240px', width: '100%' }}>
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=60" 
                  alt="Our Chef" 
                  className="about-chef-img"
                  style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }}
                />
              </div>
              <div className="about-text-info" style={{ maxWidth: '280px', textAlign: 'left' }}>
                <h3 style={{ color: '#e74c3c', marginTop: 0 }}>Crafted with Passion & Flavor</h3>
                <p style={{ color: '#444', lineHeight: '1.5' }}>
                  Sa The Royal Patty, sinisiguro namin na bawat kagat sa aming burger at fries ay puno ng sarap. Fresh ingredients araw-araw!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OUR MENU / SHOP SECTION */}
      <section id="menu" className="menu-shop-section">
        <div className="section-title">
          <h2>OUR MENU & SHOP</h2>
          <p>Pumili sa aming mga burger, fries, at inumin!</p>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="filter-buttons">
          {['All', 'Beef', 'Chicken', 'Veggie', 'Fries', 'Drinks'].map((cat) => (
            <button 
              key={cat} 
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MENU CARDS GRID */}
        <div className="burger-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="burger-card" onClick={() => openModal(item)}>
              <div className="image-container">
                <img src={item.image} alt={item.name} className="burger-image" />
                <div className="overlay-text">Click to Customize 🛒</div>
              </div>
              <div className="card-body">
                <div className="card-top">
                  <div className="stars">
                    {'★'.repeat(item.rating)}
                    <span className="empty-stars">{'☆'.repeat(5 - item.rating)}</span>
                  </div>
                  <button className="heart-btn" aria-label="Favorite">♡</button>
                </div>
                <h3 className="burger-name">{item.name}</h3>
                <p className="burger-description">{item.description}</p>
                
                <div className="card-footer">
                  <div className="price-tag">₱{item.price.toFixed(2)}</div>
                  <button className="add-cart-btn" onClick={(e) => { e.stopPropagation(); openModal(item); }}>
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIGITAL KIOSK CUSTOMIZATION MODAL */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✕</button>
            
            <div className="modal-body">
              <img src={selectedItem.image} alt={selectedItem.name} className="modal-img" />
              <h2>{selectedItem.name}</h2>
              <p className="modal-desc">{selectedItem.description}</p>

              {['Beef', 'Chicken', 'Veggie'].includes(selectedItem.category) && (
                <>
                  <div className="option-group">
                    <h4>Choose Drink:</h4>
                    <div className="radio-options">
                      <label><input type="radio" name="drink" value="Coke" checked={drink === 'Coke'} onChange={() => setDrink('Coke')} /> Coke</label>
                      <label><input type="radio" name="drink" value="Sprite" checked={drink === 'Sprite'} onChange={() => setDrink('Sprite')} /> Sprite</label>
                      <label><input type="radio" name="drink" value="Iced Tea" checked={drink === 'Iced Tea'} onChange={() => setDrink('Iced Tea')} /> Iced Tea</label>
                    </div>
                  </div>

                  <div className="option-group">
                    <h4>Add-ons:</h4>
                    <div className="checkbox-options">
                      <label>
                        <input type="checkbox" checked={extraCheese} onChange={(e) => setExtraCheese(e.target.checked)} />
                        Extra Cheese (+₱20)
                      </label>
                      <label>
                        <input type="checkbox" checked={extraPatty} onChange={(e) => setExtraPatty(e.target.checked)} />
                        Extra Patty (+₱50)
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="quantity-section">
                <span>Quantity:</span>
                <div className="qty-controls">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>

              <button className="confirm-order-btn" onClick={handleConfirmOrder}>
                Add to Cart - ₱{(
                  (selectedItem.price + (extraCheese ? 20 : 0) + (extraPatty ? 50 : 0)) * qty
                ).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR DRAWER */}
      {isCartOpen && (
        <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Order 🛒</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Walang laman ang iyong Cart.</p>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        {item.drink && <p className="cart-meta">Drink: {item.drink}</p>}
                        {item.addOns && <p className="cart-meta">{item.addOns.join(', ')}</p>}
                        <div className="cart-item-price">₱{(item.price * item.quantity).toFixed(2)}</div>
                        
                        <div className="cart-item-actions">
                          <div className="qty-controls small">
                            <button onClick={() => handleUpdateQty(item.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleUpdateQty(item.id, 1)}>+</button>
                          </div>
                          <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total Amount:</span>
                    <strong>₱{totalPrice.toFixed(2)}</strong>
                  </div>
                  <button 
                    className="checkout-btn" 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL WITH CLICKABLE CARD OPTIONS */}
      {isCheckoutOpen && (
        <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsCheckoutOpen(false)}>✕</button>
            
            <h2>Checkout & Payment 💳</h2>

            {/* ORDER SUMMARY */}
            <div className="checkout-summary">
              <h4>Order Summary</h4>
              <div className="checkout-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item-row">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="checkout-total-row">
                <strong>Total Amount:</strong>
                <strong className="total-price">₱{totalPrice.toFixed(2)}</strong>
              </div>
            </div>

            {/* CUSTOMER & PAYMENT FORM */}
            <form onSubmit={handleFinalCheckout} className="checkout-form">
              <h4>Delivery Information</h4>
              <input 
                type="text" 
                placeholder="Buong Pangalan (Full Name)" 
                value={customerName} 
                onChange={(e) => setCustomerName(e.target.value)} 
                required 
              />
              <input 
                type="tel" 
                placeholder="Phone Number (e.g. 09123456789)" 
                value={customerPhone} 
                onChange={(e) => setCustomerPhone(e.target.value)} 
                required 
              />
              <textarea 
                placeholder="Complete Delivery Address" 
                value={customerAddress} 
                onChange={(e) => setCustomerAddress(e.target.value)} 
                rows={3}
                required 
              />

              <h4>Payment Method</h4>
              <div className="payment-options" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label className={`payment-card ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="COD" 
                    checked={paymentMethod === 'COD'} 
                    onChange={() => setPaymentMethod('COD')} 
                  />
                  💵 Cash on Delivery (COD)
                </label>

                <label className={`payment-card ${paymentMethod === 'GCash' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="GCash" 
                    checked={paymentMethod === 'GCash'} 
                    onChange={() => setPaymentMethod('GCash')} 
                  />
                  💙 GCash
                </label>

                {/* CLICKABLE CARD CONTAINER WITH INDIVIDUAL CLICKABLE LOGOS */}
                <div 
                  className={`card-selector-option ${paymentMethod === 'Card' ? 'selected-card-box' : ''}`}
                  onClick={() => setPaymentMethod('Card')}
                  style={{
                    border: paymentMethod === 'Card' ? '2px solid #e74c3c' : '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    backgroundColor: paymentMethod === 'Card' ? '#fff5f5' : '#fff',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        backgroundColor: '#eee',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '16px'
                      }}>+</span>
                      <span style={{ fontWeight: '500', fontSize: '15px', color: '#222' }}>
                        Add credit/debit card
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPaymentMethod(paymentMethod === 'Card' ? 'COD' : 'Card');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#888',
                        fontSize: '18px',
                        cursor: 'pointer',
                        padding: '4px',
                        transform: paymentMethod === 'Card' ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      ›
                    </button>
                  </div>

                  {/* CLICKABLE INDIVIDUAL CARD BRAND BADGES */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {cardBrands.map((brand) => {
                      const isSelected = paymentMethod === 'Card' && selectedCardBrand === brand.name;
                      return (
                        <span
                          key={brand.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectCardBrand(brand.name);
                          }}
                          style={{
                            fontSize: '10px',
                            fontWeight: 'bold',
                            border: `1px solid ${brand.border}`,
                            color: isSelected ? '#fff' : brand.color,
                            backgroundColor: isSelected ? brand.border : 'transparent',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontStyle: brand.italic ? 'italic' : 'normal',
                            cursor: 'pointer',
                            boxShadow: isSelected ? '0 2px 5px rgba(0,0,0,0.2)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {brand.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* GCASH INFORMATION */}
              {paymentMethod === 'GCash' && (
                <div className="gcash-info" style={{ marginTop: '10px', background: '#eef6ff', padding: '10px', borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontSize: '13px', color: '#0056b3' }}>
                    📲 Send GCash payment to: <strong>0917-123-4567 (The Royal Patty)</strong>
                  </p>
                </div>
              )}

              {/* CARD DETAILS FORM */}
              {paymentMethod === 'Card' && (
                <div className="card-fields" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#fafafa', padding: '12px', borderRadius: '8px', border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#e74c3c', fontWeight: 'bold' }}>
                    Selected Card Type: {selectedCardBrand}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Card Number (16 digits)" 
                    maxLength={16}
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)} 
                    required 
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      maxLength={5}
                      value={cardExpiry} 
                      onChange={(e) => setCardExpiry(e.target.value)} 
                      style={{ flex: 1 }}
                      required 
                    />
                    <input 
                      type="password" 
                      placeholder="CVV" 
                      maxLength={3}
                      value={cardCvv} 
                      onChange={(e) => setCardCvv(e.target.value)} 
                      style={{ flex: 1 }}
                      required 
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="confirm-order-btn final-btn" style={{ marginTop: '15px' }}>
                Place Order (₱{totalPrice.toFixed(2)})
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CONTACT SECTION */}
      <footer id="contact" className="contact-section">
        <h3>Contact Us</h3>
        <p>📍 Main Street, Food City | 📞 (02) 8123-4567 | ✉️ info@theroyalpatty.com</p>
      </footer>
    </div>
  );
}

export default App;