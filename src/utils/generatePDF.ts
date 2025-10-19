import jsPDF from "jspdf";

export type ReceiptData = {
  token: string;
  name: string;
  mobile: string;
  email?: string;
  date: string;
  time: string;
  concern: string;
  type: string;
  message?: string;
};

async function loadImageAsDataUrl(path: string): Promise<string> {
  const resp = await fetch(path);
  const blob = await resp.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generatePDF(data: ReceiptData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 50;
  let cursorY = 60;

  // 🟢 Header: Clinic Banner
  const imageDataUrl = await loadImageAsDataUrl("/8f9c4327-7957-4864-8f02-2c8ede57b4e7.png");
  if (imageDataUrl) {
    const imgWidth = pageWidth - marginX * 2;
    const imgHeight = (imgWidth * 180) / 720; // maintain logo proportions
    doc.addImage(imageDataUrl, "PNG", marginX, cursorY, imgWidth, imgHeight);
    cursorY += imgHeight + 30;
  }

  // 🏷️ Title + Token
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(25, 90, 50);
  doc.text("Amrut Homeopathy - Appointment Receipt", pageWidth / 2, cursorY, { align: "center" });
  cursorY += 28;

  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text(`Token ID: ${data.token}`, pageWidth / 2, cursorY, { align: "center" });
  cursorY += 30;

  // Divider Line
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(1);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 30;

  // 📋 Appointment Details
  const fields: Array<[string, string]> = [
    ["Full Name", data.name],
    ["Mobile", data.mobile],
    ["Email", data.email || "-"],
    ["Appointment Date", data.date],
    ["Preferred Time", data.time],
    ["Primary Concern", data.concern],
    ["Patient Type", data.type],
    ["Additional Message", data.message || "-"]
  ];

  const labelColor = [0, 100, 0];
  const valueColor = [0, 0, 0];

  fields.forEach(([label, value]) => {
    doc.setFontSize(12);
    doc.setTextColor(...labelColor);
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, marginX, cursorY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...valueColor);
    const wrapped = doc.splitTextToSize(value, pageWidth - marginX * 2 - 100);
    doc.text(wrapped, marginX + 130, cursorY);
    cursorY += Math.max(20, wrapped.length * 14);
  });

  cursorY += 20;
  doc.setDrawColor(0, 120, 0);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 40;

  // 🩺 Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(60, 100, 60);
  doc.text("Thank you for booking with Amrut Homeopathy.", pageWidth / 2, cursorY, { align: "center" });

  cursorY += 16;
  doc.setTextColor(90, 90, 90);
  doc.text("A pathway to holistic healing…", pageWidth / 2, cursorY, { align: "center" });

  // 💾 Save the file
  doc.save(`Amrut_Appointment_${data.token}.pdf`);
}
