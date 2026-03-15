import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const shipping = totalPrice >= 999 ? 0 : 50;

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
        <Button asChild className="bg-primary text-primary-foreground font-heading">
          <Link to="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <h1 className="text-3xl font-display font-bold mb-8">Shopping <span className="text-gradient-gold">Cart</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-4 p-4 bg-card rounded-lg border"
              >
                <Link to={`/product/${item.product.slug}`} className="shrink-0">
                  <img src={`${import.meta.env.BASE_URL}${item.product.image.startsWith('/') ? item.product.image.slice(1) : item.product.image}`} alt={item.product.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.slug}`} className="font-heading font-semibold hover:text-primary transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.product.sku}</p>
                  <p className="font-heading font-bold mt-1">₹{item.product.salePrice}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-md">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-muted">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-muted">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-destructive hover:text-destructive/80 p-1.5">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl border p-6 h-fit sticky top-24">
            <h2 className="font-heading font-semibold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? <span className="text-success">Free</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">Add ₹{999 - totalPrice} more for free shipping</p>
              )}
              <div className="border-t pt-3 flex justify-between">
                <span className="font-heading font-bold text-lg">Total</span>
                <span className="font-heading font-bold text-lg">₹{totalPrice + shipping}</span>
              </div>
            </div>
            <Button asChild size="lg" className="w-full mt-6 bg-primary text-primary-foreground font-heading shadow-gold">
              <Link to="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full mt-2 font-heading text-muted-foreground">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
