import { motion } from 'motion/react';
import { Github, ExternalLink, Heart, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl text-white">AI for Earth Insights</h3>
            </div>
            
            <p className="text-slate-400 mb-6 max-w-md">
              Empowering environmental analysis through AI-powered satellite image processing. 
              Built for hackathons, designed for impact.
            </p>
            
            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">View on GitHub</span>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 rounded-lg border border-cyan-500/20 hover:border-cyan-500/30 text-cyan-300 hover:text-cyan-200 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Live Demo</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white mb-4">Features</h4>
            <ul className="space-y-2">
              {[
                'Image Classification',
                'NDVI Analysis',
                'Environmental Assessment',
                'Change Detection',
                'Q&A Chatbot'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                'Documentation',
                'API Reference',
                'Sample Images',
                'Tutorials',
                'Support'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { label: 'Processing Speed', value: '~3.4s' },
              { label: 'AI Models', value: '4+' },
              { label: 'Success Rate', value: '95%' },
              { label: 'Supported Formats', value: '10+' },
              { label: 'Analysis Types', value: '6' }
            ].map((stat, index) => (
              <div key={stat.label}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-2xl text-cyan-400 mb-1"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            </motion.div>
            <span>for our planet</span>
          </div>
          
          <div className="text-slate-500 text-sm">
            © 2024 AI for Earth Insights. Built for hackathons.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}