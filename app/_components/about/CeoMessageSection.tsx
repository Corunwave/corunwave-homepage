/* CEO greeting "드리는 말씀" (preview .ceo-section; Figma 640:20145 / 640:22153). Static server component. */
const CeoMessageSection = () => {
  return (
    <section className="ceo-section" aria-labelledby="ceo-title">
      <div className="ceo-inner">
        <h2 id="ceo-title" className="ceo-title">
          드리는 말씀
        </h2>
        <div className="ceo-message">
          <div className="ceo-letter">
            <p>안녕하십니까,</p>
            <p>
              기술은 빠르게 진보하지만 그 기술이 실제 비즈니스 가치로 전환되는
              과정은 결코 단일한 해답으로 완성되지 않습니다.
            </p>
            <p>
              현재의 기업들은 AI와 데이터가 주도하는 혁신의 시대 속에서 안정적인
              AI 인프라 구축과 기술을 사람의 역량으로 내재화해야 하는 과제에
              직면해 있고 이러한 복잡한 비즈니스 난제들은 특정 솔루션이나 단일
              기업의 역량만으로는 해결하기 어려운 다층적인 도전입니다.
            </p>
            <p>
              코런웨이브는 글로벌 기업의 교육기획 및 IT 서비스 경험을 통해
              비즈니스는 결코 혼자 하는 것이 아니며 다양한 분야의 전문가와
              파트너들의 긴밀한 협력(Cooperation)을 통해 비로소 더 큰 시너지를
              창출할 수 있음을 경험했습니다.
            </p>
            <p>
              초기 창업기업으로서 저희는 유연함과 민첩성을 강점으로 특정
              레퍼런스나 솔루션에 얽매이지 않고, 고객의 복잡한 난제를 해결하기
              위한 가장 적합한 전문가와 솔루션을 연결하고 상생협력을 조율하는{" "}
              <span className="ceo-keep">‘비즈니스 허브’</span> 역할을
              수행하고자 하며, 현업 필드에서 체득한 통찰력을 바탕으로 기술이
              사람의 가능성을 확장하고 비즈니스 시너지를 극대화하는 해답을 고객
              및 파트너와 함께 설계하고 실행해 나가겠습니다.
            </p>
            <p>
              코런웨이브가 추구하는 비즈니스 여정은 단순히 서비스를 제공하는
              공급자를 넘어 고객과 함께 달리는(Run) 페이스메이커이자 조직의
              변화를 이끄는 작은 물결(Wave)의 시작점이 되겠습니다.
              <br />
              코런웨이브의 전문성이 고객의 가능성과 만날 때 일어날 혁신적인
              변화, 그 여정에 여러분을 초대합니다.
            </p>
          </div>
          <div className="ceo-signoff">
            <p className="ceo-role">코런웨이브(주) 대표이사</p>
            <p className="ceo-name">윤준용</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoMessageSection;
