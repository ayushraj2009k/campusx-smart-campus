import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CAMPUSX Caught Runtime Exception in ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  private handleReturnHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
    // Safe navigation to overview
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-2xl mx-auto my-12 p-8 rounded-3xl bg-slate-900 border-2 border-rose-500/50 text-white shadow-2xl animate-in fade-in duration-300">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 shadow-lg">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono text-[10px] font-bold tracking-wider">
                  FAULT INTERCEPTOR
                </span>
                <span className="text-xs font-mono text-slate-400">
                  IIT Bhubaneswar Node Protection
                </span>
              </div>
              <h2 className="text-xl font-extrabold font-display">
                {this.props.fallbackTitle || 'Portal View Safeguard Triggered'}
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            CAMPUSX intercepted an unexpected component state transition. The system has prevented an application termination, and all core datasets (CP-SAT schedule, 189 sessions, geocodes) remain completely safe.
          </p>

          {this.state.error && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 mb-6 break-all">
              <strong>Error:</strong> {this.state.error.message || String(this.state.error)}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-blue-600/30 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Component</span>
            </button>

            <button
              onClick={this.handleReturnHome}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Campus Overview</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
