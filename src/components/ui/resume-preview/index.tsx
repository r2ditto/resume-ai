import React from "react";
import {
  Document,
  Page,
  View,
  Text as PdfText,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 200,
  },
  resumeHeading: {
    fontSize: 20,
    fontWeight: "bold",
    display: "flex",
  },
});

// TODO: document re-computation can be an expensive operation
export default function ResumePreview({ resumeData }: { resumeData: any }) {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.body}>
          <View>
            <PdfText style={styles.resumeHeading}>
              {`${resumeData?.personal_info?.firstName} ${resumeData?.personal_info?.lastName}`}
            </PdfText>
            <PdfText>{resumeData?.personal_info?.jobTitle}</PdfText>
          </View>
        </Page>
      </Document>
    </>
  );
}
