import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import useStore from '../../store/useStore';

const Hero = ({ data = {}, theme }) => {
    const { name = 'Your Name', tagline = 'Building digital experiences.', socials = {} } = data || {};
    const { userData } = useStore();
    const currentTheme = theme || userData.theme || 'modern';

    // Theme-specific styles
    const isModern = currentTheme === 'modern';
    const isBold = currentTheme === 'bold';
    const isElegant = currentTheme === 'elegant';

    return (
        <section className={cn(
            "relative min-h-screen flex items-center justify-center overflow-hidden px-6",
            isModern && "mesh-modern",
            isBold && "mesh-bold",
            isElegant && "mesh-elegant"
        )}>

            {/* Background Elements */}
            {isBold && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            )}

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className={cn(
                    "flex flex-col gap-8",
                    isModern && "items-center text-center",
                    isBold && "items-start text-left max-w-4xl",
                    isElegant && "items-center text-center"
                )}>

                    {/* Badge / Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm",
                            isModern && "bg-white/50 border-slate-200 text-slate-600 shadow-sm",
                            isBold && "bg-white/5 border-white/10 text-emerald-400",
                            isElegant && "bg-[#fafaf9] border-[#e7e5e4] text-[#57534e]"
                        )}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isBold ? "bg-emerald-400" : "bg-green-400")}></span>
                            <span className={cn("relative inline-flex rounded-full h-2 w-2", isBold ? "bg-emerald-500" : "bg-green-500")}></span>
                        </span>
                        Available for work
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={cn(
                            "font-bold tracking-tight",
                            isModern && "text-6xl md:text-8xl text-[hsl(var(--text-primary))]",
                            isBold && "text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter",
                            isElegant && "text-6xl md:text-8xl font-serif text-[hsl(var(--text-primary))] italic"
                        )}
                    >
                        {name}
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={cn(
                            "text-xl md:text-2xl leading-relaxed max-w-2xl",
                            isModern && "text-[hsl(var(--text-secondary))]",
                            isBold && "text-[hsl(var(--text-muted))]",
                            isElegant && "text-[hsl(var(--text-secondary))] font-light"
                        )}
                    >
                        {tagline}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <Button
                            size="lg"
                            className={cn(
                                "h-14 px-8 text-lg transition-all hover:scale-105",
                                isModern && "rounded-xl bg-[hsl(var(--accent-primary))] hover:bg-[hsl(var(--accent-primary))]/90 text-white shadow-lg shadow-indigo-500/20",
                                isBold && "rounded-none bg-white text-black hover:bg-gray-200",
                                isElegant && "rounded-full bg-[hsl(var(--text-primary))] text-[hsl(var(--bg-base))]"
                            )}
                        >
                            View Projects <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className={cn(
                                "h-14 px-8 text-lg bg-transparent",
                                isModern && "rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700",
                                isBold && "rounded-none border-white/20 text-white hover:bg-white/10",
                                isElegant && "rounded-full border-[hsl(var(--text-primary))] text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--text-primary))]/5"
                            )}
                        >
                            Contact Me
                        </Button>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-6 pt-8"
                    >
                        {Object.entries(socials).map(([key, url], i) => {
                            if (!url) return null;
                            const Icon = { github: Github, linkedin: Linkedin, twitter: Twitter, email: Mail }[key] || Github;
                            return (
                                <a
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cn(
                                        "transition-colors",
                                        isModern && "text-slate-400 hover:text-[hsl(var(--accent-primary))]",
                                        isBold && "text-white/40 hover:text-white",
                                        isElegant && "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))]"
                                    )}
                                >
                                    <Icon className="h-6 w-6" />
                                </a>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
