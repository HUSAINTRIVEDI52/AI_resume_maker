import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Folder } from 'lucide-react';
import { cn } from '../../lib/utils';
import useStore from '../../store/useStore';

const ProjectCard = ({ project, index, theme }) => {
    const isModern = theme === 'modern';
    const isBold = theme === 'bold';
    const isElegant = theme === 'elegant';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "group relative flex flex-col overflow-hidden transition-all duration-300",
                isModern && "bg-[hsl(var(--bg-surface))] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] border border-[hsl(var(--border-subtle))]",
                isBold && "bg-[hsl(var(--bg-surface))] border border-[hsl(var(--border-subtle))] hover:border-[hsl(var(--accent-primary))] hover:shadow-[0_0_30px_-10px_hsl(var(--accent-primary)/0.3)]",
                isElegant && "bg-transparent border-b border-[hsl(var(--border-subtle))] hover:bg-[hsl(var(--bg-surface-2))] pb-8 pt-4 px-4"
            )}
        >
            <div className="flex justify-between items-start mb-6">
                <div className={cn(
                    "p-3 rounded-lg",
                    isModern && "bg-[hsl(var(--bg-surface-2))] text-[hsl(var(--text-primary))]",
                    isBold && "bg-white/5 text-white",
                    isElegant && "bg-transparent p-0 text-[hsl(var(--accent-primary))]"
                )}>
                    <Folder className="h-6 w-6" />
                </div>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        isModern && "text-[hsl(var(--accent-primary))]",
                        isBold && "text-white",
                        isElegant && "text-[hsl(var(--text-primary))]"
                    )}
                >
                    <ArrowUpRight className="h-6 w-6" />
                </a>
            </div>

            <h3 className={cn(
                "text-2xl font-bold mb-3",
                isModern && "text-[hsl(var(--text-primary))]",
                isBold && "text-white",
                isElegant && "font-serif text-[hsl(var(--text-primary))]"
            )}>
                {project.name}
            </h3>

            <p className={cn(
                "text-base leading-relaxed mb-6 flex-1",
                isModern && "text-[hsl(var(--text-secondary))]",
                isBold && "text-[hsl(var(--text-muted))]",
                isElegant && "text-[hsl(var(--text-secondary))]"
            )}>
                {project.desc}
            </p>

            <div className="flex flex-wrap gap-2">
                {project.tech && project.tech.split(',').map((t, i) => (
                    <span
                        key={i}
                        className={cn(
                            "text-xs font-medium px-2.5 py-1",
                            isModern && "bg-[hsl(var(--bg-surface-2))] text-[hsl(var(--text-secondary))] rounded-md",
                            isBold && "bg-white/5 text-[hsl(var(--text-muted))] border border-white/5",
                            isElegant && "text-[hsl(var(--text-muted))] italic px-0 mr-2"
                        )}
                    >
                        {t.trim()}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const Projects = ({ data = {}, theme }) => {
    const { projects = [] } = data || {};
    const { userData } = useStore();
    const currentTheme = theme || userData.theme || 'modern';

    if (!projects || projects.length === 0) return null;

    return (
        <section className={cn(
            "py-32 px-6",
            currentTheme === 'modern' && "bg-[hsl(var(--bg-base))]",
            currentTheme === 'bold' && "bg-[hsl(var(--bg-base))]",
            currentTheme === 'elegant' && "bg-[hsl(var(--bg-base))]"
        )}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className={cn(
                        "text-4xl md:text-5xl font-bold mb-4",
                        currentTheme === 'elegant' && "font-serif italic"
                    )}>
                        Selected Work
                    </h2>
                    <div className="h-1 w-20 bg-[hsl(var(--accent-primary))]" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} theme={currentTheme} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
