import { motion } from 'motion/react';
import { Card } from './ui/card';
import { 
  Satellite, 
  Leaf, 
  TreePine, 
  MessageSquare, 
  BarChart3, 
  Globe2,
  Zap,
  TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: Satellite,
    title: 'Satellite Image Classification',
    description: 'Advanced AI detects land-use patterns including cropland, water bodies, settlements, and fallow land with high accuracy.',
    color: 'from-blue-500 to-cyan-500',
    bgGlow: 'bg-blue-500/10'
  },
  {
    icon: Leaf,
    title: 'Vegetation Analysis (NDVI)',
    description: 'Compute vegetation health, density, and chlorophyll content using normalized difference vegetation index.',
    color: 'from-green-500 to-emerald-500',
    bgGlow: 'bg-green-500/10'
  },
  {
    icon: Globe2,
    title: 'Environmental Assessment',
    description: 'Generate comprehensive sustainability and climate impact scores based on multi-spectral analysis.',
    color: 'from-purple-500 to-violet-500',
    bgGlow: 'bg-purple-500/10'
  },
  {
    icon: TrendingUp,
    title: 'Temporal Change Detection',
    description: 'Identify changes in land use over time, track urban expansion, vegetation loss, and environmental shifts.',
    color: 'from-orange-500 to-red-500',
    bgGlow: 'bg-orange-500/10'
  },
  {
    icon: MessageSquare,
    title: 'Interactive Q&A Chatbot',
    description: 'Ask natural language questions about uploaded images and get contextual AI-powered answers.',
    color: 'from-cyan-500 to-blue-500',
    bgGlow: 'bg-cyan-500/10'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Multi-AI backend pipeline with confidence scores, detailed metrics, and comprehensive reporting.',
    color: 'from-pink-500 to-rose-500',
    bgGlow: 'bg-pink-500/10'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm">AI-Powered Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Advanced Earth Analysis
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Leverage cutting-edge AI models for comprehensive satellite image analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group hover:bg-slate-800/70 backdrop-blur-sm relative overflow-hidden">
                {/* Glow effect */}
                <div className={`absolute inset-0 ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    className="mt-4 flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm">Learn more</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Zap className="w-4 h-4 ml-2" />
                    </motion.div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'AI Models Integrated', value: '4+' },
            { label: 'Processing Speed', value: '3.4s' },
            { label: 'Accuracy Rate', value: '95%' },
            { label: 'Supported Formats', value: '10+' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}