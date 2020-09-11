var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
  if (ua.indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}



if(window.navigator.userAgent.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

var UAString = navigator.userAgent;
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}


$(document).ready(function () {

  var bLazy = new Blazy({
    src: 'data-blazy' // Default is data-src
  });


  $('#menu-btn').click(function () {
    $(this).closest('header').toggleClass('menu-open');
    $('body').toggleClass('oh');
  });

  $(document).on('click', function (e) {
    if($(e.target).closest('.header.menu-open').length === 0 && $('.header.menu-open').length > 0 && $(e.target).closest('#menu-btn').length === 0) {
      $('.header').removeClass('menu-open');
      $('body').removeClass('oh');
    }
  });

  $('.nav__item-arrow').click(function (e) {
    $(this).parent('.parent').toggleClass('open');
  });

  if($(document).width() < 992){
    $('.nav__triangle').click(function (e) {
      $(this).closest('.nav__item').toggleClass('open');
    });
  }
  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top < 150) {
      $(".header").removeClass('scroll');
    } else {
      $(".header").addClass('scroll');
    }
  });

  // checking browser for WEBP
  hasWebP().then(function () {

    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var webp = $(this).data('webp');
        $(this).attr('data-blazy', webp);
      });
    } else {
      $('.webp-img').each(function () {
        var webp;
        if($(this).data('webp-mobile') !== undefined)
          webp = $(this).data('webp-mobile'); else webp = $(this).data('webp');
        console.log($(this).data('webp-mobile'));
        $(this).attr('data-blazy', webp);
      });
    }

    bLazy.revalidate();

  }, function () {
    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var img = $(this).data('img');
        $(this).attr('data-blazy', img);
      });
    } else {
      $('.webp-img').each(function () {
        var img;
        if($(this).data('img-mobile') !== undefined)
          img = $(this).data('img-mobile'); else img = $(this).data('img');
        $(this).attr('data-blazy', img);
      });
    }

    bLazy.revalidate();
  });

  $('.phone').inputmask("+38 (999) 999-99-99");


  /*popups start*/
  $(document).on('click', 'a[data-modal-class]', function (e) {
    e.preventDefault();
    var dataModalId = $(this).attr('data-modal-class');
    $('.popup.' + dataModalId + '').addClass('open');
    // $('body').addClass('oh');
    setTimeout(function () {
      bLazy.revalidate();
    },500)
  });

  $(document).on('click', '.popup__close', function (e) {
    $('.popup ').removeClass('open');
    // $('body').removeClass('oh');
  });

  $(document).on('click', '.popup', function (e) {
    if(e.target.classList[0] == "popup") {
      $('.popup ').removeClass('open');
      // $('body').removeClass('oh');
    }
  });
  /*popups end*/

  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top < 1) {
      $(".header").removeClass('scroll');
    } else {
      $(".header").addClass('scroll');
    }
  });

  /*validation start*/

  $('form .site-form__btn-i').click(function (e) {
    e.preventDefault();

    if($(this).closest('form').find('input[type="tel"]').length != 0) {
      var inputTel = $(this).closest('form').find('input[type="tel"]');
      if (inputTel.val().indexOf('_') === -1 && inputTel.val() != 0) {
        $(inputTel).closest('.site-form__input').addClass('correct');
        $(inputTel).closest('.site-form__input').removeClass('error-field');
      } else {
        $(inputTel).closest('.site-form__input').addClass('error-field');
        $(inputTel).closest('.site-form__input').removeClass('correct');
      }
    }

    if($(this).closest('form').find('input[type="email"]').length != 0) {
      var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

      var input = $(this).closest('form').find('input[type="email"]');
      var email = $(this).closest('form').find('input[type="email"]').length > 0
        ? $(this).closest('form').find('input[type="email"]')
        : false;


      if (email.val() == "" && email !== false) {
        email.closest('.site-form__input').addClass('error-field');

      } else {
        if (reg.test(email.val()) == false) {
          email.closest('.site-form__input').addClass('error-field');
          email.closest('.site-form__input').removeClass('correct');

        } else {
          email.closest('.site-form__input').addClass('correct');
          email.closest('.site-form__input').removeClass('error-field');
        }
      }
    }

  });

  var menuSlider = new Swiper('.menu-slider-js', {
    // Optional parameters
    autoHeight: true, //enable auto height
    loop: false,

    // Navigation arrows
    navigation: {
      nextEl: '.custom-button-next',
      prevEl: '.custom-button-prev',
    },

    calculateHeight:true,

  })


  $(document).on('click', '[data-tab-nav]', function (e) {
    e.preventDefault();
    var tab = $(this).attr('data-tab-nav');
    var content = $(this).closest('.menu__body-item').find('[data-tab-content="'+ tab +'"]');

    $(this).closest('.menu__body-item').find('[data-tab-nav]').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.menu__body-item').find('[data-tab-content]').removeClass('active');
    $(content).addClass('active');

    menuSlider.updateAutoHeight(300);

  })

  $(document).on('click', '.menu__item-btn-i', function (e) {
    e.preventDefault();
    $(this).toggleClass('menu__item-btn-i--added');
  })


  if($('[data-tab-card-content]').length > 0){

    $('.active[data-tab-card-content]').slideToggle();

    $(document).on('click', '[data-tab-card]', function (e) {
      e.preventDefault();
      var tab = $(this).attr('data-tab-card');
      $('[data-tab-card]').removeClass('active');
      $(this).addClass('active');
      $('.active[data-tab-card-content]').slideToggle();
      $('.active[data-tab-card-content]').removeClass('active');
      setTimeout(function () {
        $('[data-tab-card-content="'+ tab + '"]').slideToggle();
        $('[data-tab-card-content="'+ tab + '"]').addClass('active');
      },300);
    })
  }


  // basket-count
  $(document).on('click', '.basket-count button', function (e) {
    var value = $(this).siblings('input').val();

    console.log('')
    if($(this).hasClass('minus')){
      value--;
      $(this).siblings('input').val(value);
    } else {
      value++;
      $(this).siblings('input').val(value);
    }
  });

  (function($){
    $(window).on("load",function(){
      $(".top-basket-scroll-js").mCustomScrollbar({
        axis:"x",
        theme:"light-3",
        autoHideScrollbar: true
      });
    });
  })(jQuery);


});


//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();

