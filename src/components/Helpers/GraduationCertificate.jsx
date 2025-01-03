import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { decryptObjData } from "../../modules/encryption";
const width = 2480;
const height = 3508;

export default function GraduationCertificate({ data }) {
  let teacherdetails, school, udise;
  teacherdetails = decryptObjData("tid");
  school = teacherdetails?.school;
  udise = teacherdetails?.udise;
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = month >= 11 ? today.getFullYear() : today.getFullYear() - 1;
  return (
    <Document
      style={{ margin: 5, padding: 5 }}
      title={`Graduaton Ceremony Certificate of ${school}`}
    >
      {data.map((student, index) => {
        const {
          student_name,
          father_name,
          student_id,
          gender,
          birthdate,
          nclass,
        } = student;
        return (
          <Page size="A4" orientation="landscape" style={styles.page}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                width: "98%",
                padding: 10,
              }}
            >
              <View style={styles.pageMainView}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    width: "95%",
                    height: "95%",
                    borderWidth: 6,
                    borderColor: "#012052",
                  }}
                >
                  <View
                    style={{
                      width: "99%",
                      height: "99%",
                      borderWidth: 4,
                      borderColor: "#012052",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "center",
                        width: "95%",
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/bstext.png`}
                        style={{
                          width: 120,
                          height: "auto",
                        }}
                        alt="bstext"
                      />
                      <Image
                        src={`https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/ssmlogo.png`}
                        style={{
                          width: 120,
                          height: "auto",
                        }}
                        alt="bstext"
                      />
                      <Image
                        src={`https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/edfirst.png`}
                        style={{
                          width: 120,
                          height: "auto",
                        }}
                        alt="bstext"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        textAlign: "center",
                        marginVertical: 5,
                      }}
                    >
                      <Text style={styles.title}>
                        {school?.split("PRIMARY SCHOOL").length > 0
                          ? `${school?.split("PRIMARY SCHOOL")[0]}PRY. SCHOOL`
                          : school}
                      </Text>
                      <Text style={styles.title2}>DISE CODE: {udise}</Text>
                      <Text style={styles.title3}>
                        CIRCLE: AMTA WEST, DISTRICT: HOWRAH
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        textAlign: "center",
                        marginVertical: 10,
                      }}
                    >
                      <Text
                        style={[styles.title, { textDecoration: "underline" }]}
                      >
                        GRADUATION CEREMONY
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginVertical: 1,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={styles.text}>This is to certify that </Text>
                      <View
                        style={{
                          borderBottomWidth: 2,
                          borderBottomStyle: "dotted",
                          width: "40%",
                          marginHorizontal: 2,
                        }}
                      >
                        <Text style={[styles.text, { textAlign: "left" }]}>
                          {student_name}
                        </Text>
                      </View>

                      <Text style={[styles.text, { textAlign: "left" }]}>
                        (Student ID:
                      </Text>
                      <View
                        style={{
                          borderBottomWidth: 2,
                          borderBottomStyle: "dotted",
                          width: "20%",
                          marginHorizontal: 2,
                          marginLeft: 20,
                        }}
                      >
                        <Text style={[styles.text, { textAlign: "left" }]}>
                          {student_id} )
                        </Text>
                      </View>
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        {gender === "BOYS" ? "son of" : "daughter of"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginVertical: 1,
                        paddingHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          borderBottomWidth: 2,
                          borderBottomStyle: "dotted",
                          width: "40%",
                          marginHorizontal: 2,
                        }}
                      >
                        <Text style={[styles.text, { textAlign: "left" }]}>
                          {father_name}
                        </Text>
                      </View>

                      {nclass === 0 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginVertical: 1,
                            padding: 10,
                          }}
                        >
                          <Text style={[styles.text, { textAlign: "left" }]}>
                            has been admitted in this school in
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 2,
                              borderBottomStyle: "dotted",
                              width: "25%",
                              marginHorizontal: 2,
                            }}
                          >
                            <Text style={[styles.text, { textAlign: "left" }]}>
                              PRE PRIMARY
                            </Text>
                          </View>
                          <Text style={[styles.text, { textAlign: "left" }]}>
                            in the year {year}.
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginVertical: 1,
                            padding: 10,
                          }}
                        >
                          <Text style={[styles.text, { textAlign: "left" }]}>
                            has successfully completed
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 2,
                              borderBottomStyle: "dotted",
                              width: "25%",
                              marginHorizontal: 2,
                            }}
                          >
                            <Text style={[styles.text, { textAlign: "left" }]}>
                              {nclass === 1
                                ? "PRE PRIMARY"
                                : nclass === 2
                                ? "CLASS I"
                                : nclass === 3
                                ? "CLASS II"
                                : "CLASS III"}
                            </Text>
                          </View>
                          <Text style={[styles.text, { textAlign: "left" }]}>
                            in the year {year}.
                          </Text>
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginVertical: 1,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        {gender === "BOYS" ? "His " : "Her "}
                      </Text>
                      <Text style={[styles.text, { textAlign: "left" }]}>
                        date of birth is
                      </Text>
                      <View
                        style={{
                          borderBottomWidth: 2,
                          borderBottomStyle: "dotted",
                          width: "14%",
                          marginHorizontal: 2,
                        }}
                      >
                        <Text style={[styles.text]}>{birthdate}.</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginVertical: 1,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text style={[styles.text]}>
                          We welcome her in the new class of this school.
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginVertical: 1,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text style={[styles.text]}>
                          Our heartiest congratulations and best wishes to{" "}
                          {gender === "BOYS" ? "him" : "her"}.
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 40,
                        paddingHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          borderTopWidth: 2,
                          borderTopStyle: "dotted",
                          width: "40%",
                          marginHorizontal: 2,
                        }}
                      >
                        <Text style={[styles.text]}>(Signature of HOI)</Text>
                      </View>
                      <View
                        style={{
                          borderTopWidth: 2,
                          borderTopStyle: "dotted",
                          width: "40%",
                        }}
                      >
                        <Text style={[styles.text]}>
                          (Signature of Class Teacher)
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 40,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text style={[styles.text]}>Date</Text>
                      <View
                        style={{
                          borderBottomWidth: 2,
                          borderBottomStyle: "dotted",
                          width: "25%",
                          marginHorizontal: 2,
                          marginLeft: 20,
                        }}
                      >
                        <Text style={[styles.text]}> </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
}
const styles = StyleSheet.create({
  page: {
    paddingRight: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    paddingRight: 5,
    margin: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "100%",
    height: "98%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    marginVertical: 2,
  },
  title2: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    marginVertical: 2,
  },
  title3: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    marginVertical: 2,
  },
  textBold: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    paddingVertical: 1,
  },
  titleMain: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  text: {
    fontSize: 12.5,
    padding: 1,
    fontFamily: "Times",
    textAlign: "center",
  },
  text2: {
    fontSize: 9,
    padding: 1,
    fontFamily: "Times",
    textAlign: "center",
  },
  text3: {
    fontSize: 12,
    fontFamily: "Algerian",
    textAlign: "center",
    padding: 2,
  },
  text2i: {
    fontSize: 8,
    fontFamily: "TimesItalic",
    textAlign: "center",
    padding: 2,
  },

  text4: {
    fontSize: 8,
    fontFamily: "Times",
    textAlign: "center",
  },
  text5: {
    fontSize: 9,
    fontFamily: "Times",
    textAlign: "center",
  },
  headingView: {
    // border: "1px solid",
    borderWidth: 1,
    width: "100%",
    height: "auto",
  },
  salaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  tableStartView: {
    borderTopWidth: 0,
    borderLeftWidth: 0.5,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  tableStartBorderView: {
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  mainBorderView: {
    borderWidth: 1,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view88H20: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "8.78%",
    height: 20,
  },
  view16: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "16%",
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view16H0: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "16%",
    height: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view10: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  view10H0: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 14,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  SecondView10: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "10%",
    height: 15,
  },
  view5: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingRight: 1,
    width: "5%",
    height: 73,
    justifyContent: "center",
    alignItems: "center",
  },
  view25: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  view50: {
    width: "50%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  view50Center: {
    width: "50%",
    height: 14,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
  },

  rowStartView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0.5,
    padding: 2,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  rowStartBorderView: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    padding: 2,
  },
  rowWrapView: {
    paddingRight: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  rowFlexView: {
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  columnFlexView: {
    paddingRight: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  rowFlexViewEvenly: {
    paddingRight: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  break: {
    borderBottomWidth: 1,
    width: "100%",
    height: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  secondRowView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 5,
  },
});
Font.register({
  family: "Algerian",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Algerian.ttf",
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});
Font.register({
  family: "TimesItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBoldItalic.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arialbd.ttf",
});
