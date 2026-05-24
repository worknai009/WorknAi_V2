import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Users, Code, Award, Briefcase, Rocket, Brain, Globe } from 'lucide-react';

const stats = [
  { label: 'Engineers & Staff', value: '50+', icon: Users },
  { label: 'Global Clients', value: '500+', icon: Briefcase },
  { label: 'Courses Offered', value: '10+', icon: Code },
  { label: 'Founded', value: '2025', icon: Award },
];

const services = [
  {
    title: 'IT Training & Institute',
    desc: 'Full Stack (MERN), App Development, Python, Data Science, .NET, PHP — with free 6-month live project internships.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop',
    icon: Code,
  },
  {
    title: 'WorknAi HRMS Platform',
    desc: 'AI-powered face attendance (99.9% accuracy), one-click payroll, GPS geofencing, and workforce management.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop',
    icon: Brain,
  },
  {
    title: 'Custom Software & Apps',
    desc: 'Web & mobile apps, AI chatbots, ERP/CRM systems, and e-commerce platforms tailored for your business.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop',
    icon: Rocket,
  },
  {
    title: 'Digital Marketing',
    desc: 'SEO, social media branding, and automated ad management to grow your brand online.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
    icon: Globe,
  },
];

const founders = [
  {
    name: 'Aman Salim Patel',
    role: 'Co-Founder & Director',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop',
  },
  {
    name: 'Sahil Salim Patel',
    role: 'Co-Founder & Director',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop',
  },
];

const locations = [
  {
    name: 'Corporate Office — Punawale',
    address: 'Office No. 312, 3rd Floor, Sai Millennium, Pune-Mumbai Highway, Jeevan Nagar, Punawale, Pimpri-Chinchwad, Pune - 411033',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop',
  },
  {
    name: 'Talwade Center',
    address: 'Sr No 199, Business Park, behind Jyotiba Mandir, Jyotiba Nagar, Talwade, Pimpri-Chinchwad, Pune - 411062',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop',
  },
];

export default function About() {
  return (
    <div className="text-white">

      {/* Hero */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop"
            alt="team"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 text-sm text-purple-300 mb-6"
          >
            <span>🏢</span> Est. October 2025 · Pune, India
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Building the Future of <br />
            <span className="text-purple-400">Tech & Talent</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            WorknAi Technologies India Pvt Ltd bridges the gap between digital corporate solutions
            and IT academic training — empowering businesses and individuals across Pune and beyond.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-purple-900/40 to-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/50 transition"
            >
              <stat.icon className="mx-auto mb-3 text-purple-400" size={28} />
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="text-purple-400">Mission</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              To empower students, professionals, and businesses through cutting-edge technology
              education, innovative software solutions, and AI-powered enterprise tools — making
              quality tech accessible to everyone in India and beyond.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Since our incorporation in October 2025, we have been on a mission to transform how
              businesses operate and how individuals build their tech careers — one line of code,
              one student, one solution at a time.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop"
              alt="mission"
              className="w-full h-80 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            What We <span className="text-purple-400">Do</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <s.icon className="text-purple-400" size={20} />
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-300">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Meet Our <span className="text-purple-400">Founders</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition"
              >
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{f.name}</h3>
                  <p className="text-purple-400 text-sm mt-1">{f.role}</p>
                  <p className="text-slate-400 text-sm mt-3">
                    Co-founder of WorknAi Technologies India Pvt Ltd, driving innovation
                    in IT education and enterprise software solutions from Pune.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Our <span className="text-purple-400">Locations</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition"
              >
                <img
                  src={loc.img}
                  alt={loc.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-purple-400 mt-1 shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-lg">{loc.name}</h3>
                      <p className="text-slate-400 text-sm mt-1">{loc.address}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Get In <span className="text-purple-400">Touch</span>
          </h2>
          <p className="text-slate-400 mb-10">
            We would love to hear from you. Reach out to us anytime.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a
              href="tel:+919923400442"
              className="flex items-center gap-3 bg-purple-600/20 border border-purple-500/30 rounded-2xl px-8 py-5 hover:bg-purple-600/30 transition"
            >
              <Phone className="text-purple-400" size={22} />
              <span className="text-lg">+91 9923400442</span>
            </a>
            <a
              href="mailto:info@worknai.online"
              className="flex items-center gap-3 bg-purple-600/20 border border-purple-500/30 rounded-2xl px-8 py-5 hover:bg-purple-600/30 transition"
            >
              <Mail className="text-purple-400" size={22} />
              <span className="text-lg">info@worknai.online</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}