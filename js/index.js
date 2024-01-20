$("#username-inp").on("input", async function () {
  console.log("user - ", $(this).val());
  let inputVal = $(this).val();

  if (inputVal) {
    getUserDetails(inputVal);
    // const res = await fetch(`https://api.github.com/users/${inputVal}`);
    // console.log(res);
    // if (res.status === 200) {
    //   const data = await res.json();
    //   console.log(data);
    // } else {
    //   $(".username-err").text("Not Found. Please enter valid username");
    // }
  }
});

const showLoader = function (className, hideClass) {
  if (className) {
    $(`.${className}`).append(
      "<div class='loader d-flex justify-content-center'>\
        <div class='spinner-border text-info' role='status'>\
          <span class='visually-hidden'>Loading...</span>\
        </div>\
      </div>"
    );
  }
  if (hideClass) {
    $(`.${hideClass}`).hide();
  }
};

const hideLoader = function (className, showClass) {
  if (className) {
    $(`.${className}`).find(".loader").remove();
  }
  if (showClass) {
    $(`.${showClass}`).show();
  }
};

const prepareUserData = function (user) {};
const getUserDetails = function (userName) {
  $(".username-err").text("");
  showLoader("user-loader", "username");
  if (userName) {
    $.ajax({
      url: `https://api.github.com/users/${userName}`,
      method: "GET",
    })
      .done(function (response) {
        console.log(response);
        prepareUserData(response);
        window.location.href = "user.html";
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        $(".username-err").text(errorThrown);
      })
      .always(function () {
        hideLoader("user-loader");
      });
  }
};
