import axios from "axios";

async function signUp() {
  const api_endpoint = "http://127.0.0.1:8000/customers";
  const payload = {
    Firstname: "pavan",
    Lastname: "kumar",
    Phonenumber: "7693999999",
    Gender: "male",
    MailID: "pavan.kumar@sams.com",
    DOB: "2000-02-26",
  };

  try {
    const response = await axios.post(api_endpoint, payload);
    if (response.status === 200 || response.status === 201) {
      console.log("✅ Sign up successful:", response.data);
    } else {
      console.error("❌ Sign up failed:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("❌ Error occurred:", error.response?.data || error.message);
  }
}

signUp();