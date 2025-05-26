/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}



		
	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

$(function () {
  let logoShown = false;

  $('#logo').on('mouseenter', function () {
    if (!logoShown) {
      const $logoText = $('#mylogo');

      // Принудительно "заставим" браузер распознать начальное состояние
      $logoText.removeClass('visible'); // сбросим на всякий случай
      void $logoText[0].offsetWidth;    // форсируем reflow

      // Добавим класс с задержкой, чтобы переход сработал плавно
      setTimeout(() => {
        $logoText.addClass('visible');
      }, 50);

      logoShown = true;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.project-block').forEach(block => {
    const toggleElements = block.querySelectorAll('.show-more-less');
    const details = block.querySelector('.project-details');
    const button = block.querySelector('.toggle-link');
    const videoContainer = details.querySelector('.video-container');
    const videoURL = 'https://www.youtube.com/embed/qY4rypue8ZY?si=ahU0vYXpo_BDgU4A';

    toggleElements.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();

        const isHidden = details.classList.contains('hidden');

        // Переключаем видимость блока
        details.classList.toggle('hidden');

        // Вставка или удаление iframe
        if (!isHidden) {
          videoContainer.innerHTML = '';
        } else {
          videoContainer.innerHTML = `
            <iframe width="560" height="315"
              src="${videoURL}"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        }

        // Меняем текст
        if (button) {
          button.textContent = isHidden ? 'Show less' : 'Show more';
        }

        // Переключаем класс стрелки
        toggleElements.forEach(te => {
          te.classList.toggle('expanded', isHidden); // true → добавит, false → уберёт
        });
      });
    });
  });
});

// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".parent").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".slide"));
    const leftBtn = carousel.querySelector(".left");
    const rightBtn = carousel.querySelector(".right");
    const progressBar = carousel.querySelector(".autoProgressBar");
    const svgCircles = carousel.querySelectorAll("svg circle");

    let curIndex = 0;
    let sliding = false;
    let click = true;
    let isHovered = false;
    let intervalId;

    function updateSlides() {
      slides.forEach((slide, i) => {
        if (i === curIndex) {
          slide.classList.add("up1");
        } else {
          slide.classList.remove("up1");
        }
      });
    }

    function animateSVG(direction) {
      const circleIds = Array.from(svgCircles).map(c => c.id);
      const isLeft = direction === "left";

      svgCircles.forEach((circle) => {
        const id = circle.id.replace("circle", "");
        const num = parseInt(id);
        if ((isLeft && num >= 1 && num <= 9) || (!isLeft && num >= 10 && num <= 18)) {
          circle.classList.remove("steap");
          circle.classList.add("streak");
        }
      });

      setTimeout(() => {
        svgCircles.forEach((circle) => {
          circle.classList.remove("streak");
          circle.classList.add("steap");
        });
      }, 850);
    }

    function slideLeft() {
      if (!click) return;
      click = false;
      curIndex = (curIndex - 1 + slides.length) % slides.length;
      updateSlides();
      animateSVG("left");
      setTimeout(() => (click = true), 1700);
    }

    function slideRight() {
      if (!click) return;
      click = false;
      curIndex = (curIndex + 1) % slides.length;
      updateSlides();
      animateSVG("right");
      setTimeout(() => (click = true), 1700);
    }

    function startAutoSlide() {
      if (!progressBar) return;

      resetProgressBar();

      intervalId = setInterval(() => {
        if (!isHovered && click) {
          slideRight();
          resetProgressBar();
        }
      }, 5000);
    }

		function stopAutoSlide() {
		clearInterval(intervalId);
		if (progressBar) {
			// Позволим прогрессбару плавно откатиться назад
			progressBar.style.transition = "width 0.5s ease";
			progressBar.style.width = "0%";
		}
		}


    function resetProgressBar() {
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      setTimeout(() => {
        progressBar.style.transition = "width 5s linear";
        progressBar.style.width = "100%";
      }, 50);
    }

    // EVENTS
    leftBtn?.addEventListener("click", slideLeft);
    rightBtn?.addEventListener("click", slideRight);

    carousel.addEventListener("mouseenter", () => {
      isHovered = true;
      stopAutoSlide();
    });

    carousel.addEventListener("mouseleave", () => {
      isHovered = false;
      startAutoSlide();
    });

    // Initialize
    updateSlides();
    startAutoSlide();
  });
});

 //-------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById('main-image');
  const thumbs = document.querySelectorAll('.thumbnails-track img');
  const thumbTrack = document.querySelector('.thumbnails-track');
  const thumbPrev = document.querySelector('.thumbnail-carousel-wrapper .arrow-btn.prev');
const thumbNext = document.querySelector('.thumbnail-carousel-wrapper .arrow-btn.next');
  const navPrev = document.querySelector('.main-image-wrapper .arrow-btn.prev');
	const navNext = document.querySelector('.main-image-wrapper .arrow-btn.next');


  let currentIndex = 0;
  let thumbScroll = 0;

  function showImage(index) {
    currentIndex = index;
    mainImage.src = thumbs[index].src;
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbs[index].classList.add('active');
  }

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => showImage(i));
  });

  navPrev.addEventListener('click', () => {
    if (currentIndex > 0) showImage(currentIndex - 1);
  });

  navNext.addEventListener('click', () => {
    if (currentIndex < thumbs.length - 1) showImage(currentIndex + 1);
  });

  const scrollAmount = 170;
  thumbNext.addEventListener('click', () => {
    thumbScroll += scrollAmount;
    thumbTrack.style.transform = `translateX(-${thumbScroll}px)`;
  });

  thumbPrev.addEventListener('click', () => {
    thumbScroll -= scrollAmount;
    if (thumbScroll < 0) thumbScroll = 0;
    thumbTrack.style.transform = `translateX(-${thumbScroll}px)`;
  });

  showImage(0);
});

// ============ Полноэкранный режим с переключением ============


document.addEventListener("DOMContentLoaded", () => {
	let curpage = 1;
	let sliding = false;
	let click = true;
	let pagePrefix = "slide";
	let transitionPrefix = "circle";
	let svg = true;

	const left = document.getElementById("left");
	const right = document.getElementById("right");

	// Получаем общее количество слайдов динамически
	const totalSlides = document.querySelectorAll(`[id^="${pagePrefix}"]`).length;

	function leftSlide() {
		if (click) {
			if (curpage == 1) curpage = totalSlides + 1;
			sliding = true;
			curpage--;
			svg = true;
			click = false;

			for (let k = 1; k <= totalSlides; k++) {
				const a1 = document.getElementById(pagePrefix + k);
				if (a1) a1.classList.add("tran");
			}

			setTimeout(() => move(), 200);

			setTimeout(() => {
				for (let k = 1; k <= totalSlides; k++) {
					const a1 = document.getElementById(pagePrefix + k);
					if (a1) a1.classList.remove("tran");
				}
			}, 1400);
		}
	}

	function rightSlide() {
		if (click) {
			if (curpage == totalSlides) curpage = 0;
			sliding = true;
			curpage++;
			svg = false;
			click = false;

			for (let k = 1; k <= totalSlides; k++) {
				const a1 = document.getElementById(pagePrefix + k);
				if (a1) a1.classList.add("tran");
			}

			setTimeout(() => move(), 200);

			setTimeout(() => {
				for (let k = 1; k <= totalSlides; k++) {
					const a1 = document.getElementById(pagePrefix + k);
					if (a1) a1.classList.remove("tran");
				}
			}, 1400);
		}
	}

	function move() {
		if (sliding) {
			sliding = false;

			const start = svg ? 1 : 10;
			const end = svg ? 9 : 18;
			for (let j = start; j <= end; j++) {
				const c = document.getElementById(transitionPrefix + j);
				if (c) {
					c.classList.remove("steap");
					c.setAttribute("class", `${transitionPrefix}${j} streak`);
				}
			}

			setTimeout(() => {
				for (let i = 1; i <= totalSlides; i++) {
					const slide = document.getElementById(pagePrefix + i);
					if (!slide) continue;
					if (i === curpage) {
						slide.classList.add("up1");
					} else {
						slide.classList.remove("up1");
					}
				}
				sliding = true;
			}, 600);

			setTimeout(() => {
				for (let j = start; j <= end; j++) {
					const c = document.getElementById(transitionPrefix + j);
					if (c) {
						c.classList.remove("streak");
						c.setAttribute("class", `${transitionPrefix}${j} steap`);
					}
				}
			}, 850);

			setTimeout(() => {
				click = true;
			}, 1700);
		}
	}

	left?.addEventListener("mousedown", leftSlide);
	right?.addEventListener("mousedown", rightSlide);


// === ПОЛНОЭКРАННЫЙ РЕЖИМ ===
const slideElements = Array.from(document.querySelectorAll(`[id^='slide']`));
const imageUrls = slideElements.map(slide => {
	return slide.tagName === 'IMG' ? slide.src : null;
});


let fullscreenIndex = 0;

function openFullscreen(index) {
	fullscreenIndex = index;

	const overlay = document.createElement('div');
	overlay.id = 'fullscreenOverlay';
	Object.assign(overlay.style, {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(0,0,0,0.95)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10000,
		cursor: 'default'
	});

	const img = document.createElement('img');
	img.src = imageUrls[fullscreenIndex];
	Object.assign(img.style, {
		maxWidth: '90vw',
		maxHeight: '90vh',
		objectFit: 'contain',
		pointerEvents: 'none',
		transition: 'opacity 0.3s ease'
	});
	overlay.appendChild(img);

	// Левая зона
	const left = document.createElement('div');
	Object.assign(left.style, {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '30%',
		height: '100%',
		cursor: 'pointer',
		background: 'linear-gradient(to right, rgba(217, 255, 3, 0.1), transparent)',
		zIndex: 10001
	});
	left.onmouseenter = () => left.style.background = 'linear-gradient(to right, rgba(255, 215, 0, 0.6), transparent)';
	left.onmouseleave = () => left.style.background = 'linear-gradient(to right, rgba(217, 255, 3, 0.1), transparent)';
	left.onclick = () => {
		fullscreenIndex = (fullscreenIndex - 1 + imageUrls.length) % imageUrls.length;
		img.src = imageUrls[fullscreenIndex];
	};

	// Правая зона
	const right = document.createElement('div');
	Object.assign(right.style, {
		position: 'absolute',
		right: 0,
		top: 0,
		width: '30%',
		height: '100%',
		cursor: 'pointer',
		background: 'linear-gradient(to left, rgba(217, 255, 3, 0.1), transparent)',
		zIndex: 10001
	});
	right.onmouseenter = () => right.style.background = 'linear-gradient(to left, rgba(255, 215, 0, 0.6), transparent)';
	right.onmouseleave = () => right.style.background = 'linear-gradient(to left, rgba(217, 255, 3, 0.1), transparent)';
	right.onclick = () => {
		fullscreenIndex = (fullscreenIndex + 1) % imageUrls.length;
		img.src = imageUrls[fullscreenIndex];
	};

	// Центр — закрытие
	const center = document.createElement('div');
	Object.assign(center.style, {
		position: 'absolute',
		left: '30%',
		width: '40%',
		top: 0,
		height: '100%',
		cursor: 'default',
		zIndex: 10001
	});
	center.onclick = () => document.body.removeChild(overlay);

	overlay.appendChild(left);
	overlay.appendChild(right);
	overlay.appendChild(center);
	document.body.appendChild(overlay);
}

// Назначаем клик по каждому слайду
slideElements.forEach((slide, idx) => {
	slide.addEventListener('click', () => {
		openFullscreen(idx);
	});
});

	document.addEventListener("keydown", e => {
		if (e.key === "ArrowLeft") leftSlide();
		if (e.key === "ArrowRight") rightSlide();
	});
});


