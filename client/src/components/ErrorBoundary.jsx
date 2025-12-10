import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from './ui/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-destructive/5 border border-destructive/20 rounded-xl">
                    <div className="p-4 rounded-full bg-destructive/10 mb-4">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <h2 className="text-xl font-bold text-destructive mb-2">Something went wrong</h2>
                    <p className="text-muted-foreground max-w-md mb-6">
                        We encountered an error while rendering this section.
                        {this.state.error && <span className="block mt-2 font-mono text-xs bg-black/5 p-2 rounded">{this.state.error.toString()}</span>}
                    </p>
                    <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="gap-2"
                    >
                        <RefreshCcw className="h-4 w-4" /> Reload Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
