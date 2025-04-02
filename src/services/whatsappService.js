// const axios = require('axios');

// const sendWhatsAppNotification = async (phoneNumber, message) => {
//   try {
//     if (!phoneNumber || !message) {
//       throw new Error("Phone number and message are required.");
//     }

//     console.log(`📤 Sending WhatsApp notification to ${phoneNumber}...`);
//     console.log("API Key:", process.env.DOUBLETICK_API_KEY);

//     const options = {
//       method: 'POST',
//       url: 'https://public.doubletick.io/whatsapp/message/text',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.DOUBLETICK_API_KEY}`,
//       },
//       data: {
//         phone: phoneNumber,
//         body: message,
//       },
//       timeout: 10000, // 10-second timeout
//     };

//     const response = await axios.request(options);

//     if (response.data?.sent) {
//       console.log(`✅ WhatsApp notification sent to ${phoneNumber}`);
//       return response.data;
//     } else {
//       console.error(`❌ Failed to send WhatsApp message:`, response.data);
//       return null;
//     }
//   } catch (error) {
//     console.error("❗ Error sending WhatsApp notification:", error.response?.data || error.message);
//     return null;
//   }
// };

// module.exports = { sendWhatsAppNotification };
