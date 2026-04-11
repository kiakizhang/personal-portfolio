import { profileData } from '../../data/profile';
import Container from '../Layout/Container';

export default function Activities() {
  const { activities } = profileData;

  const typeColors: Record<string, string> = {
    主办: 'bg-blue-500/20 text-blue-300',
    演讲: 'bg-purple-500/20 text-purple-300',
    参与: 'bg-green-500/20 text-green-300',
    "组织并演讲": 'bg-purple-500/20 text-purple-300',
    "领奖并演讲": 'bg-orange-500/20 text-orange-300',
  };

  return (
    <section id="activities" className="py-20 bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="section-title">活动经历</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            积极参与行业交流，分享与学习并行
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="card overflow-hidden group hover:scale-105 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${typeColors[activity.type] || 'bg-gray-700 text-gray-300'}`}>
                  {activity.type}
                </span>
                <span className="text-xs text-gray-500">{activity.date}</span>
              </div>
              
              <h3 className="font-semibold text-white mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
