import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { cn } from '../lib/utils';
import useStore from '../store/useStore';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your personal brand assistant. Ask me anything about your portfolio data.' }
    ]);
    const [input, setInput] = useState('');
    const { userData } = useStore();
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock AI Response Logic
        setTimeout(() => {
            let response = "I'm not sure about that.";
            const lowerInput = input.toLowerCase();
            const { personalInfo, skills, projects } = userData;

            if (lowerInput.includes('who is') || lowerInput.includes('name')) {
                response = `${personalInfo.name} is a ${personalInfo.tagline || 'professional'}.`;
            } else if (lowerInput.includes('skill') || lowerInput.includes('stack')) {
                response = `They are skilled in: ${skills.join(', ') || 'various technologies'}.`;
            } else if (lowerInput.includes('project') || lowerInput.includes('work')) {
                if (projects.length > 0) {
                    response = `They have worked on projects like ${projects.map(p => p.name).join(', ')}.`;
                } else {
                    response = "They haven't added any projects yet.";
                }
            } else if (lowerInput.includes('bio') || lowerInput.includes('about')) {
                response = personalInfo.about || "No bio available yet.";
            } else if (lowerInput.includes('summary')) {
                response = `${personalInfo.name} is a ${personalInfo.tagline} based in ${personalInfo.location}. Key skills: ${skills.slice(0, 3).join(', ')}.`;
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        }, 600);
    };

    return (
        <>
            {/* Floating Button */}
            <Button
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <MessageSquare />}
            </Button>

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] z-50 flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 fade-in">
                    <CardHeader className="bg-primary text-primary-foreground py-4 rounded-t-lg">
                        <CardTitle className="flex items-center text-lg">
                            <Bot className="mr-2 h-5 w-5" /> AI Assistant
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex w-max max-w-[80%] rounded-lg px-3 py-2 text-sm",
                                    msg.role === 'user'
                                        ? "ml-auto bg-primary text-primary-foreground"
                                        : "bg-muted text-foreground"
                                )}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </CardContent>
                    <div className="p-4 border-t bg-background rounded-b-lg flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about the portfolio..."
                        />
                        <Button size="icon" onClick={handleSend}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            )}
        </>
    );
};

export default AIAssistant;
