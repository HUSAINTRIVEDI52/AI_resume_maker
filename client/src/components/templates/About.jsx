import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import useStore from '../../store/useStore';

const About = ({ data = {}, theme }) => {
    const { about = 'Write something about yourself...' } = data || {};
    const { userData } = useStore();
    const currentTheme = theme || userData.theme || 'modern';

    const isModern = currentTheme === 'modern';
    const isBold = currentTheme === 'bold';
    const isElegant = currentTheme === 'elegant';

    return (
        <section className={cn(
            "py-32 px-6",
            isModern && "bg-[hsl(var(--bg-surface-2))]",
            isBold && "bg-[hsl(var(--bg-surface))]",
            isElegant && "bg-[#f5f5f4]"
        )}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                        "text-center space-y-8",
                        isBold && "text-left"
                    )}
                >
                    <h2 className={cn(
                        "text-sm font-bold uppercase tracking-widest",
                        isModern && "text-[hsl(var(--accent-primary))]",
                        isBold && "text-[hsl(var(--accent-primary))]",
                        isElegant && "text-[hsl(var(--text-muted))]"
                    )}>
                        About Me
                    </h2>

                    <p className={cn(
                        "text-2xl md:text-4xl leading-relaxed",
                        isModern && "font-medium text-[hsl(var(--text-primary))]",
                        isBold && "font-light text-gray-300",
                        isElegant && "font-serif italic text-[hsl(var(--text-primary))]"
                    )}>
                        "{about}"
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
