import { profileData } from '../../data/profile';
import type { CareerItem } from '../../data/profile';
import Container from '../Layout/Container';
import { CareerFlowField } from '../Effects';
import { useEffect, useMemo, useState } from 'react';

export default function Career() {
  const { career } = profileData as { career: CareerItem[] };
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const coarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
    const smallScreen = window.matchMedia?.('(max-width: 767px)')?.matches ?? false;
    setIsMobile(coarsePointer || smallScreen);
  }, []);

  const items = useMemo(
    () =>
      career.map((item, index) => ({
        item,
        index,
        // 交互方向：左侧卡片（偶数）从右侧滑入详情；右侧卡片（奇数）从左侧滑入详情
        enterFrom: index % 2 === 0 ? 'right' : 'left',
      })),
    [career]
  );

  return (
    <section id="career" className="py-20 bg-gray-900 career-starry-bg relative overflow-hidden">
      {/* 星空（CSS）+ Flow Field（Canvas）：仅作用于职业历程板块；canvas 不拦截鼠标/点击 */}
      <CareerFlowField className="absolute inset-0 pointer-events-none z-0" />
      <Container>
        <div className="text-center mb-12 relative z-10">
          <h2 className="section-title">职业历程</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            一路成长，不断探索产品的更多可能
          </p>
        </div>

        <div className="relative z-10">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

          <div className="space-y-8">
            {items.map(({ item, index, enterFrom }) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  {/* Desktop: hover/focus 滑出详情；Mobile: 手风琴 */}
                  {isMobile ? (
                    <div className="card inline-block w-full max-w-md text-left">
                      <button
                        type="button"
                        className="w-full text-left"
                        onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                        aria-expanded={openIndex === index}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center text-2xl">
                            🏢
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{item.company}</h3>
                            <p className="text-sm text-gray-400">{item.role}</p>
                          </div>
                          <div className="text-gray-400">
                            <svg
                              className={`w-5 h-5 transition-transform duration-200 ${
                                openIndex === index ? 'rotate-180' : ''
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>

                        {item.subline ? (
                          <p className="text-gray-300 text-xs leading-relaxed mb-2">
                            {item.subline}
                          </p>
                        ) : null}
                        <p className="text-xs text-gray-500">{item.period}</p>
                      </button>

                      {openIndex === index ? (
                        <div className="mt-4 pt-4 border-t border-gray-700/60">
                          {item.techStack ? (
                            <p className="text-gray-400 text-xs leading-relaxed mb-3">
                              <span className="text-gray-300">技术关键：</span>
                              {item.techStack}
                            </p>
                          ) : null}

                          {item.highlights?.length ? (
                            <ul className="text-gray-300 text-sm space-y-2 list-disc pl-5">
                              {item.highlights.map((h, i) => (
                                <li key={i} className="leading-relaxed">
                                  {h}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div
                      className={`career-swipe-card card inline-block max-w-md text-left relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                        enterFrom === 'left' ? 'career-enter-left' : 'career-enter-right'
                      }`}
                      tabIndex={0}
                    >
                      {/* Summary */}
                      <div className="career-card-summary">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center text-2xl">
                            🏢
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{item.company}</h3>
                            <p className="text-sm text-gray-400">{item.role}</p>
                          </div>
                        </div>

                        {item.subline ? (
                          <p className="text-gray-300 text-xs leading-relaxed mb-2">
                            {item.subline}
                          </p>
                        ) : null}
                        <p className="text-xs text-gray-500">{item.period}</p>
                      </div>

                      {/* Detail */}
                      <div className="career-card-detail">
                        <div className="pt-1">
                        {item.techStack ? (
                          <p className="text-gray-400 text-xs leading-relaxed mb-3">
                            <span className="text-gray-300">技术关键：</span>
                            {item.techStack}
                          </p>
                        ) : null}

                        {item.highlights?.length ? (
                          <ul className="text-gray-300 text-sm space-y-2 list-disc pl-5">
                            {item.highlights.map((h, i) => (
                              <li key={i} className="leading-relaxed">
                                {h}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        </div>
                      </div>
                    </div>
                  )}
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
