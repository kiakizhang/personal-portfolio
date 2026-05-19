import { profileData } from '../../data/profile';
import type { SocialMediaItem } from '../../data/profile';
import Container from '../Layout/Container';
import { useEffect, useRef } from 'react';

export default function Contact() {
  const { socialMedia } = profileData as { socialMedia: SocialMediaItem[] };
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
      const el = document.getElementById('copy-toast');
      if (el) el.remove();
    };
  }, []);

  const showToast = (message: string) => {
    let el = document.getElementById('copy-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'copy-toast';
      el.className =
        'fixed left-1/2 -translate-x-1/2 bottom-6 px-4 py-2 rounded-full bg-black/80 text-white text-sm shadow-lg z-50';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.style.display = 'block';

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      const toastEl = document.getElementById('copy-toast');
      if (toastEl) toastEl.style.display = 'none';
    }, 3000);
  };

  const copyToClipboard = async (text: string) => {
    // 兼容：某些环境下 clipboard API 可能会卡住（权限弹窗/策略限制），这里做超时保护并提供 fallback
    const tryClipboardApi = async () => {
      if (!navigator.clipboard?.writeText) return null;
      const result = await Promise.race([
        navigator.clipboard.writeText(text).then(() => true).catch(() => false),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 600)),
      ]);
      return result; // true/false/null(timeout)
    };

    const apiResult = await tryClipboardApi();
    if (apiResult === true) return true;
    if (apiResult === false) return false;

    // fallback
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  };

  const handleCardClick = async (social: SocialMediaItem) => {
    const action = social.action;
    if (!action) return;

    if (action.type === 'link') {
      window.open(action.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (action.type === 'copy') {
      // 先给出及时反馈（更符合“点击即提示”），复制结果失败时再补充提示
      showToast(action.toast || '已复制');
      const ok = await copyToClipboard(action.value);
      if (!ok) {
        showToast('复制失败，请手动复制');
      }
    }
  };

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
              onClick={() => handleCardClick(social)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(social);
                }
              }}
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
