import React from 'react';
import { motion } from 'motion/react';

const CASE_STUDIES = {
  'helios-engine': {
    title: 'HELIOS GRAPHICS ENGINE',
    tech: 'RUST / WEBASSEMBLY / WEBGL 2',
    overview:
      'A REAL-TIME WEBGL RENDERING ENGINE WRITTEN ENTIRELY IN RUST AND PIPED TO THE BROWSER VIA HIGH-SPEED WEBASSEMBLY BINDINGS. HELIOS FEATURES A CUSTOM SHADER COMPILING UNIT AND A PARALLEL DATA PIPELINE CAPABLE OF RENDERING 1.2 MILLION POLYGONS INDEPENDENTLY AT A CONSISTENT 60 FPS OVER MULTIPLE BACKGROUND THREADS.',
    metrics: [
      { label: 'RENDER TIME', value: '1.6ms' },
      { label: 'THROUGHPUT', value: '1.2M poly/s' },
      { label: 'WASM BINARY', value: '120KB' },
    ],
    snippetTitle: 'HELIOS_RENDER_PIPELINE.RS',
    snippet: `#[wasm_bindgen]
pub fn render_frame(&mut self) -> Result<(), JsValue> {
    let gl = &self.context;
    
    // Bind memory-mapped vertex buffers
    gl.bind_vertex_array(Some(&self.vao));
    
    // Draw elements using instanced rendering
    gl.draw_elements_instanced(
        WebGl2RenderingContext::TRIANGLES,
        self.index_count,
        WebGl2RenderingContext::UNSIGNED_SHORT,
        0,
        self.instance_count
    );
    
    Ok(())
}`,
  },
  'aether-storage': {
    title: 'AETHER DISTRIBUTED DB',
    tech: 'GO / RAFT CONSENSUS / GRPC',
    overview:
      'A SECURE, FAULT-TOLERANT DISTRIBUTED DATA STORE IMPLEMENTING THE RAFT CONSENSUS PROTOCOL. ENGINEERED FOR HIGH-SPEED LOG INGESTION WITH A CUSTOM MEMORY-MAPPED TRANSACTION TREE AND DISTRIBUTED WRITE PIPELINING ROUTED OVER MULTIPLE HOSTS VIA MULTIPLEXED GRPC CONNECTIONS.',
    metrics: [
      { label: 'WRITE LATENCY', value: '< 4ms' },
      { label: 'CONSISTENCY', value: 'STRONG (RAFT)' },
      { label: 'CONCURRENT OPS', value: '250K/s' },
    ],
    snippetTitle: 'AETHER_RAFT_NODE.GO',
    snippet: `func (n *RaftNode) Propose(ctx context.Context, data []byte) error {
	entry := &pb.LogEntry{
		Index: n.lastLogIndex + 1,
		Term:  n.currentTerm,
		Data:  data,
	}
	
	// Append locally and broadcast append entries
	if err := n.logStore.Append(entry); err != nil {
		return err
	}
	
	return n.broadcastAppendEntries(ctx, entry)
}`,
  },
  'kronos-compiler': {
    title: 'KRONOS JIT COMPILER',
    tech: 'C++ / LLVM / NODE.JS CORE',
    overview:
      'A HIGH-SPEED QUERY JUST-IN-TIME COMPILER DEVELOPED AS A NATIVE C++ NODE.JS ADDON. KRONOS OPTIMIZES LOGICAL TELEMETRY SCHEMAS AND DYNAMICALLY GENERATES ARM64 OR X86_64 MACHINE INSTRUCTIONS IN REAL-TIME BY LINKING DIRECTLY INTO THE LLVM COMPILER LIBRARY, REDUCING INTERACTIVE ENGINE OVERHEAD BY 15X.',
    metrics: [
      { label: 'JIT LATENCY', value: '80ns' },
      { label: 'COMPILE OPTIM', value: '15x Speedup' },
      { label: 'MACHINE ARCH', value: 'ARM64/X86_64' },
    ],
    snippetTitle: 'KRONOS_LLVM_JIT.CPP',
    snippet: `std::unique_ptr<llvm::Module> CompileQuery(const std::string& querySrc) {
  auto Context = std::make_unique<llvm::LLVMContext>();
  auto Builder = std::make_unique<llvm::IRBuilder<>>(*Context);
  auto Module = std::make_unique<llvm::Module>("kronos_jit", *Context);
  
  // Set target triple for compilation
  Module->setTargetTriple(llvm::sys::getDefaultTargetTriple());
  
  // Compile AST query nodes to raw LLVM IR
  llvm::Function* Fn = GenerateIR(Module.get(), *Builder, querySrc);
  
  return Module;
}`,
  },
  'nexusflowcontroller': {
    title: 'NEXUSFLOWCONTROLLER',
    tech: 'NODE.JS / REDIS / LUA / NGINX / DOCKER',
    metrics: [
      { label: 'THROUGHPUT', value: '471 req/s' },
      { label: 'P95 LATENCY', value: '11.58ms' },
      { label: 'CONCURRENCY', value: '100 users' },
    ],
    sections: [
      {
        title: 'PROBLEM STATEMENT',
        content: [
          'Modern backend systems can get overwhelmed by sudden traffic spikes — flash sales, bot attacks, or misconfigured clients stuck in retry loops. Without protection, this causes cascading failures, database overload, and downtime for legitimate users.',
          'The challenge gets harder in a multi-server setup: each server tracking its own request count independently breaks the limit entirely, and concurrent requests can cause race conditions that let extra traffic slip through.'
        ]
      },
      {
        title: 'MY SOLUTION',
        content: [
          'I built NexusFlowController, a distributed rate-limiting system that sits in front of an API and decides which requests are allowed through, enforced correctly across multiple servers.',
          'The system runs as a <strong>3-node Express.js cluster</strong> behind an <strong>Nginx load balancer</strong>, with all nodes sharing a single <strong>Redis</strong> instance as the source of truth — so the limit stays accurate no matter which node handles a request. To prevent race conditions under concurrent traffic, the increment-and-check logic runs as an <strong>atomic Redis Lua script</strong>, guaranteeing no two requests can read a stale count at the same time.',
          'To handle Redis failures gracefully, I implemented a <strong>Circuit Breaker</strong> pattern that "fails open" — temporarily allowing traffic through instead of crashing the app if Redis goes down, then auto-recovers. I also added <strong>JWT-based tier limiting</strong> (Anonymous vs Premium), and built a live <strong>React dashboard</strong> plus <strong>Prometheus + Grafana</strong> monitoring to visualize the system in real time.',
          'Everything was load tested with <strong>k6</strong>: 471 requests/second at p95 latency of 11.58ms across 100 concurrent users — a 3x latency improvement after scaling from 1 node to 3. I also chaos tested it by killing a live node and confirming the cluster self-heals without downtime.'
        ]
      },
      {
        title: 'CHALLENGES I FACED',
        content: [
          '<strong>Race conditions under concurrent load</strong> — Initially, the rate-limiting logic read the request count and then incremented it as two separate steps. Under concurrent traffic, two requests could read the same count before either wrote back, both getting incorrectly allowed. I fixed this by moving the entire check into a single atomic Redis Lua script, so it always executes as one uninterruptible operation.',
          '<strong>Handling Redis failures without crashing the app</strong> — Early on, if Redis went down, every request would hang waiting for a response and eventually error out, making the whole app unusable. I solved this with a Circuit Breaker that detects repeated Redis failures and "fails open," letting traffic through temporarily instead of taking the system down, then automatically retries Redis after a cooldown.'
        ]
      },
      {
        title: 'TECH STACK',
        content: [
          'Node.js, Express.js, Redis, Lua, Nginx, Docker, Docker Compose, Prometheus, Grafana, React, JWT, k6'
        ]
      },
      {
        title: 'GITHUB',
        content: [
          '<a href="https://github.com/himanshisonkusale/NexusFlowController" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium underline underline-offset-4">View Repository on GitHub ↗</a>'
        ]
      }
    ]
  },
  'interviewiq': {
    title: 'INTERVIEWAIQ',
    tech: 'NEXT.JS / TS / VAPI AI / GROQ / FIREBASE',
    metrics: [
      { label: 'LATENCY', value: '< 200ms' },
      { label: 'EVAL CATEGORIES', value: '5 metrics' },
      { label: 'PROCTORING', value: 'Real-time' },
    ],
    sections: [
      {
        title: 'PROBLEM STATEMENT',
        content: [
          "Most candidates prepare for interviews by reading questions off a list or practicing answers alone in front of a mirror — there's no real-time pressure, no spoken delivery practice, and no objective feedback on how they actually performed. Mock interview platforms that do exist are often text-based, generic (not tailored to a specific role or tech stack), and give no structured breakdown of strengths and weaknesses. There's also no way to simulate the integrity pressure of a real interview — staying on camera, staying focused, not switching tabs — which is exactly the kind of environment candidates need to practice in."
        ]
      },
      {
        title: 'MY SOLUTION',
        content: [
          "I built InterviewAIQ, a full-stack AI interview platform that simulates a real interview end-to-end — voice conversation, live webcam, and a detailed performance report — instead of just another question bank.",
          "Users pick their target role, experience level, interview type, and tech stack, and a <strong>Vapi AI</strong> voice assistant conducts a live, spoken interview that listens and responds in real time, generating questions dynamically through <strong>Groq AI</strong> rather than pulling from a static list. During the session, the webcam feed replaces a static avatar with a REC indicator, live timer, and mic visualizer, while a <strong>proctoring system</strong> runs in the background — detecting multiple faces, face absence, tab switches, and fullscreen exits, auto-terminating the session if 5 violations occur.",
          "The moment the interview ends, the full transcript is sent to Groq AI, which returns a structured report scoring the candidate across 5 categories — Communication, Technical Knowledge, Problem Solving, Cultural Fit, and Confidence — along with specific strengths and areas to improve. Everything is backed by <strong>Firebase</strong> (Auth + Firestore) for user sessions and interview history, and the landing experience uses <strong>Spline 3D</strong> and <strong>Framer Motion</strong> to give it a premium, production-SaaS feel rather than a typical student project look."
        ]
      },
      {
        title: 'CHALLENGES I FACED',
        content: [
          "<strong>Coordinating real-time voice, video, and proctoring simultaneously</strong> — Running a live Vapi voice call, a webcam stream, and a face-detection proctoring system all at once in the same component without conflicts or performance lag was the hardest integration problem. I structured this around a single <code>Agent.tsx</code> component that initializes the voice call and layers webcam + face-api.js detection on top, with violation tracking handled through state that auto-terminates the session once a threshold is crossed.",
          "<strong>Turning a raw conversation transcript into a structured, fair evaluation</strong> — Voice interview transcripts are messy — filler words, interruptions, incomplete sentences. Getting Groq AI to consistently return a reliable, structured 5-category score (rather than vague or inconsistent feedback) took significant prompt iteration, alongside designing a Firestore schema that could store both the score breakdown and proctoring flags together for an honest, complete report."
        ]
      },
      {
        title: 'TECH STACK',
        content: [
          "Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Vapi AI, Groq API, face-api.js, Firebase (Auth + Firestore), Framer Motion, Spline 3D, Daily.co, React Hook Form, Zod, Vercel"
        ]
      },
      {
        title: 'LIVE DEMO & GITHUB',
        content: [
          '<a href="https://interview-aiq.vercel.app" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium underline underline-offset-4 mr-6">Live Demo ↗</a>',
          '<a href="https://github.com/himanshisonkusale/InterviewAIQ" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium underline underline-offset-4">View Repository on GitHub ↗</a>'
        ]
      }
    ]
  },
  'finbuzz-ai': {
    title: 'FINBUZZ.AI',
    tech: 'PYTHON / AUTOGEN / LLMS / GRADIO',
    metrics: [
      { label: 'AGENTIC', value: 'Autonomous' },
      { label: 'LATENCY', value: 'Real-time' },
      { label: 'RISK CONTROL', value: 'Dynamic' },
    ],
    sections: [
      {
        title: 'PROBLEM STATEMENT',
        content: [
          'Most retail trading tools either give raw data dumps that require the user to make every decision manually, or are static "robo-advisor" platforms that follow fixed, pre-programmed rules with no real adaptability. Neither approach reflects how an actual trader thinks — reading live price action, weighing momentum and volume together, sizing positions based on conviction, and adjusting strategy based on what\'s been working recently. Building a system that can genuinely <em>reason</em> about live market data and act on it autonomously, rather than just display charts or run a static if-else rule set, is a fundamentally harder problem — it requires combining real-time data streaming, technical analysis, LLM-based decision-making, and risk management into one coherent agent.'
        ]
      },
      {
        title: 'MY SOLUTION',
        content: [
          'I built FINBUZZ.AI, a financial analysis platform with an autonomous AI trading agent at its core, built on <strong>Microsoft AutoGen</strong>, that can independently analyze live market data and execute BUY/SELL/HOLD decisions without manual input.',
          'The agent ingests real-time 1-minute candlestick data and computes technical indicators — SMA crossovers, momentum, and volume spikes — then feeds that market context to an LLM (OpenAI GPT-4 or Google Gemini) which reasons about the data and returns a trading decision with a conviction level. Position sizing scales with that conviction: high-conviction trades deploy up to 50% of capital, low-conviction "scalps" use 10–20%, with automatic 2% stop-losses and partial profit-taking built in as risk controls. Critically, the agent also has a <strong>learning layer</strong> — it tracks win rate and average P&L over time and adjusts how aggressively it sizes future trades based on recent performance, rather than trading the same way regardless of how it\'s been doing.',
          'Everything runs through a Gradio interface with a dark-themed, real-time candlestick chart (Plotly) showing live BUY/SELL markers, a portfolio tracker, and an analytics dashboard with cumulative P&L and trade distribution. The system also includes a deterministic fallback strategy, so the agent still functions and makes reasonable decisions even without an LLM API key connected.'
        ]
      },
      {
        title: 'CHALLENGES I FACED',
        content: [
          '<strong>Making the AI\'s decisions reliable instead of erratic</strong> — Connecting an LLM directly to live trading decisions is risky if the model\'s reasoning isn\'t grounded — it can hallucinate confidence or ignore real signals. I solved this by feeding the LLM a structured market context (computed indicators, not raw price noise) and constraining its output to a strict decision format with conviction levels, so the AI\'s reasoning was always anchored to actual technical analysis rather than free-form guessing. I also built a deterministic rule-based fallback so the system degrades gracefully instead of failing when no API key is available.',
          '<strong>Balancing responsiveness with risk control</strong> — An agent that trades too conservatively never deploys capital meaningfully; one with no limits can blow up an account on a single bad signal. I addressed this by tying position size directly to the agent\'s stated conviction level, layering in automatic 2% stop-losses and partial profit-taking on winners, and adding a performance-adaptive sizing system so the agent naturally becomes more conservative after a losing streak and more aggressive after a winning one — closer to how a disciplined human trader manages risk.'
        ]
      },
      {
        title: 'TECH STACK',
        content: [
          'Python 3.12, Microsoft AutoGen, OpenAI GPT-4, Google Gemini, Gradio, Plotly, yfinance, Pandas'
        ]
      },
      {
        title: 'LIVE DEMO & GITHUB',
        content: [
          '<a href="https://finbuzz-ai.vercel.app/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium underline underline-offset-4 mr-6">Live Demo ↗</a>',
          '<a href="https://github.com/himanshisonkusale/FINBUZZ.AI-Project" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium underline underline-offset-4">View Repository on GitHub ↗</a>'
        ]
      }
    ]
  },
};

