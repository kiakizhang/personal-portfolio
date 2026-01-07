import { profileData } from '../../data/profile';
import Container from '../Layout/Container';

export default function Hero() {
  const { name, title, tags } = profileData;

  const tagColors: Record<string, string> = {
    blue: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
    green: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
    orange: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
    pink: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30',
  };

  return (
    <section id="about" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center py-12">
          {/* Left: Avatar */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center overflow-hidden">
                 <img src="/personal-portfolio/touxiang.jpg" alt="张琪" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-purple-500 rounded-xl opacity-30 blur-xl"></div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-blue-500 rounded-xl opacity-30 blur-xl"></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Hi, 我是{' '}
              <span className="gradient-text">{name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">{title}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`tag ${tagColors[tag.color] || tagColors.blue}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

