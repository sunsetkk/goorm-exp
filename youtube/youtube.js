
// 검색 기능
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase();
    const videos = document.querySelectorAll(".video-preview");

    videos.forEach(video => {
        const titleElement = video.querySelector(".video-title");
        const title = titleElement.textContent.toLowerCase();

        if (title.includes(query) || query === "") {
            video.style.display = "block";  // 보이게
        } else {
            video.style.display = "none";  // 숨기기
        }
    });
});

// 엔터 키로도 검색 가능하게
searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchButton.click();
    }
});


// 카테고리 별 영상
const categoryButtons = document.querySelectorAll(".category-bar button");
const videos = document.querySelectorAll(".video-preview");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        videos.forEach(video => {
            const categoryAttr = video.getAttribute("data-category") || "";
            const categories = categoryAttr.split(/[\s,]+/); // 공백 또는 쉼표로 구분
            const matches = filter === "all" || categories.includes(filter);

            video.style.display = matches ? "block" : "none";
        });

        // 검색창 비우기
        document.getElementById("search-input").value = "";

        // 버튼 스타일 업데이트
        categoryButtons.forEach(btn => btn.classList.remove("active-category"));
        button.classList.add("active-category");
    });
});

// 처음 로딩 시 "all" 버튼 활성화
document.querySelector('[data-filter="all"]').click();



// 마우스를 썸네일에 올리면 overlay iframe 보이기 & autoplay 켜기
const previews = document.querySelectorAll(".video-preview");

previews.forEach(preview => {
  const thumbnailRow = preview.querySelector(".thumbnail-row");
  const overlay = preview.querySelector(".video-overlay");
  const iframe = overlay?.querySelector("iframe");

  if (thumbnailRow && overlay && iframe) {
    thumbnailRow.addEventListener("mouseenter", () => {
      // autoplay 기능을 위해 src를 다시 설정 (자동재생 파라미터 추가)
      const originalSrc = iframe.src;
      const autoplaySrc = originalSrc.includes("autoplay=1")
        ? originalSrc
        : originalSrc + (originalSrc.includes("?") ? "&autoplay=1" : "?autoplay=1");
      
      iframe.src = autoplaySrc;
      overlay.style.display = "block";
    });

    thumbnailRow.addEventListener("mouseleave", () => {
      // 영상 멈추기 위해 iframe src 초기화
      const cleanSrc = iframe.src.replace(/(&|\?)autoplay=1/, "");
      iframe.src = cleanSrc;
      overlay.style.display = "none";
    });
  }
});

// 각 영상에 랜덤한 시청 퍼센트 표시
document.querySelectorAll(".video-preview").forEach(preview => {
    const progressFill = preview.querySelector(".progress-fill");
    if (progressFill) {
      const randomPercent = Math.floor(Math.random() * 100); // 0~99%
      progressFill.style.width = `${randomPercent}%`;
    }
  });

  // 확장 사이드바
const hamburgerBtn = document.querySelector(".hamburger-btn");
const sidebarFull = document.getElementById("sidebar-full");
const overlay = document.getElementById("overlay");

hamburgerBtn.addEventListener("click", () => {
  sidebarFull.classList.add("show");
  overlay.style.display = "block";
});

overlay.addEventListener("click", () => {
  sidebarFull.classList.remove("show");
  overlay.style.display = "none";
});
