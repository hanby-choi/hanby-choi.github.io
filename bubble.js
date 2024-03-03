document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.bubble-background');
  const createBubble = () => {
    const bubbleE1 = document.createElement('span');
    bubbleE1.className = 'bubble';
    const minSize = 50;
    const maxSize = 100;
    const size = Math.random() * (maxSize + 1 - minSize) + minSize;
    bubbleE1.style.width = `${size}px`;
    bubbleE1.style.height = `${size}px`;
    bubbleE1.style.left = Math.random() * innerWidth + 'px';
    section.appendChild(bubbleE1);

    setTimeout(() => {
      bubbleE1.remove();
    }, 8000);
  };

  let activeBubble = null;

  const stopBubble = () => {
    clearInterval(activeBubble);
  };

  const cb = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 사용자가 화면을 보고 있으면
        activeBubble = setInterval(createBubble, 300); // 버블 생성
      } else {
        // 아니면
        stopBubble(); // 버블 모두 삭제
      }
    });
  };

  const options = {
    rootMargin: '100px 0px', // 컨테이너가 화면에 들어가기 100px 앞에서 거품 생성
  };

  const io = new IntersectionObserver(cb, options);
  io.POLL_INTERVAL = 100; // Polyfill
  io.observe(section); // bubble-background, 즉 전체 화면을 관찰
});
