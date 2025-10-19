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
  // Attempt to load as given (webp); jsPDF addImage supports webp in recent versions
  try {
    const resp = await fetch(path);
    const blob = await resp.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn("Failed loading image:", e);
    return "";
  }
}

export async function generatePDF(data: ReceiptData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  let cursorY = 40;

  // Header image
  const imageDataUrl = await loadImageAsDataUrl("/g8.webp");
  if (imageDataUrl) {
    // Fit width keeping aspect ratio; assume approx 3:1 banner height if unknown
    const imgWidth = pageWidth - 80;
    const imgHeight = 120;
    doc.addImage(imageDataUrl, "WEBP", 40, cursorY, imgWidth, imgHeight);
    cursorY += imgHeight + 20;
  }

  // Title and token
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Amrut Homeopathy - Appointment Receipt", pageWidth / 2, cursorY, { align: "center" });
  cursorY += 26;

  doc.setFontSize(20);
  doc.setTextColor(30, 30, 30);
  doc.text(`Token ID: ${data.token}`, pageWidth / 2, cursorY, { align: "center" });
  cursorY += 24;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  const lineGap = 18;
  const leftX = 60;

  const lines: Array<[string, string]> = [
    ["Full Name", data.name],
    ["Mobile", data.mobile],
    ["Email", data.email || "-"],
    ["Appointment Date", data.date],
    ["Preferred Time", data.time],
    ["Primary Concern", data.concern],
    ["Patient Type", data.type],
    ["Additional Message", data.message || "-"]
  ];

  lines.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, leftX, cursorY);
    doc.setFont("helvetica", "normal");
    const maxTextWidth = pageWidth - leftX - 60;
    const wrapped = doc.splitTextToSize(value, maxTextWidth);
    doc.text(wrapped, leftX + 130, cursorY);
    cursorY += Math.max(lineGap, wrapped.length * 14 + 4);
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 40;
  doc.setFont("helvetica", "italic");
  doc.setTextColor(80, 80, 80);
  doc.text("Amrut Homeopathy – Thank you for booking!", pageWidth / 2, footerY, { align: "center" });

  doc.save(`Amrut_Appointment_${data.token}.pdf`);
}
