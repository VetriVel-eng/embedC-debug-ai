import { AnalysisResult, LearningResource, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Demo Developer',
  role: 'Beginner • Embedded C Enthusiast',
  bio: 'Learning microcontroller firmware, bare-metal C programming, and hardware debugging.',
  avatarInitials: 'D',
  totalAnalyses: 0,
  issuesDetected: 0,
  fixedIssues: 0,
  learningStreak: 0,
  skills: [
    'C',
    'Embedded C',
    'Code Analysis',
    'Debugging',
    'AI-Assisted Development',
    'Problem Solving',
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'First Analysis',
      description: 'Completed your first code analysis',
      date: 'Oct 3, 2026',
      unlocked: true,
      icon: 'zap',
    },
    {
      id: 'ach-2',
      title: '5 Analyses Completed',
      description: 'Reached 5 total analyses',
      date: 'Oct 5, 2026',
      unlocked: true,
      icon: 'check-circle-2',
    },
    {
      id: 'ach-3',
      title: '3 Day Streak',
      description: 'Analyzed code for 3 consecutive days',
      date: 'Oct 7, 2026',
      unlocked: true,
      icon: 'flame',
    },
    {
      id: 'ach-4',
      title: 'Memory Master',
      description: 'Resolved a critical pointer dereference hazard',
      date: 'Oct 8, 2026',
      unlocked: true,
      icon: 'shield-check',
    },
    {
      id: 'ach-5',
      title: 'Firmware Specialist',
      description: 'Solve 20 embedded peripheral configurations',
      date: 'In Progress',
      unlocked: false,
      icon: 'cpu',
    },
  ],
};

