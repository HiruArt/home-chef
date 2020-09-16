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


  /*popups start*/
  $(document).on('click', '[data-modal-class]', function (e) {
    e.preventDefault();
    var dataModalId = $(this).attr('data-modal-class');
    $('.popup.' + dataModalId + '').addClass('open');
  });

  $(document).on('click', '.popup__close', function (e) {
    $('.popup ').removeClass('open');
  });

  $(document).on('click', '.popup', function (e) {
    if(e.target.classList[0] == "popup") {
      $('.popup ').removeClass('open');
    }
  });
  /*popups end*/

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


    $(document).on('click', '[data-tab-card]', function (e) {
      e.preventDefault();
      var tab = $(this).attr('data-tab-card');
      $('[data-tab-card]').removeClass('active');
      $(this).addClass('active');
      // $('.active[data-tab-card-content]').slideToggle();
      $('.active[data-tab-card-content]').removeClass('active');
      $('[data-tab-card-content="'+ tab + '"]').addClass('active');
    })
  }


  // basket-count
  $(document).on('click', '.basket-count button', function (e) {
    var value = $(this).siblings('input').val();

    if($(this).hasClass('minus')){
      if ($(this).siblings('input').val() <= 0){
        $(this).siblings('input').val(0);
      } else{
        value--;
        $(this).siblings('input').val(value);
      }
    } else {
      value++;
      $(this).siblings('input').val(value);
    }
  });

  // (function($){
  //   $(window).on("load",function(){
  //     $(".top-basket-scroll-js").mCustomScrollbar({
  //       axis:"x",
  //       theme:"light-3",
  //       autoHideScrollbar: true
  //     });
  //   });
  // })(jQuery);

  (function($){
    $(window).on("load",function(){
      $(".cart-scroll-js").mCustomScrollbar({
        axis:"y",
        theme:"light-3",
      });
    });
  })(jQuery);

  $('#cartDate, #cartTime, #country').selectmenu();

  $('.phonemask').inputmask("+380 (99) 999-99-99");
  $('.cardmask').inputmask("9999 9999 9999 9999");
  $('.mmmymask').inputmask("99/99");


  /*validation start*/

  function validateForm (that) {

    that.closest('.cart__personal-step').find('input[type="text"].required').each(function () {
      if($(this).val() === ''){
        $(this).closest('.site-form__input').addClass('error-field');
        $(this).closest('.site-form__input').removeClass('correct');
      } else {
        $(this).closest('.site-form__input').addClass('correct');
        $(this).closest('.site-form__input').removeClass('error-field');
      }
    });

    if (that.closest('.cart__personal-step').find('input[type="tel"].required').length != 0) {
      var inputTel = that.closest('form').find('input[type="tel"].required');
      if (inputTel.val().indexOf('_') === -1 && inputTel.val() != 0) {
        $(inputTel).closest('.site-form__input').addClass('correct');
        $(inputTel).closest('.site-form__input').removeClass('error-field');
      } else {
        $(inputTel).closest('.site-form__input').addClass('error-field');
        $(inputTel).closest('.site-form__input').removeClass('correct');
      }
    }

    if(that.closest('.cart__personal-step').find('input.required').length > 0) {
      if (that.closest('.cart__personal-step').find('.error-field').length == 0 && that.closest('form').find('.correct').length > 0) {
        return true;
      }
    } else {
      return true;
    }

  }

  $(document).on('click', '.personal-step-btn-js', function (e) {
    e.preventDefault();

    var that = $(this);
    var tabActuel = $(this).closest('[data-personal-step]').attr('data-personal-step');

    if(validateForm(that)) {
      $(document).find('.cart__personal-step').removeClass('active');
      $(this).closest('[data-personal-step]').next().addClass('active');

      var ofsetPersonalCart = $('#cartPersonal').offset().top;

      if($(window).width() > 992) {
        jQuery('html,body').animate({scrollTop: ofsetPersonalCart - 50}, 300);
      } else {
        jQuery('html,body').animate({scrollTop: ofsetPersonalCart - 150 }, 300);
      }

      $('[data-personal-tab]').each(function () {
        if($(this).data('personal-tab') == tabActuel){
          $(this).addClass('check')
          $(this).next().addClass('active');
        }
      });
    }

  });
  $(document).on('click', '#sendForm', function (e) {
    e.preventDefault();
    window.location.href = './order.html';
  });

  $(document).on('click', '.back-link-js', function (e) {
    var tabActuel = $(this).closest('[data-personal-step]').attr('data-personal-step');

    $(document).find('.cart__personal-step').removeClass('active');
    $(this).closest('[data-personal-step]').prev().addClass('active');

    var ofsetPersonalCart = $('#cartPersonal').offset().top;

    if($(window).width() > 992) {
      jQuery('html,body').animate({scrollTop: ofsetPersonalCart - 50}, 300);
    } else {
      jQuery('html,body').animate({scrollTop: ofsetPersonalCart - 150 }, 300);
    }

    $('[data-personal-tab]').each(function () {
      if($(this).data('personal-tab') == tabActuel){
        $(this).removeClass('active')
        $(this).removeClass('check')
        $(this).prev().addClass('active');
        $(this).prev().removeClass('check');
      }
    });

  });

});

