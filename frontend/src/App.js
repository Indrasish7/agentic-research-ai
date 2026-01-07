import './App.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Zap,
  GitBranch,
  Code2,
  Search,
  FileText,
  Play,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Brain,
  Network,
  Database,
  Shield,
  Clock,
  Activity
} from 'lucide-react';

const BACKEND_URL = '';

// Matrix Rain Background Component
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.5 + 0.1})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain-container" />;
};

// Navigation Component
const Navigation = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-matrix-green/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleNavClick('hero')}
        >
          <div className="w-10 h-10 border-2 border-matrix-green flex items-center justify-center glow-border">
            <Terminal className="w-5 h-5 text-matrix-green" />
          </div>
          <span className="font-orbitron text-lg tracking-wider glow-text-subtle">
            AGENTIC.AI
          </span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {['about', 'features', 'architecture', 'demo'].map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavClick(item)}
              className={`text-sm tracking-wide transition-all ${
                activeSection === item
                  ? 'text-matrix-green glow-text-subtle'
                  : 'text-matrix-green/60 hover:text-matrix-green'
              }`}
            >
              [{item.toUpperCase()}]
            </motion.button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavClick('demo')}
          className="matrix-btn-primary px-6 py-2 text-sm font-semibold"
          data-testid="nav-launch-btn"
        >
          LAUNCH AGENT
        </motion.button>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = ({ onLaunch }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'AUTONOMOUS AI SYSTEMS FOR THE FUTURE';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-6">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-matrix-green/40 bg-matrix-green/5">
            <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse" />
            <span className="text-xs tracking-widest">SYSTEM ONLINE</span>
          </div>

          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="glow-text">AGENTIC</span>
            <br />
            <span className="text-matrix-green/60">RESEARCH AI</span>
          </h1>

          <div className="h-8 mb-8">
            <p className="text-lg md:text-xl text-matrix-green/80 font-mono">
              {'>'} {typedText}
              <span className="animate-pulse">_</span>
            </p>
          </div>

          <p className="text-matrix-green/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            An autonomous, task-oriented AI system that plans, executes, evaluates,
            and terminates multi-step research tasks using structured planning and tool orchestration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLaunch}
              className="matrix-btn-primary px-8 py-4 text-lg font-orbitron flex items-center justify-center gap-3"
              data-testid="hero-launch-btn"
            >
              <Play className="w-5 h-5" />
              INITIALIZE AGENT
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              className="matrix-btn px-8 py-4 text-lg font-orbitron flex items-center justify-center gap-3"
            >
              LEARN MORE
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -left-20 top-1/4 opacity-20"
        >
          <Code2 className="w-20 h-20" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -right-20 bottom-1/4 opacity-20"
        >
          <Brain className="w-24 h-24" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-matrix-green/40" />
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const features = [
    { icon: Brain, title: 'Intelligent Planning', desc: 'Converts high-level goals into structured execution plans' },
    { icon: Cpu, title: 'Autonomous Execution', desc: 'Selects and executes tools without human intervention' },
    { icon: Shield, title: 'Smart Evaluation', desc: 'Evaluates outputs and decides on retries or termination' },
    { icon: Database, title: 'Stateful Tracking', desc: 'Maintains execution state and intermediate outputs' },
  ];

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="absolute inset-0 hex-pattern opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 glow-text-subtle">
            WHY AGENTIC AI?
          </h2>
          <p className="text-matrix-green/60 max-w-2xl mx-auto">
            Unlike simple AI agents, this system is truly agentic - designed for
            decision-making, not just responses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="matrix-card p-6 group"
            >
              <div className="w-14 h-14 mb-4 border border-matrix-green/40 flex items-center justify-center group-hover:glow-border-strong transition-all">
                <feature.icon className="w-7 h-7 text-matrix-green" />
              </div>
              <h3 className="font-orbitron text-lg mb-2">{feature.title}</h3>
              <p className="text-matrix-green/60 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="terminal-window max-w-3xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="text-xs text-matrix-green/60 ml-4">system_architecture.json</span>
            </div>
            <div className="terminal-body">
              <pre className="text-xs md:text-sm">
{`{
  "system": "Agentic Research AI",
  "components": {
    "planner": "LLM-powered structured planning",
    "executor": "Autonomous tool orchestration",
    "evaluator": "Decision-making & retry logic",
    "state_manager": "Execution tracking"
  },
  "tools": ["web_search", "summarizer", "python_executor"],
  "status": "OPERATIONAL"
}`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const tools = [
    {
      icon: Search,
      name: 'web_search',
      desc: 'Research queries across the web',
      example: 'web_search("Stripe competitors 2024")'
    },
    {
      icon: FileText,
      name: 'summarizer',
      desc: 'Intelligent text summarization',
      example: 'summarizer(search_results)'
    },
    {
      icon: Code2,
      name: 'python_executor',
      desc: 'Controlled code execution',
      example: 'python_executor("print(analysis)")'
    },
  ];

  return (
    <section id="features" className="py-32 px-6 bg-black/30 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 glow-text-subtle">
            AVAILABLE TOOLS
          </h2>
          <p className="text-matrix-green/60 max-w-2xl mx-auto">
            The agent autonomously selects from these tools to complete research tasks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="matrix-card p-8 hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 mb-6 border-2 border-matrix-green/60 flex items-center justify-center glow-border">
                <tool.icon className="w-8 h-8 text-matrix-green" />
              </div>
              <h3 className="font-orbitron text-xl mb-3">{tool.name}</h3>
              <p className="text-matrix-green/60 mb-4">{tool.desc}</p>
              <div className="code-block text-xs">
                <span className="text-matrix-green/40">// Example</span>
                <br />
                {tool.example}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Architecture Section
const ArchitectureSection = () => {
  const steps = [
    { icon: Sparkles, label: 'User Goal', desc: 'Input high-level objective' },
    { icon: Brain, label: 'Planner', desc: 'LLM generates structured plan' },
    { icon: GitBranch, label: 'Executor', desc: 'Runs tools autonomously' },
    { icon: Activity, label: 'Evaluator', desc: 'Checks success/retry/fail' },
    { icon: Database, label: 'State', desc: 'Tracks execution progress' },
    { icon: CheckCircle2, label: 'Output', desc: 'Final research results' },
  ];

  return (
    <section id="architecture" className="py-32 px-6 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 glow-text-subtle">
            SYSTEM ARCHITECTURE
          </h2>
          <p className="text-matrix-green/60 max-w-2xl mx-auto">
            A modular, production-oriented architecture for reliable autonomous AI
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="matrix-card p-4 md:p-6 text-center min-w-[140px]"
              >
                <div className="w-12 h-12 mx-auto mb-3 border border-matrix-green/60 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-matrix-green" />
                </div>
                <h4 className="font-orbitron text-sm mb-1">{step.label}</h4>
                <p className="text-matrix-green/50 text-xs">{step.desc}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-matrix-green/40 hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Structured Plans', value: '100%' },
            { label: 'Tool Success Rate', value: '~85%' },
            { label: 'Max Retries', value: '2' },
            { label: 'State Tracked', value: 'ALL' },
          ].map((stat, index) => (
            <div key={stat.label} className="matrix-card p-6 text-center">
              <div className="font-orbitron text-3xl md:text-4xl mb-2 glow-text">{stat.value}</div>
              <div className="text-matrix-green/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Demo Section – Rich Agent Execution (OPTION A)
const DemoSection = () => {
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentResult, setAgentResult] = useState(null);
  const [error, setError] = useState(null);
  const terminalRef = useRef(null);

  const sampleGoals = [
    'Analyze competitors of Stripe',
    'Research latest AI trends in 2024',
    'Find top JavaScript frameworks',
    'Compare cloud providers AWS vs GCP',
  ];

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [agentResult, scrollToBottom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setIsLoading(true);
    setError(null);
    setAgentResult(null);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/run-agent`,
        { objective: goal }
      );

      setAgentResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Agent execution failed');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setGoal('');
    setAgentResult(null);
    setError(null);
  };

  return (
    <section id="demo" className="py-32 px-6 bg-black/50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h2 className="font-orbitron text-5xl text-center mb-4 glow-text-subtle">
          LIVE DEMO
        </h2>
        <p className="text-center text-matrix-green/60 mb-12">
          Watch a real autonomous agent plan, execute, evaluate, and conclude.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Input Panel */}
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="text-xs text-matrix-green/60">agent_control.sh</span>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Enter research goal"
                  className="terminal-input w-full p-4"
                  disabled={isLoading}
                />

                <div className="flex flex-wrap gap-2">
                  {sampleGoals.map((g, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGoal(g)}
                      className="text-xs px-3 py-1 border border-matrix-green/30"
                    >
                      {g}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="matrix-btn-primary flex-1 py-3"
                  >
                    {isLoading ? 'RUNNING...' : 'RUN AGENT'}
                  </button>

                  {agentResult && (
                    <button type="button" onClick={reset} className="matrix-btn">
                      RESET
                    </button>
                  )}
                </div>
              </form>

              {error && (
                <div className="mt-4 text-red-400 border border-red-500/50 p-3">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Output Terminal */}
          <div className="terminal-window h-[600px] flex flex-col">
            <div className="terminal-header">
              <span className="text-xs text-matrix-green/60">
                execution_output.log
              </span>
            </div>

            <div ref={terminalRef} className="terminal-body p-4 overflow-y-auto">
              {!agentResult && (
                <div className="text-matrix-green/40 animate-pulse">
                  {'>'} Awaiting agent execution...
                </div>
              )}

              {agentResult && (
                <>
                  <div className="text-cyan-400 mb-4">
                    [OBJECTIVE] {agentResult.objective}
                  </div>

                  {agentResult.execution.steps.map((step) => (
                    <div key={step.step_id} className="mb-4">
                      <div className="text-yellow-400">
                        [STEP {step.step_id}] {step.tool}
                      </div>
                      <div
                        className={
                          step.status === 'success'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }
                      >
                        Status: {step.status}
                      </div>
                      <pre className="text-xs text-matrix-green/70 mt-2 whitespace-pre-wrap">
                        {step.output}
                      </pre>
                    </div>
                  ))}

                  <div className="mt-6 text-matrix-green/80">
                    [METRICS] Retries: {agentResult.metrics.retries}
                  </div>
                </>
              )}

              <div className="mt-4 text-matrix-green animate-pulse">
                {'>'} _
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-12 px-6 border-t border-matrix-green/20">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-matrix-green" />
          <span className="font-orbitron tracking-wider">AGENTIC.AI</span>
        </div>

        <div className="text-center text-matrix-green/60 text-sm">
          <p>Built by Indrasish Bhattacharjee</p>
          <p className="mt-1">Autonomous AI Systems Research</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Indrasish7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-matrix-green/60 hover:text-matrix-green transition-colors"
          >
            [GITHUB]
          </a>
          <a
            href="https://www.linkedin.com/in/indrasishbhattacharjee/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-matrix-green/60 hover:text-matrix-green transition-colors"
          >
            [LINKEDIN]
          </a>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-matrix-green/10 text-center text-xs text-matrix-green/40">
        <Clock className="w-3 h-3 inline mr-2" />
        System Time: {new Date().toISOString()}
      </div>
    </div>
  </footer>
);

// Main App
function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleLaunch = () => {
    setActiveSection('demo');
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-matrix-dark min-h-screen text-matrix-green">
      <MatrixRain />
      <div className="scan-line" />
      <div className="crt-overlay" />

      <div className="relative z-10">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <HeroSection onLaunch={handleLaunch} />
        <AboutSection />
        <FeaturesSection />
        <ArchitectureSection />
        <DemoSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