export const INITIAL_HISTORY: AnalysisResult[] = [
  {
    id: 'hist-1',
    timestamp: 'Oct 7, 2026 • 03:24 PM',
    name: 'Pointer error in embedded C',
    language: 'Embedded C',
    summary: 'Detected 2 critical pointer memory access hazards.',
    status: 'error',
    issuesCount: { errors: 1, warnings: 1, suggestions: 0 },
    issues: [
      {
        id: 'iss-h1-1',
        type: 'Null Pointer Dereference',
        severity: 'error',
        line: 6,
        message: "Attempted write to NULL pointer target '*sensor_data = 42'.",
        cause: 'Pointer is initialized to NULL and dereferenced without allocating storage.',
        suggestion: 'Point to a valid memory buffer or stack variable before dereferencing.',
        codeSnippet: '*sensor_data = 42;',
      },
      {
        id: 'iss-h1-2',
        type: 'Unchecked Pointer Arithmetic',
        severity: 'warning',
        line: 8,
        message: 'No boundary check before indexing hardware memory pointer.',
        cause: 'Hardware pointers in bare-metal systems must not exceed the memory-mapped I/O boundary.',
        suggestion: 'Perform bounds assertion to prevent HardFault interrupts.',
        codeSnippet: 'sensor_data++;',
      },
    ],
    originalCode: `#include <stdio.h>

void process_sensor(void) {
    int *sensor_data = NULL;
    *sensor_data = 42;
    sensor_data++;
}`,
    improvedCode: `#include <stdio.h>
#include <stdint.h>

void process_sensor(void) {
    int32_t sensor_buffer = 0;
    int32_t *sensor_data = &sensor_buffer;
    *sensor_data = 42;
    printf("Sensor value: %d\\n", *sensor_data);
}`,
    diffExplanation: 'Replaced NULL pointer dereference with a concrete stack buffer `sensor_buffer` and verified valid memory access.',
    tip: 'In Embedded C, dereferencing a NULL pointer triggers a CPU HardFault or memory management fault exception. Always validate pointers before writing.',
  },
  {
    id: 'hist-2',
    timestamp: 'Oct 6, 2026 • 11:12 AM',
    name: 'UART configuration issue',
    language: 'Embedded C',
    summary: 'Found 1 issue in peripheral initialization registers.',
    status: 'error',
    issuesCount: { errors: 1, warnings: 0, suggestions: 1 },
    issues: [
      {
        id: 'iss-h2-1',
        type: 'Missing Peripheral Enable Bit',
        severity: 'error',
        line: 5,
        message: 'USART2 transmitter enabled (TE) without enabling main USART peripheral (UE bit 13).',
        cause: 'Writing to USART_CR1 bit 3 (TE) only enables the transmitter subsystem. The core USART clock generator remains stopped unless USART_CR1_UE is asserted.',
        suggestion: 'Set bit 13 (USART_CR1_UE) alongside bit 3 (TE).',
        codeSnippet: 'USART2->CR1 |= (1 << 3);',
      },
    ],
    originalCode: `#include "stm32f4xx.h"

void uart_init(void) {
    RCC->APB1ENR |= (1 << 17);
    USART2->CR1 |= (1 << 3);
}`,
    improvedCode: `#include "stm32f4xx.h"

void uart_init(void) {
    RCC->APB1ENR |= (1 << 17);
    // Enable Transmitter (TE, bit 3) and USART Module (UE, bit 13)
    USART2->CR1 |= (1 << 3) | (1 << 13);
}`,
    diffExplanation: 'Enabled both TE and UE bits so the hardware clock receiver/transmitter logic is energized.',
    tip: 'Ensure the clock in RCC->APB1ENR is turned on before configuring control registers.',
  },
  {
    id: 'hist-3',
    timestamp: 'Oct 5, 2026 • 09:45 PM',
    name: 'Missing semicolon',
    language: 'C',
    summary: 'Found 3 syntax issues and undeclared identifiers.',
    status: 'error',
    issuesCount: { errors: 2, warnings: 1, suggestions: 0 },
    issues: [
      {
        id: 'iss-h3-1',
        type: 'Missing Semicolon',
        severity: 'error',
        line: 4,
        message: "Expected ';' before 'return'.",
        cause: 'Statement on line 4 does not terminate with semicolon.',
        suggestion: "Add ';' at the end of statement.",
        codeSnippet: 'int counter = 100',
      },
    ],
    originalCode: `#include <stdio.h>

int main() {
    int counter = 100
    printf("%d", counter);
    return 0;
}`,
    improvedCode: `#include <stdio.h>

int main() {
    int counter = 100;
    printf("%d\\n", counter);
    return 0;
}`,
    diffExplanation: 'Added missing semicolon to terminate statement on line 4.',
    tip: 'C requires semicolons to delimit statements.',
  },
  {
    id: 'hist-4',
    timestamp: 'Oct 4, 2026 • 02:17 PM',
    name: 'Logic error in for loop',
    language: 'C',
    summary: 'Found 1 logic issue: off-by-one boundary condition.',
    status: 'warning',
    issuesCount: { errors: 0, warnings: 1, suggestions: 1 },
    issues: [
      {
        id: 'iss-h4-1',
        type: 'Off-by-One Array Boundary',
        severity: 'warning',
        line: 5,
        message: "Loop condition 'i <= 5' causes out-of-bounds access on array of size 5.",
        cause: "Arrays in C are 0-indexed. An array of size 5 has valid indices 0, 1, 2, 3, and 4. Index 5 accesses out-of-bounds stack memory.",
        suggestion: "Change loop condition from 'i <= 5' to 'i < 5'.",
        codeSnippet: 'for (int i = 0; i <= 5; i++) {',
      },
    ],
    originalCode: `#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    for (int i = 0; i <= 5; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}`,
    improvedCode: `#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    diffExplanation: 'Modified loop condition from `i <= 5` to `i < 5` to prevent buffer overflow.',
    tip: 'Always verify array bounds: an array declared as `type a[N]` has valid indices `0` to `N - 1`.',
  },
  {
    id: 'hist-5',
    timestamp: 'Oct 3, 2026 • 06:32 PM',
    name: 'Variable scope problem',
    language: 'C',
    summary: 'Found 2 issues with variable lifetime and scope.',
    status: 'error',
    issuesCount: { errors: 1, warnings: 1, suggestions: 0 },
    issues: [
      {
        id: 'iss-h5-1',
        type: 'Undefined Variable in Scope',
        severity: 'error',
        line: 8,
        message: "Variable 'result' is used outside the block where it was declared.",
        cause: "'result' was declared inside the if block curly braces, so its lifetime ends when exiting the block.",
        suggestion: 'Declare result before the if block.',
        codeSnippet: 'printf("%d", result);',
      },
    ],
    originalCode: `#include <stdio.h>

int main() {
    int condition = 1;
    if (condition) {
        int result = 42;
    }
    printf("%d", result);
    return 0;
}`,
    improvedCode: `#include <stdio.h>

int main() {
    int condition = 1;
    int result = 0;
    if (condition) {
        result = 42;
    }
    printf("%d\\n", result);
    return 0;
}`,
    diffExplanation: 'Lifted variable `result` declaration to enclosing function scope.',
    tip: 'Block-scoped variables in C are destroyed upon exiting their enclosing braces.',
  },
];

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'c-basics',
    title: 'C Programming Basics',
    category: 'C Programming',
    shortDesc: 'Master syntax, fundamental data types, pointers, conditionals, and standard library conventions.',
    difficulty: 'Beginner',
    tags: ['Variables', 'Pointers', 'Control Flow', 'Functions'],
    readTime: '6 min read',
    overview: 'C is a foundational procedural programming language that gives developers direct access to memory and machine instructions. Unlike high-level languages with garbage collection, C requires explicit memory and type handling.',
    codeExample: `#include <stdio.h>

int main(void) {
    int counter = 0;
    while (counter < 5) {
        printf("Iteration %d\\n", counter);
        counter++;
    }
    return 0;
}`,
    commonPitfalls: [
      'Uninitialized variables containing random stack garbage',
      'Using assignment (=) instead of equality (==) in conditions',
      'Missing break statements in switch cases',
      'Forgetting that string literals in C are null-terminated (require +1 byte for \\0)',
    ],
    bestPractices: [
      'Always compile with -Wall -Wextra -Werror flags',
      'Initialize all variables upon declaration',
      'Prefer explicit return values from functions',
    ],
  },
  {
    id: 'embedded-c-guide',
    title: 'Embedded C Guide',
    category: 'Embedded C',
    shortDesc: 'Direct hardware register manipulation, volatile variables, bitwise masking, and bare-metal structure.',
    difficulty: 'Intermediate',
    tags: ['Registers', 'volatile', 'Bit-Banging', 'Bare-Metal'],
    readTime: '8 min read',
    overview: 'Embedded C extends standard C to run directly on microcontrollers without an operating system. Code interacts directly with memory-mapped I/O (MMIO) registers, interrupts, and clocks.',
    codeExample: `#include <stdint.h>

#define GPIOA_MODER  (*(volatile uint32_t *)0x40020000)
#define GPIOA_ODR    (*(volatile uint32_t *)0x40020014)

void toggle_pin5(void) {
    // Set PA5 as general purpose output (01b)
    GPIOA_MODER |= (1U << 10);
    // Toggle PA5 output bit
    GPIOA_ODR ^= (1U << 5);
}`,
    commonPitfalls: [
      'Omitting the `volatile` qualifier when accessing memory-mapped registers',
      'Writing whole numbers instead of bitwise masks, corrupting adjacent register bits',
      'Modifying peripheral registers before activating the peripheral clock in RCC',
    ],
    bestPractices: [
      'Always use read-modify-write patterns (`|=` and `&= ~`) unless clearing entire register',
      'Use fixed-width integers from `<stdint.h>` exclusively',
      'Encapsulate register addresses using CMSIS header structs',
    ],
  },
  {
    id: 'mcu-basics',
    title: 'Microcontroller Basics',
    category: 'Microcontrollers',
    shortDesc: 'Understand ARM Cortex-M architecture, clock trees, SRAM vs Flash, and reset sequences.',
    difficulty: 'Intermediate',
    tags: ['ARM Cortex-M', 'Flash', 'SRAM', 'Clock Trees'],
    readTime: '7 min read',
    overview: 'A microcontroller integrates CPU, Flash program memory, SRAM, and hardware peripherals (Timers, ADC, UART, SPI) on a single chip. Execution starts from the reset vector address defined in the vector table.',
    codeExample: `// Cortex-M Vector table startup layout
__attribute__((section(".isr_vector")))
const void* const g_pfnVectors[] = {
    &_estack,             // Top of Stack
    Reset_Handler,        // Reset Handler
    NMI_Handler,          // NMI Handler
    HardFault_Handler,    // Hard Fault Handler
};`,
    commonPitfalls: [
      'Stack overflow into SRAM data variables due to deep recursion or large stack buffers',
      'Misconfiguring PLL multipliers causing clock instability or silent lockups',
      'Assuming floating point hardware exists when only software emulation is compiled',
    ],
    bestPractices: [
      'Keep interrupt handlers short; offload heavy processing to main loop or RTOS tasks',
      'Use watchdog timers (IWDG/WWDG) to recover from unanticipated deadlocks',
      'Verify power supply bypass capacitors on MCU VDD pins',
    ],
  },
  {
    id: 'debugging-tips',
    title: 'Embedded Debugging Techniques',
    category: 'Debugging',
    shortDesc: 'Step-by-step strategies for diagnosing HardFaults, bus errors, memory leaks, and logic hangs.',
    difficulty: 'Advanced',
    tags: ['HardFault', 'GDB', 'SWD/JTAG', 'Logic Analyzers'],
    readTime: '10 min read',
    overview: 'Debugging embedded systems requires combining software debugging with hardware observation. SWD (Serial Wire Debug), ITM tracing, and GPIO toggle profiling allow non-intrusive observation.',
    codeExample: `void HardFault_Handler(void) {
    // Read Cortex-M Fault Status Registers
    volatile uint32_t cfsr = SCB->CFSR;
    volatile uint32_t hfsr = SCB->HFSR;
    
    // Check if BFAR contains invalid memory address
    if (cfsr & (1 << 15)) {
        volatile uint32_t fault_addr = SCB->BFAR;
        (void)fault_addr; // Inspect in debugger
    }
    while (1);
}`,
    commonPitfalls: [
      'Using `printf` inside high-speed ISRs, introducing massive timing jitter (Heisenbugs)',
      'Assuming memory is cleared to zero upon power-on reset',
      'Ignoring compiler warnings about uninitialized pointers or type mismatches',
    ],
    bestPractices: [
      'Toggle a spare GPIO pin and measure with an oscilloscope or logic analyzer for nanosecond profiling',
      'Implement a dedicated HardFault handler that dumps SCB register states',
      'Check stack pointer boundaries periodically',
    ],
  },
  {
    id: 'uart-protocol',
    title: 'UART Communication & Driver Design',
    category: 'Hardware Protocols',
    shortDesc: 'Asynchronous serial communication, baud rate calculation, ring buffers, and interrupt reception.',
    difficulty: 'Intermediate',
    tags: ['UART', 'Ring Buffer', 'Baud Rate', 'Interrupts'],
    readTime: '9 min read',
    overview: 'Universal Asynchronous Receiver-Transmitter (UART) is the primary communication channel for microcontroller diagnostics, telemetry, and sensor interfaces. High-reliability systems use circular ring buffers with RX interrupts or DMA.',
    codeExample: `#define RING_BUFFER_SIZE 64
typedef struct {
    uint8_t buffer[RING_BUFFER_SIZE];
    volatile uint16_t head;
    volatile uint16_t tail;
} RingBuffer;

void UART2_IRQHandler(void) {
    if (USART2->SR & (1 << 5)) { // RXNE flag
        uint8_t byte = (uint8_t)(USART2->DR & 0xFF);
        // Push byte into circular ring buffer
    }
}`,
    commonPitfalls: [
      'Baud rate error exceeding 2.5% due to integer truncation in clock divisor registers',
      'Not clearing the RXNE or TC interrupt flags, leading to ISR re-entry locks',
      'Race conditions between interrupt producer and main thread consumer in ring buffers',
    ],
    bestPractices: [
      'Calculate UART BRR using floating point math during compilation (`#define`) with fractional dividers',
      'Use atomic index updates or power-of-two buffer sizes for lock-free circular queues',
      'Consider DMA for continuous high-throughput data streams (>115200 baud)',
    ],
  },
  {
    id: 'spi-i2c-guide',
    title: 'SPI & I2C Bus Communication',
    category: 'Hardware Protocols',
    shortDesc: 'Synchronous serial interfaces: Master/Slave configuration, pull-up resistors, and timing diagrams.',
    difficulty: 'Intermediate',
    tags: ['SPI', 'I2C', 'Sensors', 'Bus Arbitration'],
    readTime: '8 min read',
    overview: 'SPI (Serial Peripheral Interface) offers high-speed full-duplex communication with dedicated Chip Select lines, while I2C (Inter-Integrated Circuit) provides a two-wire shared bus with open-drain signals and 7-bit addressing.',
    codeExample: `// Typical SPI byte transfer
uint8_t spi_transfer(uint8_t data) {
    while (!(SPI1->SR & (1 << 1))); // Wait until TXE (Transmit buffer empty)
    SPI1->DR = data;
    while (!(SPI1->SR & (1 << 0))); // Wait until RXNE (Receive buffer not empty)
    return (uint8_t)SPI1->DR;
}`,
    commonPitfalls: [
      'Missing external pull-up resistors (typically 4.7kΩ) on I2C SDA and SCL lines',
      'I2C bus lockup caused by slave holding SDA low when master resets mid-transaction',
      'Mismatched SPI clock polarity (CPOL) or phase (CPHA) between master and slave device',
    ],
    bestPractices: [
      'Implement an I2C clock recovery pulse routine on startup to free locked slaves',
      'Verify maximum clock frequency supported by the slowest peripheral on the bus',
      'Keep bus traces short and guard against cross-talk',
    ],
  },
];

