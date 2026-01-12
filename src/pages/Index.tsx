import React from "react";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, Palette, Component, Moon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--brand-primary)/0.15),transparent_50%)]" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Badge */}
            <Badge variant="brand-subtle" size="pill-lg" className="animate-fade-in">
              <Zap className="w-3.5 h-3.5" />
              DePIN Design System v1.0
            </Badge>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight animate-slide-up">
              Build{" "}
              <span className="text-brand-primary">Beautiful</span>
              <br />
              DePIN Apps
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground max-w-xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              A modern, friendly design system for consumer-facing decentralized infrastructure apps. 
              Production-ready tokens, components, and patterns.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="brand" size="xl" asChild>
                <Link to="/design-system">
                  Explore Components
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/design-system">
                  View Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="interactive">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-brand-primary-subtle flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Design Tokens</h3>
              <p className="text-sm text-muted-foreground">
                Semantic color system with HSL variables for easy theming and dark mode support.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-success-subtle flex items-center justify-center mb-4">
                <Component className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Components</h3>
              <p className="text-sm text-muted-foreground">
                Buttons, badges, cards, inputs, progress bars, and more with multiple variants.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-info-subtle flex items-center justify-center mb-4">
                <Moon className="w-6 h-6 text-info" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">
                Carefully crafted light and dark themes with proper contrast ratios.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-warning-subtle flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Interactive documentation with live examples and usage guidelines.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Color Preview */}
      <section className="container pb-16 md:pb-24">
        <div className="text-center mb-8">
          <Badge variant="secondary" size="pill" className="mb-4">Color Palette</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Energetic Yellow. Zero Purple.
          </h2>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-primary shadow-md" title="Brand Primary" />
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent shadow-md" title="Accent Teal" />
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-success shadow-md" title="Success Green" />
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-warning shadow-md" title="Warning Orange" />
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-danger shadow-md" title="Danger Red" />
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-info shadow-md" title="Info Blue" />
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-foreground shadow-md" title="Foreground" />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border">
        <div className="container py-12 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to build something amazing?
          </p>
          <Button variant="brand" size="lg" asChild>
            <Link to="/design-system">
              Open Design System <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
