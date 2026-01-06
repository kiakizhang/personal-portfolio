import { profileData } from '../../data/profile';
import Container from '../Layout/Container';

export default function Career() {
  const { career } = profileData;

  return (
    <section id="career" className="py-20 bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="section-title">职业历程</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            一路成长，不断探索产品的更多可能
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

          <div className="space-y-8">
            {career.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="card inline-block max-w-md">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center text-2xl">
                        🏢
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.company}</h3>
                        <p className="text-sm text-gray-400">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{item.period}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-gray-900 shadow-lg hidden md:block"></div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
