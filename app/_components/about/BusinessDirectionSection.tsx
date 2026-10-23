import Image from "next/image";
import type { ReactNode } from "react";

const DIRECTION_VALUES: { title: string; body: ReactNode }[] = [
  {
    title: "Human-Centric Tech",
    body: (
      <>
        기술 도입(Infra)에 그치지 않고 교육(Learning)을 통해 사람이 주도하는{" "}
        <span className="direction-keep">휴먼 인프라 혁신을</span> 지향합니다.
      </>
    ),
  },
  {
    title: "Integrated Value",
    body: (
      <>
        인프라 설계부터 운영과 조달,인재 육성에 이르기까지{" "}
        <span className="direction-keep">단절 없는</span>{" "}
        <span className="direction-keep">End-to-End 서비스 가치를</span>{" "}
        창출합니다.
      </>
    ),
  },
  {
    title: "Sustainable Growth",
    body: (
      <>
        각분야 전문가와의 협업을 통해 급변하는 트렌드에 가장 민첩하게 대응하며{" "}
        <span className="direction-keep">고객과 동반 성장하겠습니다.</span>
      </>
    ),
  },
];

/* Business direction "사업 방향성" (preview .business-direction; Figma 653:20134 / 653:20160). Static server component. */
const BusinessDirectionSection = () => {
  return (
    <section className="direction-section" aria-labelledby="direction-title">
      <div className="direction-inner">
        <div className="direction-composition">
          <header className="direction-copy">
            <h2 id="direction-title" className="direction-title">
              <span className="direction-title-line direction-title-line--first">
                <span className="direction-phrase">고객과 함께</span>{" "}
                <span className="direction-phrase">기술과 사람의</span>{" "}
                <span className="direction-phrase">선순환을 이끄는</span>
              </span>{" "}
              <span className="direction-title-line direction-title-line--last">
                <span className="direction-phrase">지능형 AX</span>{" "}
                <span className="direction-phrase">오케스트레이터</span>
              </span>
            </h2>
            <p className="direction-description">
              단순한 서비스 공급자가 아닌 기술과 교육을 융합하고 전문가 네트워크를
              연결해 시장의 격차를 해소하는{" "}
              <span className="direction-keep">
                <strong>“솔루션 허브”</strong> 가 되겠습니다
              </span>
            </p>
          </header>
          <div className="direction-visual" aria-hidden="true">
            <Image
              className="direction-art"
              src="/images/company/business-direction-hub.svg"
              width={704}
              height={420}
              alt=""
            />
            <p className="direction-hub">솔루션 허브</p>
          </div>
        </div>
        <div className="direction-connectors" aria-hidden="true">
          <span className="direction-trunk" />
          <span className="direction-branch direction-branch--0" />
          <span className="direction-branch direction-branch--1" />
          <span className="direction-branch direction-branch--2" />
        </div>
        <div className="direction-values">
          {DIRECTION_VALUES.map(({ title, body }) => (
            <article key={title} className="direction-value">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessDirectionSection;
