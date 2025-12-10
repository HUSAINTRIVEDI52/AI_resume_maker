import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import useStore from '../../store/useStore';

const Skills = ({ data = {}, theme }) => {
    const { skills = [] } = data || {};
    const { userData } = useStore();
    const currentTheme = theme || userData.theme || 'modern';

    if (!skills || skills.length === 0) return null;

    const isModern = currentTheme === 'modern';
    const isBold = currentTheme === 'bold';
    const isElegant = currentTheme === 'elegant';

    return (
        <section className="py-32 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                        "text-3xl md:text-4xl font-bold mb-16",
                        isElegant && "font-serif italic"
                    )}
                >
                    Expertise
                </motion.h2>

                <div className="flex flex-wrap justify-center gap-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "px-6 py-3 text-lg font-medium transition-all hover:-translate-y-1",
                                isModern && "bg-white border border-slate-200 rounded-full text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600",
                                isBold && "bg-white/5 border border-white/10 rounded-none text-gray-300 hover:border-purple-500 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]",
                                isElegant && "bg-[#f5f5f4] text-[#44403c] rounded-md hover:bg-[#e7e5e4]"
                            )}
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
