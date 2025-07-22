const webhookURL = "https://hook.eu2.make.com/0m1cc241jyktf7hlsf2kl4rt81g97ac7";

const form = document.getElementById("referral-form");
const fullName = document.getElementById("name");
const nameError = document.getElementById("nameError");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let isValid = true;

  //   clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fullName.value.trim().length === 0) {
    nameError.textContent = "يرجى إدخال الاسم الكامل";
    isValid = false;
  }

  if (email.value.trim().length === 0) {
    emailError.textContent = "يرجى إدخال البريد الإلكتروني";
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    emailError.textContent = "صيغة البريد الإلكتروني غير صحيحة";
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
