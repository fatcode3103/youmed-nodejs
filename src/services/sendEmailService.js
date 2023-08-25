require("dotenv").config();
import nodemailer from "nodemailer";

const sendEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"Sent from youmed's admin 👻" <chuvandat1112003@gmail.com>`, // sender address
        to: `chuvandat1112003@gmail.com, ${data.patient.email}`, // list of receivers
        subject: "Lịch khám mới", // Subject line
        text: "Hello world?", // plain text body
        html:
            data.language === "vi"
                ? `
        <div style="border: 2px solid #26ae5d; border-radius: 10px; padding: 30px;">
            <h2>Xin chào ${data.patient.patientName}</h2>
            <h2 style="color: #26ae5d;">Lịch khám của bạn đã được gửi cho hệ thống của chúng tôi</h2>
            <h3>Vui lòng đọc kĩ lại thông tin dưới đây, sau đó xác nhận đặt lịch khám</h3>
            <div>
                <h4>Thông tin bác sĩ</h4>
                <div>
                    <p>- Ngày khám: ${data.date}</p>
                    <p>- Giờ khám:: ${data.time}</p>
                    <p>- Địa chỉ: ${data.doctor.address}</p>
                    <p>- Bác sĩ: ${data.doctor.doctorName}</p>
                    <p>- Chuyên khoa: ${data.doctor.specialty}</p>
                </div>
                <h4>Thông tin bệnh nhân</h4>
                <div>
                    <p>- Tên bệnh nhân: ${data.patient.patientName}</p>
                    <p>- Số điện thoại: ${data.patient.phoneNumber}</p>
                    <p>- Ghi chú: ${
                        data.note ? data.note : "Không có ghi chú"
                    }</p>
                </div>
            </div>
            <p><b>Lưu ý</b>: Vui lòng có mặt <b>10 phút</b> trước giờ đặt khám và xuất trình xác nhận này cho nhân viên phòng khám hoặc bác sĩ để được phục vụ chu đáo.</p>
            <p>Bạn có thắc mắc? Liên hệ <b>1900 2805</b></p>
            <a href=${data.redirectLink}>Nhấp để xác nhận lịch khám</a>
            <h4 style="color: #26ae5d;">Cảm ơn bạn đã sử dụng dịch vụ của FatCode</h4>
        </div>
        `
                : `
        <div style="border: 2px solid #26ae5d; border-radius: 10px; padding: 30px;">
            <h2>Hello ${data.patient.patientName}</h2>
            <h2 style="color: #26ae5d;">Your appointment has been sent to our system</h2>
            <h3>Please re-read the information below carefully, then confirm your appointment</h3>
            <div>
                <h4>Doctor Information</h4>
                <div>
                    <p>- Day of the examination: ${data.date}</p>
                    <p>- Exam time:: ${data.time}</p>
                    <p>- Address: ${data.doctor.address}</p>
                    <p>- Doctor: ${data.doctor.doctorName}</p>
                    <p>- Specialty: ${data.doctor.specialty}</p>
                </div>
                <h4>Patient information</h4>
                <div>
                    <p>- Patient name: ${data.patient.patientName}</p>
                    <p>- Phone number: ${data.patient.phoneNumber}</p>
                    <p>- Note: ${data.note ? data.note : "No notes"}</p>
                </div>
            </div>
            <p><b>Attention</b>: Please arrive <b>10 minutes</b> before your appointment time and present this confirmation to the clinic staff or doctor for attentive service.</p>
            <p>Do you have questions? Contact <b>1900 2805</b></p>
            <a href=${data.redirectLink}>Click to confirm appointment</a>
            <h4 style="color: #26ae5d;">Thank you for using FatCode's service</h4>
        </div>
        `,
    });
};

export default sendEmail;
