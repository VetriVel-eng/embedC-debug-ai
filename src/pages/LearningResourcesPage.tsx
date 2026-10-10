import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Search,
  BookOpen,
  ArrowRight,
  Code2,
  X,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Cpu,
} from 'lucide-react';

export interface BeginnerResource {
  id: string;
  title: string;
  topic: 'C Programming' | 'Embedded C' | 'Debugging' | 'Pointers' | 'Microcontrollers';
  shortDesc: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  readTime: string;
  externalUrl: string;
  overview: string;
  codeExample: string;
  commonPitfalls: string[];
  bestPractices: string[];
}

export const BEGINNER_RESOURCES: BeginnerResource[] = [
  // 1. C Programming
  {
    id: 'c-prog-interactive',
    title: 'Learn-C.org Interactive Tutorial',
    topic: 'C Programming',
    shortDesc: 'Free interactive browser-based tutorial covering C syntax, variables, arrays, strings, functions, and control structures for beginners.',
    difficulty: 'Beginner',
    tags: ['Syntax', 'Variables', 'Loops', 'Functions'],
    readTime: 'Free Tutorial',
    externalUrl: 'https://www.learn-c.org/',
    overview: 'Learn-C.org provides an interactive in-browser playground for learning C without installing any toolchains. It walks through syntax, operators, control flow, functions, and structures.',
    codeExample: `#include <stdio.h>

int main(void) {
    int counter = 0;
    while (counter < 5) {
        printf("Iteration: %d\\n", counter);
        counter++;
    }
    return 0;
}`,
    commonPitfalls: [
      'Using uninitialized local variables that hold random stack memory',
      'Accidental assignment (=) instead of comparison (==) inside if conditions',
      'Forgetting that strings in C are null-terminated (must allocate +1 byte for \\0)',
    ],
    bestPractices: [
      'Compile with -Wall -Wextra to catch undeclared variables and type mismatches',
      'Initialize all variables upon declaration',
      'Always return explicit status codes from main',
    ],
  },
  {
    id: 'c-prog-reference',
    title: 'Modern C Reference (cppreference.com)',
    topic: 'C Programming',
    shortDesc: 'Comprehensive, accurate reference documentation for C language core features, standard headers (<stdio.h>, <stdlib.h>), and operator precedence.',
    difficulty: 'Beginner',
    tags: ['Standard Library', 'Headers', 'Types', 'C99/C11'],
    readTime: 'Documentation',
    externalUrl: 'https://en.cppreference.com/w/c',
    overview: 'cppreference.com is the authoritative community reference for standard C. It includes detailed specifications for standard library functions, types, constants, and keywords.',
    codeExample: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t sample = 100;
    printf("Fixed width integer: %u\\n", sample);
    return 0;
}`,
    commonPitfalls: [
      'Relying on platform-dependent sizes of int and long',
      'Ignoring return values from standard I/O functions like scanf and fread',
    ],
    bestPractices: [
      'Include <stdint.h> for predictable integer bit-widths across architectures',
      'Consult the standard header documentation when using library functions',
    ],
  },

  // 2. Embedded C
  {
    id: 'embedded-c-valvano',
    title: 'Embedded Systems with ARM Cortex-M (UT Austin)',
    topic: 'Embedded C',
    shortDesc: 'Foundational course by Prof. Jonathan Valvano on bare-metal C programming, memory-mapped I/O, bitwise operators, and hardware interaction.',
    difficulty: 'Beginner',
    tags: ['Bare-Metal', 'Memory-Mapped I/O', 'GPIO', 'Registers'],
    readTime: 'Online E-Book',
    externalUrl: 'https://users.ece.utexas.edu/~valvano/Volume1/E-Book/',
    overview: 'This classic curriculum teaches students how software directly drives hardware. It covers input/output pin configuration, bit-manipulation, timers, and bare-metal firmware design.',
    codeExample: `#include <stdint.h>

// Direct memory-mapped register manipulation
#define GPIOA_MODER  (*(volatile uint32_t *)0x40020000)
#define GPIOA_ODR    (*(volatile uint32_t *)0x40020014)

void toggle_pin5(void) {
    GPIOA_MODER |= (1U << 10); // Configure Pin 5 as output
    GPIOA_ODR ^= (1U << 5);     // Toggle state
}`,
    commonPitfalls: [
      'Writing without the volatile keyword, allowing compiler optimizations to eliminate reads/writes',
      'Overwriting entire registers instead of using bitwise OR (|=) or AND-NOT (&= ~)',
      'Configuring pins before enabling peripheral clock power',
    ],
    bestPractices: [
      'Always qualify memory-mapped hardware pointers with volatile',
      'Use atomic bit-banding or critical sections when modifying shared registers',
    ],
  },
  {
    id: 'embedded-com-guide',
    title: 'Embedded.com Firmware Development Guide',
    topic: 'Embedded C',
    shortDesc: 'Practical guides and articles explaining the volatile keyword, interrupt service routines, ring buffers, and hardware abstraction.',
    difficulty: 'Intermediate',
    tags: ['Volatile', 'ISRs', 'Ring Buffers', 'Architecture'],
    readTime: 'Technical Articles',
    externalUrl: 'https://www.embedded.com/',
    overview: 'Embedded.com is a leading resource for embedded systems architects and developers, offering in-depth articles on real-time coding, safety standards, and firmware design.',
    codeExample: `#include <stdbool.h>
#include <stdint.h>

// Volatile qualifier prevents compiler caching in CPU registers
static volatile bool g_data_ready = false;

void SysTick_Handler(void) {
    g_data_ready = true;
}`,
    commonPitfalls: [
      'Calling non-reentrant functions (like printf or malloc) inside interrupt handlers',
      'Lengthy execution loops inside ISRs starving other interrupts',
    ],
    bestPractices: [
      'Keep interrupt handlers short; offload computation to main loop flags',
      'Use lock-free circular buffers for producer-consumer data streams',
    ],
  },

  // 3. Debugging
  {
    id: 'gdb-debugging-guide',
    title: 'Debugging with GDB (GNU Project Debugger)',
    topic: 'Debugging',
    shortDesc: 'Official guide to using GDB: setting breakpoints, inspecting stack memory, examining registers, and analyzing segmentation faults.',
    difficulty: 'Beginner',
    tags: ['GDB', 'Breakpoints', 'Stack Traces', 'Memory Inspection'],
    readTime: 'Official Manual',
    externalUrl: 'https://sourceware.org/gdb/current/onlinedocs/gdb/',
    overview: 'The GNU Debugger (GDB) allows developers to see what is going on inside a C program while it executes, or what the program was doing at the moment it crashed.',
    codeExample: `/* Typical GDB debugging commands:
   (gdb) break main
   (gdb) run
   (gdb) print ptr
   (gdb) backtrace
   (gdb) x/4xw &sensor_buffer
*/`,
    commonPitfalls: [
      'Compiling with optimization (-O3) while debugging, causing line-stepping jumps',
      'Debugging without generating symbols (-g flag)',
    ],
    bestPractices: [
      'Compile with -g -O0 for clean step-by-step variable inspection',
      'Inspect core dumps with `gdb ./program core` to analyze crashes post-mortem',
    ],
  },
  {
    id: 'valgrind-memcheck-guide',
    title: 'Valgrind Memory Debugger Quickstart',
    topic: 'Debugging',
    shortDesc: 'Learn how to detect memory leaks, invalid pointer dereferences, and buffer overflows in compiled C executables.',
    difficulty: 'Intermediate',
    tags: ['Memory Leaks', 'Buffer Overflows', 'Memcheck', 'Valgrind'],
    readTime: 'Tool Guide',
    externalUrl: 'https://valgrind.org/docs/manual/quick-start.html',
    overview: 'Valgrind Memcheck runs your compiled program in a synthetic CPU environment to track every memory allocation, deallocation, and pointer access, spotting leaks instantly.',
    codeExample: `#include <stdlib.h>

void safe_allocation(void) {
    int *buffer = (int *)malloc(10 * sizeof(int));
    if (buffer != NULL) {
        buffer[0] = 42;
        free(buffer); // Prevent memory leak
    }
}`,
    commonPitfalls: [
      'Allocating memory with malloc() without matching free()',
      'Accessing memory after it has been freed (use-after-free)',
      'Reading uninitialized memory allocated by malloc',
    ],
    bestPractices: [
      'Always set freed pointers to NULL immediately after calling free(p)',
      'Run tests under Valgrind with `valgrind --leak-check=full ./app`',
    ],
  },

  // 4. Pointers
  {
    id: 'stanford-pointers-guide',
    title: 'Stanford CS Education: Pointers and Memory',
    topic: 'Pointers',
    shortDesc: 'Classic illustrated guide by Nick Parlante explaining pointers, dereferencing, stack vs heap allocation, and pointer arithmetic.',
    difficulty: 'Beginner',
    tags: ['Addresses', 'Dereferencing', 'Memory Model', 'Stack vs Heap'],
    readTime: 'Stanford Courseware',
    externalUrl: 'https://cslibrary.stanford.edu/101/',
    overview: 'Nick Parlante’s Stanford CS Library tutorial is widely praised as one of the best conceptual introductions to memory addresses, the & operator, pointer dereferencing (*), and pointer safety.',
    codeExample: `#include <stdio.h>

int main(void) {
    int value = 42;
    int *ptr = &value; // ptr holds memory address of value

    printf("Value: %d\\n", *ptr); // Dereference ptr
    *ptr = 99;                    // Modify value through pointer
    printf("New value: %d\\n", value);
    return 0;
}`,
    commonPitfalls: [
      'Dereferencing a NULL or uninitialized pointer leading to segmentation faults',
      'Confusing the address-of operator (&) with the dereference operator (*)',
      'Returning a pointer to a stack-allocated local variable',
    ],
    bestPractices: [
      'Always verify pointers are not NULL before dereferencing',
      'Never return pointers to local variables that will be popped off the stack',
    ],
  },
  {
    id: 'stanford-binky-pointers',
    title: 'Binky Pointer Fun Video & Tutorial',
    topic: 'Pointers',
    shortDesc: 'The famous Stanford animated primer on how pointer assignment (*p = x vs p = &x) works in physical memory cells.',
    difficulty: 'Beginner',
    tags: ['Pointers', 'Visual Learning', 'Reference', 'Basics'],
    readTime: 'Visual Tutorial',
    externalUrl: 'https://cslibrary.stanford.edu/104/',
    overview: 'A famous 3-minute video lesson and accompanying document illustrating how pointers store addresses and how changing a pointer differs from changing pointee memory.',
    codeExample: `// The Binky pointer rule:
int *p = NULL; // 1. Pointer declared (points to nothing)
int a = 5;
p = &a;        // 2. Pointer assigned to address of a
*p = 10;       // 3. Pointee dereferenced and modified`,
    commonPitfalls: [
      'Thinking *p = 5 assigns an address instead of modifying the stored value',
      'Writing to a pointer before allocating a pointee',
    ],
    bestPractices: [
      'Draw box-and-arrow diagrams when reasoning about multi-level pointers (**p)',
      'Initialize pointers to NULL upon creation',
    ],
  },

  // 5. Microcontrollers
  {
    id: 'arm-cortex-m-guide',
    title: 'ARM Developer Guide for Cortex-M',
    topic: 'Microcontrollers',
    shortDesc: 'Official ARM architecture documentation covering register banks, interrupt vectors (NVIC), memory maps, and low-power modes.',
    difficulty: 'Beginner',
    tags: ['ARM Cortex-M', 'NVIC', 'Memory Maps', 'Registers'],
    readTime: 'Architecture Guide',
    externalUrl: 'https://developer.arm.com/documentation',
    overview: 'ARM Cortex-M is the dominant processor architecture for modern microcontrollers (STM32, NXP, Microchip, TI). This guide covers memory models, vector tables, and the nested vectored interrupt controller.',
    codeExample: `/* Typical Cortex-M Vector table startup layout */
__attribute__((section(".isr_vector")))
const void* const g_pfnVectors[] = {
    &_estack,             // Top of Stack
    Reset_Handler,        // Reset Vector
    NMI_Handler,          // Non-Maskable Interrupt
    HardFault_Handler,    // Hard Fault Exception
};`,
    commonPitfalls: [
      'Misaligned stack pointers causing immediate HardFault exceptions upon reset',
      'Forgetting that Flash memory addresses start at 0x08000000 on many STM32 MCUs',
    ],
    bestPractices: [
      'Inspect Cortex-M Fault Status Registers (CFSR, HFSR) when diagnosing faults',
      'Leverage CMSIS standard register definition headers',
    ],
  },
  {
    id: 'vivonomicon-stm32-guide',
    title: 'Bare-Metal STM32 Programming by Vivonomicon',
    topic: 'Microcontrollers',
    shortDesc: 'Beginner-friendly step-by-step guide to writing firmware without bloated HAL libraries, writing directly to GPIO and peripheral registers.',
    difficulty: 'Intermediate',
    tags: ['STM32', 'Linker Scripts', 'Makefiles', 'Peripherals'],
    readTime: 'Tutorial Series',
    externalUrl: 'https://vivonomicon.com/2018/04/02/bare-metal-stm32-programming-part-1-hello-arm/',
    overview: 'A widely praised blog series that teaches beginners how to build a microcontroller project from scratch: writing linker scripts (.ld), startup assembly, and peripheral register drivers.',
    codeExample: `#include <stdint.h>

void SysTick_Init(void) {
    // 1ms tick initialization using core Cortex-M SysTick peripheral
    SysTick->LOAD = (16000000 / 1000) - 1; // 16MHz clock
    SysTick->VAL = 0;
    SysTick->CTRL = 7; // Enable SysTick, interrupt, and processor clock
}`,
    commonPitfalls: [
      'Missing linker memory map sections leading to code not loading into Flash',
      'Neglecting to copy .data section from Flash to SRAM during startup',
    ],
    bestPractices: [
      'Understand your microcontroller linker script memory boundaries',
      'Use minimal startup code to minimize Flash footprint',
    ],
  },
];

