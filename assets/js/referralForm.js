const webhookURL = "https://hook.eu2.make.com/0m1cc241jyktf7hlsf2kl4rt81g97ac7";

const form = document.getElementById("referral-form");
const fullName = document.getElementById("name");
const nameError = document.getElementById("nameError");
const mobile = document.getElementById("mobile");
const mobileError = document.getElementById("mobileError");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let isValid = true;

  //   clear previous errors
  nameError.textContent = "";
  mobileError.textContent = "";

const saudiMobileNumberPattern = /^(?:\+966|00966)5\d{8}$/;

  if (fullName.value.trim().length === 0) {
    nameError.textContent = "يرجى إدخال الاسم الأول";
    isValid = false;
  }

  if (mobile.value.trim().length === 0) {
    mobileError.textContent = "يرجى إدخال رقم الجوال";
    isValid = false;
  } else if (!saudiMobileNumberPattern.test(mobile.value.trim())) {
    mobileError.textContent =
      "رقم الجوال غير صالح، الرجاء إدخال رقم سعودي صحيح";
    isValid = false;
  }

  if (!isValid) return;

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("تم إرسال الإحالة بنجاح. شكرًا لمشاركتك");
      form.reset();
    } else {
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى لاحقًا");
    }
  } catch (e) {
    console.log("Error: ", e);
    alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى لاحقًا");
  }
});
