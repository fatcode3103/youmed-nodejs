require("dotenv").config();
import nodemailer from "nodemailer";

const sendEmail = async (data) => {
    console.log("check data to email:>>> ", data);
    const {
        entityInfo,
        redirectLink,
        patientInfo,
        language,
        emailPatient,
        namePatient,
    } = data;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const handleRenderHtmlToEmail = (infoArr) => {
        const arr = infoArr.map((item, index) => {
            return `<p key=${index}>- ${item.label}: ${
                item.value
                    ? item.value
                    : language === "vi"
                    ? "Không có"
                    : "Not available"
            }</p>`;
        });
        return arr.join("");
    };

    await transporter.sendMail({
        from: `"Sent from youmed's admin 👻" <chuvandat1112003@gmail.com>`, // sender address
        to: `chuvandat1112003@gmail.com, ${emailPatient}`, // list of receivers
        subject: "New examination schedule", // Subject line
        text: "YodMed", // plain text body
        html:
            language === "vi"
                ? `
        <div style="border: 2px solid #26ae5d; border-radius: 10px; padding: 30px;">
            <h2>Xin chào ${namePatient}</h2>
            <h2 style="color: #26ae5d;">Lịch khám của bạn đã được gửi cho hệ thống của chúng tôi</h2>
            <h3>Vui lòng đọc kĩ lại thông tin dưới đây, sau đó xác nhận đặt lịch khám</h3>
            <div>
                <h4>Thông tin đăt khám</h4>
                <div>
                    ${handleRenderHtmlToEmail(entityInfo)}
                </div>
                <h4>Thông tin bệnh nhân</h4>
                <div>
                    ${handleRenderHtmlToEmail(patientInfo)}
                </div>
            </div>
            <p><b>Lưu ý</b>: Vui lòng có mặt <b>10 phút</b> trước giờ đặt khám và xuất trình xác nhận này cho nhân viên phòng khám hoặc bác sĩ để được phục vụ chu đáo.</p>
            <p>Bạn có thắc mắc? Liên hệ <b>1900 2805</b></p>
            <a href=${redirectLink}>Nhấp để xác nhận lịch khám</a>
            <h4 style="color: #26ae5d;">Cảm ơn bạn đã sử dụng dịch vụ của FatCode</h4>
        </div>
        `
                : ` 
        <div style="border: 2px solid #26ae5d; border-radius: 10px; padding: 30px;">
            <h2>Welcome ${namePatient}</h2>
            <h2 style="color: #26ae5d;">Your examination schedule has been sent to our system</h2>
            <h3>Please read the information below carefully, then confirm your appointment</h3>
            <div>
                <h4>Booking information</h4>
                <div>
                    ${handleRenderHtmlToEmail(entityInfo)}
                </div>
                <h4>Patient information</h4>
                <div>
                    ${handleRenderHtmlToEmail(patientInfo)}
                </div>
            </div>
            <p><b>Lưu ý</b>: Please arrive <b>10 minutes</b> before your appointment time and present this confirmation to the clinic staff or doctor for attentive service.</p>
            <p>Do you have questions? Contact <b>1900 2805</b></p>
            <a href=${redirectLink}>Click to confirm appointment</a>
            <h4 style="color: #26ae5d;">Thank you for using FatCode's services</h4>
        </div>
        `,
    });
};

export default sendEmail;
