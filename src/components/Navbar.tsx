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
  const pageHeight = doc.internal.pageSize.getHeight();
  let cursorY = 40;

  // === HEADER RECTANGLE ===
  const headerHeight = 100;
  doc.setFillColor("#009966");
  doc.rect(0, cursorY, pageWidth, headerHeight, "F");

  // === LOGO ===
  const imageDataUrl = await loadImageAsDataUrl("/logo.png");
  if (imageDataUrl) {
    const logoSize = 70;
    const logoX = 50;
    const logoY = cursorY + (headerHeight - logoSize) / 2;
    doc.addImage(imageDataUrl, "PNG", logoX, logoY, logoSize, logoSize, undefined, "FAST");
    // Circular border (simulating rounded-full)
    doc.setLineWidth(2);
    doc.setDrawColor(255, 255, 255);
    doc.circle(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, "S");
  }

  // === HEADER TEXT ===
  const textX = 140;
  const titleY = cursorY + 45;
  const subtitleY = cursorY + 70;

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Amrut Homeopathy", textX, titleY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Holistic Healing", textX, subtitleY);

  cursorY += headerHeight + 40; // move below header

  // === RECEIPT TITLE ===
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Appointment Receipt", pageWidth / 2, cursorY, { align: "center" });
  cursorY += 25;

  // === TOKEN ID ===
  doc.setFontSize(16);
  doc.text(`Token ID: ${data.token}`, pageWidth / 2, cursorY, { align: "center" });
  cursorY += 35;

  // === DETAILS SECTION ===
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const leftX = 60;
  const labelGap = 130;
  const lineGap = 22;
  const details: [string, string][] = [
    ["Full Name", data.name],
    ["Mobile", data.mobile],
    ["Email", data.email || "-"],
    ["Appointment Date", data.date],
    ["Preferred Time", data.time],
    ["Primary Concern", data.concern],
    ["Patient Type", data.type],
    ["Additional Message", data.message || "-"],
  ];

  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, leftX, cursorY);
    doc.setFont("helvetica", "normal");
    const wrapped = doc.splitTextToSize(value, pageWidth - leftX - labelGap - 40);
    doc.text(wrapped, leftX + labelGap, cursorY);
    cursorY += Math.max(lineGap, wrapped.length * 14);
  });

  // === FOOTER ===
  const footerY = pageHeight - 40;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text("Amrut Homeopathy – Thank you for booking!", pageWidth / 2, footerY, { align: "center" });

  doc.save(`Amrut_Appointment_${data.token}.pdf`);
}
