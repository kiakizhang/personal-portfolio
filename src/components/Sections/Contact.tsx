import { profileData } from '../../data/profile';
import Container from '../Layout/Container';

export default function Contact() {
  const { socialMedia } = profileData;

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="section-title">联系我</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            欢迎通过以下方式与我交流
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {socialMedia.map((social, index) => (
            <div
              key={index}
              className="card text-center group hover:scale-105 hover:-translate-y-1 cursor-pointer"
            >
              {/* QR Code */}
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-700 rounded-xl overflow-hidden">
                <img 
                  src={social.qrCode} 
                  alt={social.platform} 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="font-semibold text-white mb-1">
                {social.platform}
              </h3>
              <p className="text-gray-400 text-xs">
                {social.description}
              </p>
            </div>
          ))}
        </div>

        {/* Email contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">或者发送邮件至</p>
          <a
            href="mailto:2947983142@qq.com"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            2947983142@qq.com
          </a>
        </div>
      </Container>
    </section>
  );
}