export const CODE_PRESETS = [
  {
    id: 'sample_undefined',
    title: 'Undefined Variable (Default Sample)',
    language: 'C' as const,
    code: `#include <stdio.h>

int main() {
    int a = 10;
    printf("%d", ptr);
    return 0;
}`,
  },
  {
    id: 'sample_uart',
    title: 'UART Configuration Issue (STM32)',
    language: 'Embedded C' as const,
    code: `#include <stdint.h>
#include "stm32f4xx.h"

void uart2_init(void) {
    RCC->APB1ENR |= (1 << 17); // Enable USART2 clock
    GPIOA->MODER |= (2 << 4);  // Alternate function for PA2 (TX)
    USART2->BRR = 0x0683;      // Baud rate 9600 @ 16MHz
    USART2->CR1 |= (1 << 3);   // Enable TE without UE
}`,
  },
  {
    id: 'sample_pointer',
    title: 'Pointer Error & NULL Dereference',
    language: 'Embedded C' as const,
    code: `#include <stdio.h>

void process_sensor(void) {
    int *sensor_data = NULL;
    *sensor_data = 42;
    sensor_data++;
}`,
  },
  {
    id: 'sample_isr',
    title: 'Missing Volatile in ISR Shared Flag',
    language: 'Embedded C' as const,
    code: `#include <stdint.h>
#include <stdbool.h>

// Shared flag without volatile qualifier
bool flag_ready = false;

void SysTick_Handler(void) {
    flag_ready = true;
}

int main(void) {
    while (!flag_ready) {
        // Optimization may cache flag_ready in register, creating infinite loop
    }
    return 0;
}`,
  },
  {
    id: 'sample_buffer',
    title: 'Loop Logic & Off-By-One',
    language: 'C' as const,
    code: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i <= 5; i++) {
        printf("Index %d = %d\\n", i, arr[i]);
    }
    return 0;
}`,
  },
];
