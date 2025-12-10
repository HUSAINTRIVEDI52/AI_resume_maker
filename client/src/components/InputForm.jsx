import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Plus, Trash2, ArrowRight, ArrowLeft, Check, Loader2, User, Code, Briefcase, Palette, Rocket } from 'lucide-react';
import useStore from '../store/useStore';
import { api } from '../lib/api';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/Card';
import { cn } from '../lib/utils';

const steps = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'theme', label: 'Branding', icon: Palette },
];

const InputForm = () => {
    const navigate = useNavigate();
    const {
        userData,
        updatePersonalInfo,
        addSkill,
        removeSkill,
        addProject,
        setTheme,
        setGeneratedLogo,
        setGeneratedPortfolio,
        generatedLogo
    } = useStore();

    const [currentStep, setCurrentStep] = useState(0);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [newProject, setNewProject] = useState({ name: '', desc: '', tech: '', link: '' });

    const handleEnhance = async (field, type) => {
        setIsEnhancing(true);
        const text = userData.personalInfo[field];
        const res = await api.enhanceText(text, type);
        updatePersonalInfo({ [field]: res.enhancedText });
        setIsEnhancing(false);
    };

    const handleGenerateLogo = async () => {
        setIsGeneratingLogo(true);
        const res = await api.generateLogo(userData.personalInfo.name, userData.theme, userData.color);
        if (res && res.svg) {
            setGeneratedLogo(res.svg);
        }
        setIsGeneratingLogo(false);
    };

    const handleGeneratePortfolio = async () => {
        const portfolio = await api.generatePortfolio({
            personalInfo: userData.personalInfo,
            skills: userData.skills,
            projects: userData.projects,
            socials: userData.socials,
            theme: userData.theme,
            logo: generatedLogo
        });
        setGeneratedPortfolio(portfolio);
        navigate('/preview');
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Progress Stepper */}
            <div className="relative flex justify-between items-center mb-12">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -z-10 rounded-full" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                    isActive ? "border-primary bg-primary text-primary-foreground scale-110" :
                                        isCompleted ? "border-primary bg-primary text-primary-foreground" :
                                            "border-muted-foreground/30 bg-background text-muted-foreground"
                                )}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                            </div>
                            <span className={cn(
                                "text-xs font-medium transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">{steps[currentStep].label}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 min-h-[400px]">

                            {/* Step 1: Personal Info */}
                            {currentStep === 0 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input
                                                value={userData.personalInfo.name}
                                                onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                                                placeholder="e.g. Jane Doe"
                                                className="h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Tagline</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={userData.personalInfo.tagline}
                                                    onChange={(e) => updatePersonalInfo({ tagline: e.target.value })}
                                                    placeholder="e.g. Full Stack Developer"
                                                    className="h-12"
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-12 w-12 shrink-0"
                                                    onClick={() => handleEnhance('tagline', 'tagline')}
                                                    disabled={isEnhancing || !userData.personalInfo.tagline}
                                                    title="Enhance with AI"
                                                >
                                                    {isEnhancing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>About Me</Label>
                                        <div className="relative">
                                            <Textarea
                                                value={userData.personalInfo.about}
                                                onChange={(e) => updatePersonalInfo({ about: e.target.value })}
                                                placeholder="Write a short bio..."
                                                className="min-h-[150px] resize-none p-4"
                                            />
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="absolute bottom-2 right-2 text-xs"
                                                onClick={() => handleEnhance('about', 'about')}
                                                disabled={isEnhancing || !userData.personalInfo.about}
                                            >
                                                {isEnhancing ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Wand2 className="h-3 w-3 mr-1" />}
                                                AI Enhance
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <Input
                                                value={userData.personalInfo.email}
                                                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                                                placeholder="jane@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Location</Label>
                                            <Input
                                                value={userData.personalInfo.location}
                                                onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                                                placeholder="San Francisco, CA"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Skills */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="flex gap-2">
                                        <Input
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            placeholder="Add a skill (e.g. React, Python, Design)"
                                            className="h-12"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && newSkill) {
                                                    addSkill(newSkill);
                                                    setNewSkill('');
                                                }
                                            }}
                                        />
                                        <Button
                                            onClick={() => {
                                                if (newSkill) {
                                                    addSkill(newSkill);
                                                    setNewSkill('');
                                                }
                                            }}
                                            className="h-12 px-6"
                                        >
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <div className="flex flex-wrap gap-3 p-4 bg-secondary/20 rounded-lg min-h-[200px] content-start">
                                        {userData.skills.map((skill, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="flex items-center bg-background border px-4 py-2 rounded-full shadow-sm"
                                            >
                                                <span className="mr-2">{skill}</span>
                                                <button onClick={() => removeSkill(index)} className="text-muted-foreground hover:text-destructive transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </motion.div>
                                        ))}
                                        {userData.skills.length === 0 && (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground opacity-50">
                                                No skills added yet. Start typing above!
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Projects */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="bg-secondary/10 p-6 rounded-lg border space-y-4">
                                        <h4 className="font-medium flex items-center gap-2">
                                            <Plus className="h-4 w-4" /> Add New Project
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                placeholder="Project Name"
                                                value={newProject.name}
                                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                            />
                                            <Input
                                                placeholder="Tech Stack (e.g. React, Node)"
                                                value={newProject.tech}
                                                onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                                            />
                                        </div>
                                        <Textarea
                                            placeholder="Short description of what you built..."
                                            value={newProject.desc}
                                            onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })}
                                        />
                                        <Button
                                            onClick={() => {
                                                if (newProject.name) {
                                                    addProject(newProject);
                                                    setNewProject({ name: '', desc: '', tech: '', link: '' });
                                                }
                                            }}
                                            className="w-full"
                                        >
                                            Add Project
                                        </Button>
                                    </div>

                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                        {userData.projects.map((project, index) => (
                                            <div key={index} className="flex justify-between items-start p-4 bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <div>
                                                    <h4 className="font-bold text-lg">{project.name}</h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{project.desc}</p>
                                                    <div className="flex gap-2 mt-2">
                                                        {project.tech.split(',').map((t, i) => (
                                                            <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-md">{t.trim()}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {userData.projects.length === 0 && (
                                            <p className="text-center text-muted-foreground py-8">No projects added yet.</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Branding */}
                            {currentStep === 3 && (
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <Label className="text-lg">Choose Your Theme</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                { id: 'elegant', name: 'Elegant', desc: 'Luxury, Serif & Minimal', color: 'bg-[#fdfbf7] border border-stone-200' },
                                                { id: 'modern', name: 'Modern', desc: 'SaaS, Gradient & Glass', color: 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100' },
                                                { id: 'bold', name: 'Bold', desc: 'Cyberpunk & Neon', color: 'bg-slate-950 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]' },
                                            ].map((theme) => (
                                                <div
                                                    key={theme.id}
                                                    className={cn(
                                                        "cursor-pointer border-2 rounded-xl p-4 transition-all hover:scale-105 relative overflow-hidden group",
                                                        userData.theme === theme.id ? "border-primary ring-2 ring-primary/20" : "border-border"
                                                    )}
                                                    onClick={() => setTheme(theme.id)}
                                                >
                                                    <div className={cn("h-24 rounded-lg mb-3 shadow-sm", theme.color)} />
                                                    <h4 className="font-bold">{theme.name}</h4>
                                                    <p className="text-xs text-muted-foreground">{theme.desc}</p>
                                                    {userData.theme === theme.id && (
                                                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                                            <Check className="h-3 w-3" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="text-lg">AI Logo Generator</Label>
                                        <div className="flex items-center gap-6 p-6 bg-secondary/10 rounded-xl border">
                                            <div className="h-32 w-32 border-2 border-dashed rounded-xl flex items-center justify-center bg-background overflow-hidden relative">
                                                {generatedLogo ? (
                                                    <div dangerouslySetInnerHTML={{ __html: generatedLogo }} className="w-full h-full p-2" />
                                                ) : (
                                                    <span className="text-xs text-muted-foreground text-center px-2">Logo Preview</span>
                                                )}
                                                {isGeneratingLogo && (
                                                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <p className="text-sm text-muted-foreground">
                                                    Generate a unique SVG logo based on your name and selected theme.
                                                </p>
                                                <Button onClick={handleGenerateLogo} disabled={isGeneratingLogo || !userData.personalInfo.name}>
                                                    <Wand2 className="h-4 w-4 mr-2" />
                                                    Generate Logo
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-6">
                            <Button
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" /> Back
                            </Button>

                            {currentStep === steps.length - 1 ? (
                                <Button onClick={handleGeneratePortfolio} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                                    Generate Portfolio <Rocket className="h-4 w-4" />
                                </Button>
                            ) : (
                                <Button onClick={nextStep} className="gap-2">
                                    Next Step <ArrowRight className="h-4 w-4" />
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default InputForm;