export const CaseStudyModal = ({ projectId, onClose }) => {
  if (!projectId) return null;

  const data = CASE_STUDIES[projectId];
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Glass Panel */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel w-full max-w-3xl rounded-3xl p-8 md:p-12 border-white/10 bg-[#0d0d0f]/90 relative z-10 max-h-[85vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/60 hover:text-white transition-colors focus:outline-none cursor-pointer"
        >
          &#x2715;
        </button>

        {/* Header Metadata */}
        <span className="text-[10px] tracking-[0.3em] text-blue-300 font-bold mb-3 block">
          {data.tech}
        </span>
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.05em] mb-6">
          {data.title}
        </h2>

        {/* Metrics Grid */}
        {data.metrics && (
          <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-white/5">
            {data.metrics.map((metric) => (
              <div key={metric.label}>
                <span className="text-xl md:text-2xl text-blue-200 block font-light tracking-wide">
                  {metric.value}
                </span>
                <span className="text-[9px] tracking-widest text-white/30 block mt-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Project Description */}
        {data.overview && (
          <div className="mb-8">
            <h4 className="text-[10px] tracking-[0.25em] text-white/40 font-bold mb-3">
              ARCHITECTURAL OVERVIEW
            </h4>
            <p className="text-xs md:text-sm tracking-wider text-white/70 leading-relaxed font-light">
              {data.overview}
            </p>
          </div>
        )}

        {/* Dynamic Sections */}
        {data.sections && data.sections.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h4 className="text-[10px] tracking-[0.25em] text-white/40 font-bold mb-3 uppercase">
              {section.title}
            </h4>
            <div className="text-xs md:text-sm tracking-wider text-white/70 leading-relaxed font-light space-y-4">
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
          </div>
        ))}

        {/* Code Snippet Box */}
        {data.snippet && (
          <div>
            <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-t-xl px-4 py-2">
              <span className="text-[9px] font-mono tracking-wider text-white/40">
                {data.snippetTitle}
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-300/40" />
            </div>
            <pre className="w-full bg-[#070708] border-x border-b border-white/5 rounded-b-xl p-4 md:p-6 text-[10px] md:text-xs text-blue-200/80 font-mono overflow-x-auto leading-relaxed">
              <code>{data.snippet}</code>
            </pre>
          </div>
        )}
      </motion.div>
    </div>
  );
};
