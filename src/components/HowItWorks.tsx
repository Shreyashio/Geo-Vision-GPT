import { motion } from 'motion/react';
import { Upload, Brain, MessageCircle, Download, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Drag and drop your satellite images or browse from your device. Supports multiple formats including TIFF, JPEG, and PNG.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our multi-AI pipeline processes your image using Microsoft DinoV2, Hugging Face models, and vegetation analysis algorithms.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    icon: MessageCircle,
    title: 'Ask Questions',
    description: 'Interact with our AI chatbot to ask specific questions about your satellite image and get detailed insights.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.4
  },
  {
    icon: Download,
    title: 'Get Results',
    description: 'Download comprehensive reports with analysis results, confidence scores, and exportable data in PDF or CSV format.',
    color: 'from-orange-500 to-red-500',
    delay: 0.6
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 border border-cyan-500/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">Simple Process</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get AI-powered insights from your satellite images in just four simple steps
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 origin-left"
              />
              
              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: step.delay }}
                    className="relative"
                  >
                    {/* Step circle */}
                    <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center mb-6">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${step.color} p-2 relative z-10`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Glow effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} opacity-0`}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl text-white mb-3">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </div>

                    {/* Arrow (not for last item) */}
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: step.delay + 0.3 }}
                        className="hidden lg:block absolute top-6 -right-4 z-20"
                      >
                        <ArrowRight className="w-8 h-8 text-slate-500" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: step.delay }}
                className="flex items-start gap-4"
              >
                {/* Step indicator */}
                <div className="flex-shrink-0 relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} p-3`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-12 left-6 w-0.5 h-16 bg-slate-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-lg text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Processing time highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-cyan-300">Average processing time: ~3.4 seconds</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}