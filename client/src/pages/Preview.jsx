import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Monitor, Smartphone, Rocket, Loader2, RefreshCw } from 'lucide-react';
import useStore from '../store/useStore';
import { Button } from '../components/ui/Button';
import Hero from '../components/templates/Hero';
import About from '../components/templates/About';
import Projects from '../components/templates/Projects';
import Skills from '../components/templates/Skills';
import Contact from '../components/templates/Contact';
import ErrorBoundary from '../components/ErrorBoundary';
import { cn } from '../lib/utils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const SAMPLE_PORTFOLIO = {
    meta: { theme: 'modern' },
    content: {
        personalInfo: {
            name: 'Alex Creator',
            tagline: 'Building digital experiences that matter.',
            about: 'I am a passionate creator focused on crafting world-class user experiences. With a deep love for design and engineering, I build products that solve real problems and delight users.',
            email: 'alex@example.com',
            location: 'San Francisco, CA',
            socials: { twitter: '#', github: '#', linkedin: '#' }
        },
        skills: ['React', 'Node.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Next.js'],
        projects: [
            { name: 'Project Alpha', desc: 'A revolutionary AI platform for creators.', tech: 'React, AI, Python', link: '#' },
            { name: 'Beta App', desc: 'Social media dashboard for analytics.', tech: 'Vue, Firebase', link: '#' },
            { name: 'Gamma Tools', desc: 'Developer productivity suite.', tech: 'Rust, Tauri', link: '#' },
            { name: 'Delta Design', desc: 'Design system for enterprise apps.', tech: 'Figma, CSS', link: '#' }
        ]
    },
    config: { templates: {} }
};

const Preview = () => {
    const navigate = useNavigate();
    const { generatedPortfolio } = useStore();
    const [viewMode, setViewMode] = useState('desktop');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            if (generatedPortfolio) {
                setData(generatedPortfolio);
            } else {
                // Fallback to sample data for testing/preview if no data exists
                console.warn("No generated portfolio found. Using sample data.");
                setData(SAMPLE_PORTFOLIO);
            }
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [generatedPortfolio]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Assembling your portfolio...</p>
                </div>
            </div>
        );
    }

    // Safe destructuring with defaults from data (which is either generated or sample)
    const {
        content = { personalInfo: {}, skills: [], projects: [], socials: {} },
        config = { templates: {} },
        meta = { theme: 'modern' }
    } = data || SAMPLE_PORTFOLIO;

    // Ensure theme is valid
    const validThemes = ['modern', 'bold', 'elegant'];
    const themeName = validThemes.includes(meta.theme) ? meta.theme : 'modern';
    const themeClass = `theme-${themeName}`;

    const handleDownload = async () => {
        const zip = new JSZip();
        const safeName = content.personalInfo?.name ? content.personalInfo.name.replace(/\s+/g, '-').toLowerCase() : 'portfolio';

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.personalInfo?.name || 'Portfolio'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      :root {
        --primary: ${themeName === 'bold' ? '#22c55e' : themeName === 'modern' ? '#3b82f6' : '#292524'};
      }
      body {
        font-family: system-ui, -apple-system, sans-serif;
        background-color: ${themeName === 'bold' ? '#0f172a' : themeName === 'elegant' ? '#fafaf9' : '#f8fafc'};
        color: ${themeName === 'bold' ? '#f8fafc' : '#0f172a'};
      }
    </style>
</head>
<body>
    <div id="root">
        <!-- Content would be statically generated here in a real export -->
        <div style="text-align: center; padding: 50px;">
            <h1>${content.personalInfo?.name || 'My Portfolio'}</h1>
            <p>${content.personalInfo?.tagline || ''}</p>
            <p>Download the source code to run the full React application.</p>
        </div>
    </div>
</body>
</html>
    `;

        zip.file("index.html", htmlContent);
        zip.file("portfolio.json", JSON.stringify(data, null, 2));

        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, `${safeName}.zip`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
            {/* Toolbar */}
            <div className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-6 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Editor</span>
                    </Button>
                    <div className="h-6 w-px bg-border hidden sm:block" />
                    <span className="font-medium capitalize hidden sm:inline">{themeName} Theme</span>
                </div>

                <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-md">
                    <Button
                        variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode('desktop')}
                        title="Desktop View"
                    >
                        <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode('mobile')}
                        title="Mobile View"
                    >
                        <Smartphone className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Button onClick={handleDownload} size="sm" className="hidden sm:flex">
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open('https://vercel.com/new', '_blank')}>
                        <Rocket className="mr-2 h-4 w-4" /> Deploy
                    </Button>
                </div>
            </div>

            {/* Preview Area */}
            <div className={cn(
                "flex-1 overflow-auto flex justify-center bg-slate-200/50 dark:bg-slate-900/50",
                viewMode === 'mobile' ? "p-8 items-center" : "p-0"
            )}>
                <div
                    className={cn(
                        "bg-background shadow-2xl transition-all duration-300 overflow-hidden origin-top",
                        viewMode === 'mobile' ? "w-[375px] h-[812px] rounded-[3rem] border-8 border-slate-800" : "w-full min-h-full",
                        themeClass
                    )}
                >
                    <div className={cn(
                        "min-h-full w-full",
                        themeName === 'bold' ? 'dark bg-background text-foreground' : '',
                        themeName === 'modern' ? 'bg-background text-foreground' : '',
                        themeName === 'elegant' ? 'bg-background text-foreground' : ''
                    )}>
                        <ErrorBoundary>
                            <Hero data={content.personalInfo} variant={config.templates?.hero} theme={themeName} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <About data={content.personalInfo} variant={config.templates?.about} theme={themeName} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Skills data={content} variant={config.templates?.skills} theme={themeName} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Projects data={content} variant={config.templates?.projects} theme={themeName} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Contact data={content} variant={config.templates?.contact} theme={themeName} />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
