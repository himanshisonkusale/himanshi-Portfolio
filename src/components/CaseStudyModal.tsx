import React from 'react';
import { motion } from 'motion/react';

interface CaseStudyModalProps {
  projectId: string | null;
  onClose: () => void;
}

interface CaseStudyDetails {
  title: string;
  tech: string;
  overview: string;
  metrics: { label: string; value: string }[];
  snippetTitle: string;
  snippet: string;
}

const CASE_STUDIES: Record<string, CaseStudyDetails> = {
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
};

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ projectId, onClose }) => {
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

        {/* Project Description */}
        <div className="mb-8">
          <h4 className="text-[10px] tracking-[0.25em] text-white/40 font-bold mb-3">
            ARCHITECTURAL OVERVIEW
          </h4>
          <p className="text-xs md:text-sm tracking-wider text-white/70 leading-relaxed font-light">
            {data.overview}
          </p>
        </div>

        {/* Code Snippet Box */}
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
      </motion.div>
    </div>
  );
};
