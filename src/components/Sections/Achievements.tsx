import { profileData } from '../../data/profile';
import Container from '../Layout/Container';

export default function Achievements() {
  const { achievements } = profileData;

  return (
    <section id="achievements" className="py-20 bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="section-title">荣誉成就</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            每一个成就都是成长路上的里程碑
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="card text-center group hover:scale-105 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-blue-400 font-medium mb-2">
                {achievement.year}
              </p>
              <p className="text-gray-400 text-sm">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
