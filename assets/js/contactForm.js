const webhookURL = "https://hook.eu2.make.com/kyiyyf4oe33kiymf4jw4xhrpga1cwdq2";

const form = document.getElementById("contact-form");
const fullName = document.getElementById("name");
const nameError = document.getElementById("nameError");
const mobile = document.getElementById("mobile");
const mobileError = document.getElementById("mobileError");
const category = document.getElementById("category");
const categoryError = document.getElementById("categoryError");
const message = document.getElementById("message");
const messageError = document.getElementById("messageError");

const saudiMobileNumberPattern = /^(?:\+966|00966)?5\d{8}$/;

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Clear previous Errors
  nameError.textContent = "";
  mobileError.textContent = "";
  categoryError.textContent = "";
  messageError.textContent = "";

  // Validations
  let isValid = true;
  if (fullName.value.trim().length === 0) {
    nameError.textContent = "الإسم مطلوب";
    isValid = false;
  }

  if (mobile.value.trim().length === 0) {
    mobileError.textContent = "رقم الجوال مطلوب";
    isValid = false;
  } else if (!saudiMobileNumberPattern.test(mobile.value.trim())) {
    mobileError.textContent = "يرجى إدخال رقم جوال سعودي صالح";
    isValid = false;
  }

  if (category.value.trim().length === 0) {
    categoryError.textContent = "التصنيف مطلوب";
    isValid = false;
  }

  if (message.value.trim().length === 0) {
    messageError.textContent = "الرسالة مطلوبة";
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
      alert("تم الإرسال بنجاح");
      form.reset();
    } else {
      alert("حصل خطء ما");
    }
  } catch (e) {
    console.log("error: ", e);
    alert("حصل خطء ما");
  }
});
