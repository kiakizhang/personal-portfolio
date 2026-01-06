import { profileData } from '../../data/profile';
import Container from '../Layout/Container';

export default function Hero() {
  const { name, title, bio, tags } = profileData;

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
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  <span className="text-6xl">👤</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500 rounded-full opacity-30 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-30 blur-xl"></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Hi, 我是{' '}
              <span className="gradient-text">{name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">{title}</p>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">{bio}</p>

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

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                联系我
              </a>
              <a
                href="#career"
                className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-full font-medium hover:border-gray-500 hover:bg-gray-800 transition-all duration-300"
              >
                了解更多
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
