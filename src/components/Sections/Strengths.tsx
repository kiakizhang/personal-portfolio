import { profileData } from '../../data/profile';
import Container from '../Layout/Container';

export default function Strengths() {
  const { strengths } = profileData;

  return (
    <section id="strengths" className="py-20 bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="section-title">核心优势</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            多年产品经验沉淀，形成独特的产品方法论
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="card group hover:scale-105 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {strength.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
