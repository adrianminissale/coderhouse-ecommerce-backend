import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN);

const enviarSMS = async (messaje :any, number :any) => {
  try {
    const response = await client.messages.create({
      body: messaje,
      from: '+19714071392',
      to: number,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default enviarSMS;