export const LearningResourcesPage: React.FC = () => {
  const { navigateToAnalysis, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>('All');
  const [selectedResource, setSelectedResource] = useState<BeginnerResource | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const topics = [
    'All',
    'C Programming',
    'Embedded C',
    'Debugging',
    'Pointers',
    'Microcontrollers',
  ];

  const filteredResources = BEGINNER_RESOURCES.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (topicFilter === 'All') return true;
    return res.topic === topicFilter;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('Code copied to clipboard', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleOpenInEditor = (code: string, topic: string) => {
    setSelectedResource(null);
    navigateToAnalysis(code, topic.includes('Embedded') || topic.includes('Micro') ? 'Embedded C' : 'C');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Learning Resources
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore curated, beginner-friendly guides and real external resources for C, Embedded C, Debugging, Pointers, and Microcontrollers.
        </p>
      </div>

      {/* Search & Topic Categories Filter */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources by topic, keyword, or tool..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#090f1d] border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Topic Filters Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopicFilter(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                topicFilter === t
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'bg-[#090f1d] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => {
          let difficultyColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40';
          if (res.difficulty === 'Intermediate') {
            difficultyColor = 'text-amber-400 bg-amber-950/60 border-amber-800/40';
          } else if (res.difficulty === 'Advanced') {
            difficultyColor = 'text-rose-400 bg-rose-950/60 border-rose-800/40';
          }

          return (
            <div
              key={res.id}
              className="rounded-xl border border-slate-800/80 bg-[#090f1d] p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-950/20"
            >
              <div className="space-y-3">
                {/* Topic & Difficulty */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Topic:</span>
                    <span className="font-mono text-cyan-400 text-xs font-semibold">
                      {res.topic}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${difficultyColor}`}>
                    {res.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white leading-snug">
                  {res.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {res.shortDesc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions: External Learning Link & View Guide */}
              <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                {/* External learning link */}
                <a
                  href={res.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-900/60 font-semibold transition-colors"
                  title={`Open ${res.title} (external resource)`}
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedResource(res)}
                  className="text-slate-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors font-medium text-[11px]"
                >
                  <span>View Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#090f1d] p-6 text-left shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>Topic: {selectedResource.topic}</span>
                  <span>·</span>
                  <span className="text-slate-400">{selectedResource.difficulty}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedResource.title}</h2>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-5 text-xs text-slate-300 leading-relaxed">
              <div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Overview</h4>
                <p className="text-slate-300">{selectedResource.overview}</p>
              </div>

              {/* External Learning Link banner */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Official / Public Learning Source</span>
                  <span className="text-[11px] text-cyan-300 font-mono truncate block max-w-md">
                    {selectedResource.externalUrl}
                  </span>
                </div>
                <a
                  href={selectedResource.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Code Example */}
              <div>
                <div className="flex items-center justify-between pb-1.5">
                  <span className="text-sm font-semibold text-white">Example Code</span>
                  <button
                    onClick={() => handleCopyCode(selectedResource.codeExample)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:text-white text-[11px]"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#060a12] border border-slate-800 font-mono text-xs overflow-x-auto text-cyan-200 leading-5">
                  {selectedResource.codeExample}
                </pre>
              </div>

              {/* Common Pitfalls */}
              <div>
                <h4 className="text-sm font-semibold text-rose-300 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Common Pitfalls to Avoid</span>
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedResource.commonPitfalls.map((pit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{pit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Practices */}
              <div>
                <h4 className="text-sm font-semibold text-emerald-300 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Recommended Best Practices</span>
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedResource.bestPractices.map((bp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() =>
                  handleOpenInEditor(selectedResource.codeExample, selectedResource.topic)
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Test in Code Editor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
