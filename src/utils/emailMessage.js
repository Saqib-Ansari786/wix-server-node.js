export const forgetPasswordEmailMessage = (resetUrl) => {
  return `<div>
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; padding: 20px;">
    <h2 style="text-align: center; color: #007bff;">Email Verification</h2>
    <p style="text-align: center;">Please click the button below to verify your email:</p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 4px;">Verify Email</a>
    </div>
  </div>
</div>
</div>`;
};

export const verifyEmailMessage = (verifyUrl) => {
  return `<div>
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; padding: 20px;">
    <h2 style="text-align: center; color: #007bff;">Email Verification</h2>
    <p style="text-align: center;">Thank you for signing up! Please click the button below to verify your email:</p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="${verifyUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 4px;">Verify Email</a>
    </div>
  </div>
</div>
</div>`;
};
