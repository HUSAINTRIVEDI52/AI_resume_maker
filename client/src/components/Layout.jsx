import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Eye, Settings, Sparkles, Menu } from 'lucide-react';
import { Button } from './ui/Button';
import AIAssistant from './AIAssistant';
import { cn } from '../lib/utils';

const LayoutComponent = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Builder', path: '/' },
        { icon: Eye, label: 'Preview', path: '/preview' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans text-slate-900 dark:text-slate-50">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-white dark:bg-slate-900 fixed inset-y-0 z-50">
                <div className="h-16 flex items-center px-6 border-b">
                    <Sparkles className="h-6 w-6 text-primary mr-2" />
                    <span className="font-bold text-lg tracking-tight">BrandBuilder.ai</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-3",
                                        isActive ? "bg-slate-100 dark:bg-slate-800 text-primary font-medium" : "text-slate-500 dark:text-slate-400"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-sm font-medium">Theme</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => document.documentElement.classList.toggle('dark')}
                        >
                            <span className="sr-only">Toggle theme</span>
                            <div className="h-4 w-4 rounded-full bg-slate-900 dark:bg-slate-100" />
                        </Button>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                        <h4 className="text-sm font-medium mb-1">Pro Tip</h4>
                        <p className="text-xs text-muted-foreground">
                            Use the AI Assistant to enhance your bio and tagline instantly.
                        </p>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b bg-white dark:bg-slate-900 z-50 flex items-center justify-between px-4">
                <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-primary mr-2" />
                    <span className="font-bold">BrandBuilder</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-300",
                "md:ml-64", // Offset for sidebar
                "pt-16 md:pt-0" // Offset for mobile header
            )}>
                <div className="max-w-5xl mx-auto px-6 py-10">
                    {children}
                </div>
            </main>

            {/* AI Assistant (Floating) */}
            <AIAssistant />
        </div>
    );
};

export default LayoutComponent;
