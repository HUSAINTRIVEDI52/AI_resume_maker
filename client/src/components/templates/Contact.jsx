import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import useStore from '../../store/useStore';

const Contact = ({ data = {}, theme }) => {
    const { personalInfo = {} } = data || {};
    const { email = 'email@example.com', location = 'Remote' } = personalInfo;
    const { userData } = useStore();
    const currentTheme = theme || userData.theme || 'modern';

    const isModern = currentTheme === 'modern';
    const isBold = currentTheme === 'bold';
    const isElegant = currentTheme === 'elegant';

    return (
        <section className="py-32 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className={cn(
                        "text-5xl font-bold",
                        isElegant && "font-serif italic"
                    )}>
                        Let's Work Together
                    </h2>
                    <p className="text-xl text-[hsl(var(--text-secondary))] max-w-md">
                        Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
                    </p>

                    <div className="space-y-4 pt-8">
                        <div className="flex items-center gap-4 text-lg">
                            <div className={cn(
                                "p-3 rounded-full",
                                isModern && "bg-indigo-50 text-indigo-600",
                                isBold && "bg-white/10 text-white",
                                isElegant && "bg-[#f5f5f4] text-[#44403c]"
                            )}>
                                <Mail className="h-5 w-5" />
                            </div>
                            {email}
                        </div>
                        <div className="flex items-center gap-4 text-lg">
                            <div className={cn(
                                "p-3 rounded-full",
                                isModern && "bg-indigo-50 text-indigo-600",
                                isBold && "bg-white/10 text-white",
                                isElegant && "bg-[#f5f5f4] text-[#44403c]"
                            )}>
                                <MapPin className="h-5 w-5" />
                            </div>
                            {location}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                        "p-8 rounded-2xl",
                        isModern && "bg-white border border-slate-200 shadow-lg",
                        isBold && "bg-white/5 border border-white/10",
                        isElegant && "bg-[#f5f5f4]"
                    )}
                >
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium opacity-70">Name</label>
                            <Input
                                placeholder="John Doe"
                                className={cn(
                                    "h-12",
                                    isModern && "bg-slate-50 border-slate-200 focus:ring-indigo-500",
                                    isBold && "bg-black/20 border-white/10 focus:border-purple-500 text-white",
                                    isElegant && "bg-white border-transparent shadow-sm"
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium opacity-70">Email</label>
                            <Input
                                placeholder="john@example.com"
                                type="email"
                                className={cn(
                                    "h-12",
                                    isModern && "bg-slate-50 border-slate-200 focus:ring-indigo-500",
                                    isBold && "bg-black/20 border-white/10 focus:border-purple-500 text-white",
                                    isElegant && "bg-white border-transparent shadow-sm"
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium opacity-70">Message</label>
                            <Textarea
                                placeholder="Tell me about your project..."
                                className={cn(
                                    "min-h-[150px] resize-none",
                                    isModern && "bg-slate-50 border-slate-200 focus:ring-indigo-500",
                                    isBold && "bg-black/20 border-white/10 focus:border-purple-500 text-white",
                                    isElegant && "bg-white border-transparent shadow-sm"
                                )}
                            />
                        </div>
                        <Button
                            className={cn(
                                "w-full h-12 text-lg",
                                isModern && "bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl",
                                isBold && "bg-white text-black hover:bg-gray-200 rounded-none",
                                isElegant && "bg-[#1c1917] text-white rounded-full"
                            )}
                        >
                            Send Message <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;
