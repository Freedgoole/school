$(document).ready(function() {
  $("ul.header-tabs li").click(function() {
    var tab = $(this).data("tab");
    console.log(tab);
    $(".input-form").removeClass("current");
    $("#" + tab).addClass("current");
  });
  setTimeout(function() {
    $(".input-form_verification").css("opacity", "1");
  }, 800);

  $("#btn-login").on("click", function() {
    var newPassword = $("#password").val();
    sessionStorage.setItem("mypassword", newPassword);
    var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g;
    var m = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
    if ($("#email").val() == "" || $("#password").val() == "") {
      alert("Заполните все поля");
    } else if (!m.test($("#email").val())) {
      alert("ошибка логина");
    } else if (
      $("#password").val().length <= 8 ||
      !r.test($("#password").val())
    ) {
      alert("ошибка пароля");
    } else {
      $.ajax({
        type: "post",
        url: "https://easycode-test-auth-server.herokuapp.com/login",
        headers: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        data: JSON.stringify({
          email: $("#email").val(),
          password: $("#password").val()
        }),
        success: function(data) {
          alert("data");
        },
        error: function() {
          window.location.href = "hamePage.html";
        }
      });
    }
  });

  $("#btn-rgstr").on("click", function() {
    var nameLogin = $("#name-rgstr").val();
    var newPassword = $("#password-rgstr").val();
    sessionStorage.setItem("myKey", nameLogin);
    sessionStorage.setItem("mypassword", newPassword);

    var m = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
    var r = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g;
    if (
      $("#email-rgstr").val() == "" ||
      $("#password-rgstr").val() == "" ||
      $("#name-rgstr").val() == "" ||
      $("#password-rgstr_config").val() == ""
    ) {
      alert("net");
    } else if (!/[a-zA-Z]{3,6}/.test($("#name-rgstr").val())) {
      alert("Name tolko Eng ot 3x");
    } else if (!m.test($("#email-rgstr").val())) {
      alert("ошибка логина");
    } else if (
      $("#password-rgstr").val().length <= 8 ||
      !r.test($("#password-rgstr").val())
    ) {
      alert("ошибка пароля");
    } else if (
      !($("#password-rgstr").val() == $("#password-rgstr_config").val())
    ) {
      alert("пароли не совпадают");
    } else {
      $.ajax({
        type: "POST",
        url: "https://easycode-test-auth-server.herokuapp.com/signup",
        headers: {
          "Content-Type": "application/json"
        },
        dataType: "json",
        data: JSON.stringify({
          email: $("#email-rgstr").val(), //'test@easycode.com',
          password: $("#password-rgstr").val(), //'Easycode1234',
          name: $("#name-rgstr").val() //'examplename'
        }),
        success: function(data) {
          alert("data");
        },
        error: function() {
          window.location.href = "hamePage.html";
        }
      });
    }
  });
  var data = sessionStorage.getItem("myKey");
  var myPassword = sessionStorage.getItem("mypassword");
  $(".span-verification").html(data);
  $(".span-header").html("Hello, " + data);
  $("#btn-veridication").on("click", function() {
    var CorrectPassword = "Easycode1234";
    var passwordVeridication = $("#password-veridication").val();
    if (passwordVeridication == myPassword) {
      $(".input-form_verification").toggle();
      $(".span-header").css("opacity", "1");
      $.get("https://easycode-test-auth-server.herokuapp.com/tasks", function(
        data
      ) {
        console.log(data);
        var title = "";
        $.each(data, function(i, val) {
          title +=
            '<div class="card-task"><h3>' +
            data[i].title +
            "</h3>" +
            "<p>" +
            data[i].description +
            "</p></div>";
        });
        $(".task").html(title);
      });
    } else {
      alert("net");
    }
  });
});
