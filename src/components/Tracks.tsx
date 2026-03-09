import { motion } from 'motion/react';
import { ArrowRight, Laptop, Hammer, Scissors, Calculator } from 'lucide-react';

const tracks = [
  {
    id: 1,
    title: 'Digital Technology',
    description: 'Web development, data analysis, and digital marketing skills.',
    image: 'https://images.unsplash.com/photo-1684337399050-0412ebed8005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc29mdHdhcmUlMjBkZXZlbG9wZXIlMjBsYXB0b3B8ZW58MXx8fHwxNzcyNDgyNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Laptop,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 2,
    title: 'Construction Services',
    description: 'Carpentry, plumbing, electrical installation and masonry works.',
    image: 'https://images.unsplash.com/photo-1688240817677-d28b8e232dd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXJwZW50ZXIlMjB3b3Jrc2hvcCUyMGFmcmljYW58ZW58MXx8fHwxNzcyNDgyNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Hammer,
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 3,
    title: 'Fashion & Design',
    description: 'Professional tailoring, fashion design and textile management.',
    image: 'https://images.unsplash.com/photo-1744808336885-c6b2425c3f1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduJTIwc2V3aW5nJTIwYWZyaWNhbnxlbnwxfHx8fDE3NzI0ODI2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Scissors,
    color: 'bg-purple-100 text-purple-700'
  }
];

export function Tracks() {
  return (
    <section id="tracks" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Tracks</h2>
            <p className="text-gray-600 text-lg">Choose your pathway to sustainable livelihood. Select the track that best fits your interests and career goals.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors z-10" />
                <img 
                  src={track.image} 
                  alt={track.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-4 right-4 p-2 rounded-xl ${track.color} z-20 shadow-sm`}>
                  <track.icon className="w-6 h-6" />
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{track.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{track.description}</p>
                <button className="w-full py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold group-hover:bg-green-700 group-hover:text-white group-hover:border-green-700 transition-all flex items-center justify-center gap-2">
                  View Curriculum
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
