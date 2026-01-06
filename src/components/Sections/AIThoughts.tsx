import { profileData } from '../../data/profile';
import Container from '../Layout/Container';

export default function AIThoughts() {
  const { aiThoughts } = profileData;

  return (
    <section id="ai-thoughts" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI 思考
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            关于 AI 时代产品设计的一些思考
          </p>
        </div>

        <div className="space-y-6">
          {aiThoughts.map((thought, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💡</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-white">
                    {thought.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {thought.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
