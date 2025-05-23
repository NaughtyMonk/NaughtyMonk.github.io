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
