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
    nameError.textContent = "الإسم مطلوب";
    isValid = false;
  }

  if (email.value.trim().length === 0) {
    emailError.textContent = "البريد الإلكتروني مطلوب";
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    emailError.textContent = "يرجى إدخال بريد إلكتروني صالح";
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
    console.log("Error: ", e);
    alert("حصل خطء ما");
  }
});
