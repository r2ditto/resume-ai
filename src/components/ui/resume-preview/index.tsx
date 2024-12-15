import React from "react";
import dynamic from "next/dynamic";
import { Document, Page, View, Text as PdfText } from "@react-pdf/renderer";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function ResumePreview({ resumeData }: { resumeData: any }) {
  return (
    <>
      <PDFViewer>
        <Document>
          <Page size="A4" style={{ border: "none" }}>
            <View>
              <PdfText>
                First Name: {resumeData?.personal_info?.firstName}
              </PdfText>
              <PdfText>
                Last Name: {resumeData?.personal_info?.lastName}
              </PdfText>
              <PdfText>
                Job Title: {resumeData?.personal_info?.jobTitle}
              </PdfText>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}
