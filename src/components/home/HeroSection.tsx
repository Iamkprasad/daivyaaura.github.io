import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHero } from "@/hooks/useHero";

export default function HeroSection() {
  const { data: hero } = useHero();

  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden bg-cosmic cosmic-particles">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        {hero?.heroBanner && (
            <img src={hero.heroBanner} alt="Daivyaura spiritual products" className="w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-cosmic via-cosmic/90 to-cosmic/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic via-transparent to-cosmic/40" />
      </div>

      {/* Sacred geometry overlays */}
      <div className="absolute inset-0 sacred-geometry" />
      
      {/* Golden glow accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/6 w-64 h-64 rounded-full bg-secondary/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-primary/60" />
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-heading text-sm text-primary font-semibold uppercase tracking-[0.2em]">
                Divine Energy Products
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.15] mb-6">
              {hero?.title || "Divine Energy for"}{" "}
              <span className="text-gradient-gold">{hero?.highlight || "Your Spiritual"}</span>{" "}
              {hero?.subtitle && hero.subtitle.replace(hero.highlight || "", "").trim() ? hero.subtitle.replace(hero.highlight || "", "").trim() : "Journey"}
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/60 font-body mb-10 max-w-lg leading-relaxed">
              {hero?.description || "Discover energized sprays, sacred tilaks, and wellness products crafted to bring prosperity, protection, and peace to your life."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-gradient-gold text-cosmic hover:opacity-90 font-display text-sm tracking-wider shadow-glow px-8 py-6">
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary bg-primary/10 text-primary hover:bg-primary/20 font-heading text-base font-semibold px-8 py-6">
                <a href="tel:+919911573173">
                  <Phone className="mr-2 w-4 h-4" /> Talk to Astrologer
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-primary-foreground/10">
              {[
                { num: "10+", label: "Products" },
                { num: "500+", label: "Happy Customers" },
                { num: "4.8★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-display font-bold text-primary">{stat.num}</p>
                  <p className="text-xs text-primary-foreground/40 font-body">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Decorative */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden md:flex items-center justify-center relative"
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Glowing rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full border border-primary/15 animate-pulse-glow" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-8 rounded-full border border-primary/10 animate-pulse-glow" style={{ animationDelay: '2s' }} />
              
              {/* Center product showcase */}
              <div className="absolute inset-12 rounded-full overflow-hidden shadow-glow">
                {hero?.heroBanner && (
                    <img src={hero.heroBanner} alt="Sacred products" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic/60 to-transparent" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center animate-float">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -bottom-2 -left-6 w-12 h-12 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/20 animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
