"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { IndianFormat } from "../../modules/calculatefunctions";
const width = 2480;
const height = 3508;

export default function IncomeTaxOld2025({ data }) {
  const {
    id,
    tname,
    school,
    pan,
    phone,
    disability,
    desig,
    thisYear,
    nextYear,
    prevYear,
    finYear,
    marchSalary,
    marchBasic,
    marchAddl,
    marchDA,
    marchHRA,
    marchMA,
    marchGross,
    marchGPF,
    marchGSLI,
    bonus,
    marchPTax,
    aprilSalary,
    aprilBasic,
    aprilAddl,
    aprilDA,
    aprilHRA,
    aprilMA,
    aprilGross,
    aprilGPF,
    aprilGSLI,
    aprilPTax,
    maySalary,
    mayBasic,
    mayAddl,
    mayDA,
    mayHRA,
    mayMA,
    mayGross,
    mayGPF,
    mayGSLI,
    mayPTax,
    juneSalary,
    juneBasic,
    juneAddl,
    juneDA,
    juneHRA,
    juneMA,
    juneGross,
    juneGPF,
    juneGSLI,
    junePTax,
    julySalary,
    julyBasic,
    julyAddl,
    julyDA,
    aprilIR,
    julyHRA,
    julyMA,
    julyGross,
    julyGPF,
    julyGSLI,
    julyPTax,
    augustSalary,
    augustBasic,
    augustAddl,
    augustDA,
    augustHRA,
    augustMA,
    augustGross,
    augustGPF,
    augustGSLI,
    augustPTax,
    septemberSalary,
    septemberBasic,
    septemberAddl,
    septemberDA,
    septemberHRA,
    septemberMA,
    septemberGross,
    septemberGPF,
    septemberGSLI,
    septemberPTax,
    octoberSalary,
    octoberBasic,
    octoberAddl,
    octoberDA,
    octoberHRA,
    octoberMA,
    octoberGross,
    octoberGPF,
    octoberGSLI,
    octoberPTax,
    novemberSalary,
    novemberBasic,
    novemberAddl,
    novemberDA,
    novemberHRA,
    novemberMA,
    novemberGross,
    novemberGPF,
    novemberGSLI,
    novemberPTax,
    decemberSalary,
    decemberBasic,
    decemberAddl,
    decemberDA,
    decemberHRA,
    decemberMA,
    decemberGross,
    decemberGPF,
    decemberGSLI,
    decemberPTax,
    januarySalary,
    januaryBasic,
    januaryAddl,
    januaryDA,
    januaryHRA,
    januaryMA,
    januaryGross,
    januaryGPF,
    januaryGSLI,
    januaryPTax,
    februarySalary,
    februaryBasic,
    februaryAddl,
    februaryDA,
    februaryHRA,
    februaryMA,
    februaryGross,
    februaryGPF,
    februaryGSLI,
    februaryPTax,
    grossBasic,
    grossAddl,
    grossDA,
    grossHRA,
    grossMA,
    GrossPAY,
    grossGPF,
    grossGSLI,
    grossPTax,
    AllGross,
    TotalGross,
    GrossArrear,
    GrossTotalIncome,
    deductionVIA,
    limitVIA,
    OtherVIA,
    TotalIncome,
    TotalRoundOffIncome,
    CalculatedIT,
    isUnderRebate,
    eduCess,
    AddedEduCess,
    BankInterest,
    teacherDeduction,
    hbLoanPrincipal,
    hbLoanInterest,
    lic,
    ulip,
    ppf,
    nsc,
    nscInterest,
    tutionFee,
    sukanya,
    stampDuty,
    mediclaim,
    terminalDisease,
    handicapTreatment,
    educationLoan,
    charity,
    disabilityDeduction,
    rgSaving,
    otherIncome,
    fd,
    tds,
  } = data;
  return (
    <PDFViewer style={{ width, height }}>
      <Document
        style={{ margin: 5, padding: 5 }}
        title={`IT Statement of ${tname} of ${school}`}
      >
        <Page size="A4" orientation="portrait" style={styles.page}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              width: "95%",
            }}
          >
            <View style={styles.pageMainView}>
              <View style={styles.mainBorderView}>
                <Text
                  style={[styles.titleMain, { textDecoration: "underline" }]}
                >
                  STATEMENT OF INCOME TAX (OLD TAX REGIME)
                </Text>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    { flexDirection: "column", marginTop: 5, borderWidth: 1 },
                  ]}
                >
                  <Text style={styles.text3}>
                    FINANCIAL YEAR {`${prevYear} - ${thisYear}`} (RELEVANT TO
                    ASSESMENT YEAR {finYear})
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    { flexDirection: "column", marginTop: 5, borderWidth: 1 },
                  ]}
                >
                  <Text style={styles.text3}>
                    Howrah District Primary School Council
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginTop: 5,
                      borderWidth: 1,
                      marginBottom: 0,
                    },
                  ]}
                >
                  <View style={{ width: "10%", borderRightWidth: 1 }}>
                    <Text style={styles.text3}>NAME:-</Text>
                  </View>
                  <View style={{ width: "50%", borderRightWidth: 1 }}>
                    <Text style={styles.text3}>{tname}</Text>
                  </View>
                  <View style={{ width: "20%", borderRightWidth: 1 }}>
                    <Text style={styles.text3}>DESIGNATION:-</Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text style={styles.text3}>{desig}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      borderWidth: 0,
                      margin: 0,
                    },
                  ]}
                >
                  <View style={{ width: "50%" }}>
                    <Text style={styles.text3}> </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      borderWidth: 1,
                      borderBottomWidth: 0,
                    }}
                  >
                    <Text
                      style={[
                        styles.text3,
                        { textAlign: "left", paddingLeft: 10 },
                      ]}
                    >
                      PAN NO:- {pan}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      margin: 0,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.text3,
                      { textAlign: "left", paddingLeft: 10 },
                    ]}
                  >
                    NAME OF SCHOOL:- {school}
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      marginTop: 2,
                      borderWidth: 1,
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <Text style={[styles.text3]}>
                    INCOME FROM THE SALARY HEAD
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "5%",
                      height: 80,
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>1</Text>
                  </View>
                  <View
                    style={{
                      width: "70%",
                      borderWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      height: 80,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>a)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Grass Pay & Allowances from March'{prevYear - 2000} to
                          February, {thisYear}
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>
                          Rs. {IndianFormat(TotalGross)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>b)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Arrear Salary if any during the Financial year{" "}
                          {`${prevYear} - ${thisYear}`}
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        {GrossArrear > 0 ? (
                          <Text style={styles.text}>Rs. {GrossArrear}</Text>
                        ) : (
                          <Text style={styles.text}>NIL</Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>c)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Bonus received, if any
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        {bonus > 0 ? (
                          <Text style={styles.text}>Rs. {bonus}</Text>
                        ) : (
                          <Text style={styles.text}>NIL</Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>d)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Honararium / Fees / Commission, if any
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>e)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Total Income ( a + b + c + d )
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>
                          Rs. {IndianFormat(AllGross)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>f)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Less: any overdrawal
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 0,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "10%",
                          borderRightWidth: 1,
                          height: 12,
                        }}
                      >
                        <Text style={styles.text}>g)</Text>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          borderRightWidth: 1,
                          height: 12,
                        }}
                      >
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          TOTAL INCOML FROM SALARY HEAD ( e - f )
                        </Text>
                      </View>
                      <View style={{ width: "20%", height: 12 }}>
                        <Text style={styles.text}>
                          Rs. {IndianFormat(AllGross)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ width: "25%", height: 80 }}>
                    <View
                      style={{
                        width: "100%",
                        height: 68,
                        borderBottomWidth: 1,
                      }}
                    ></View>
                    <Text style={styles.text}>
                      Rs. {IndianFormat(AllGross)}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      marginTop: 2,
                      borderWidth: 1,
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <Text style={[styles.text3]}>INCOME FROM OTHER SOURCES</Text>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "5%",
                      height: 105,
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>2</Text>
                  </View>
                  <View
                    style={{
                      width: "70%",
                      borderWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      height: 105,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>a)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Pension received , if any
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>b)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Interest on NSC
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        {nscInterest > 0 ? (
                          <Text style={styles.text}>Rs. {nscInterest}</Text>
                        ) : (
                          <Text style={styles.text}>NIL</Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>c)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Interest of KVP / MIS etc
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>d)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Bank's Interest , if any ( Savings )
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>
                          Rs. {IndianFormat(BankInterest)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>e)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Bank's Interest , if any ( Not from Savings )
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>f)</Text>
                      </View>
                      <View style={{ width: "70%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Medical Reimbursement
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "10%",
                          borderRightWidth: 1,
                          height: 12,
                        }}
                      >
                        <Text style={styles.text}>g)</Text>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          borderRightWidth: 1,
                          height: 12,
                        }}
                      >
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Transport Allowances
                        </Text>
                      </View>
                      <View style={{ width: "20%", height: 12 }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "10%",
                          borderRightWidth: 1,
                          height: 12,
                        }}
                      >
                        <Text style={styles.text}>h)</Text>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          borderRightWidth: 1,
                          height: 12,
                        }}
                      >
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Others, if any( Please Specify )
                        </Text>
                      </View>
                      <View style={{ width: "20%", height: 12 }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 0,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        TOTAL INCOME FROM OTHER SOURCES
                      </Text>
                    </View>
                  </View>

                  <View style={{ width: "25%", height: 105 }}>
                    <View
                      style={{
                        width: "100%",
                        height: 94,
                        borderBottomWidth: 1,
                      }}
                    ></View>
                    <Text style={styles.text}>
                      Rs. {IndianFormat(BankInterest)}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "5%",

                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>3</Text>
                  </View>
                  <View
                    style={{
                      width: "70%",
                      borderWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        { textAlign: "left", paddingLeft: 2 },
                      ]}
                    >
                      GROSS INCOME
                    </Text>
                  </View>

                  <View style={{ width: "25%" }}>
                    <Text style={styles.text}>
                      Rs. {IndianFormat(AllGross + BankInterest)}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      marginTop: 2,
                      borderWidth: 1,
                      borderBottomWidth: 0,
                      justifyContent: "flex-start",
                      paddingLeft: 5,
                    },
                  ]}
                >
                  <Text style={[styles.text3, { textAlign: "left" }]}>
                    LESS:- HOUSE RENT EXEMPTION U/S 10 ( 13 A ) OF I.T. ACT,
                    1961
                  </Text>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "5%",
                      height: 65,
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>4</Text>
                  </View>
                  <View
                    style={{
                      width: "70%",
                      borderWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      height: 65,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "80%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          H. R. A Received from Employer
                        </Text>
                      </View>
                      <View style={{ width: "10%" }}>
                        <Text style={styles.text}> </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>a)</Text>
                      </View>
                      <View style={{ width: "50%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Actual House Rent Allowance
                        </Text>
                      </View>
                      <View style={{ width: "20%", borderRightWidth: 1 }}>
                        <Text style={styles.text}> </Text>
                      </View>
                      <View style={{ width: "15%" }}>
                        <Text style={styles.text}> </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>b)</Text>
                      </View>
                      <View style={{ width: "50%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          40% of Salary ( For Non Metro City )
                        </Text>
                      </View>
                      <View style={{ width: "20%", borderRightWidth: 1 }}>
                        <Text style={styles.text}> </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}> </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "10%", borderRightWidth: 1 }}>
                        <Text style={styles.text}>c)</Text>
                      </View>
                      <View style={{ width: "50%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Rent Paid over 10% of sotary
                        </Text>
                      </View>
                      <View style={{ width: "20%", borderRightWidth: 1 }}>
                        <Text style={styles.text}> </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={styles.text}> </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "80%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Less :- Lower of the above ( a / b / c ) exempted
                          U/S.10 ( 13 A )
                        </Text>
                      </View>
                      <View style={{ width: "10%" }}>
                        <Text style={styles.text}> </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { textAlign: "left", paddingLeft: 2 },
                        ]}
                      >
                        House Rent Allowance Exempted / Taxable House Rent
                        Allowance
                      </Text>
                    </View>
                  </View>

                  <View style={{ width: "25%", height: 65 }}>
                    <View
                      style={{
                        width: "100%",
                        height: 54,
                        borderBottomWidth: 1,
                      }}
                    ></View>
                    <Text style={styles.text}>NOT APPLICABLE</Text>
                  </View>
                  <View
                    style={{
                      width: 85,
                      height: 1,
                      backgroundColor: "black",
                      transform: "rotate(-30deg)",
                      left: 315,
                      top: 32,
                      position: "absolute",
                    }}
                  ></View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "5%",
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>5</Text>
                  </View>
                  <View
                    style={{
                      width: "95%",
                      borderLeftWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "73.7%", borderRightWidth: 1 }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          BALANCE ( 3 - 4 )
                        </Text>
                      </View>

                      <View style={{ width: "25%" }}>
                        <Text style={styles.text}>
                          Rs. {IndianFormat(AllGross + BankInterest)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.tableStartBorderView2,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "5%",
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>6</Text>
                  </View>
                  <View
                    style={{
                      width: "70%",
                      borderWidth: 1,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: "80%" }}>
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "left", paddingLeft: 2 },
                          ]}
                        >
                          Less : - Conveyance / Washing / N.G. Allowance / any
                          Other Allowance
                        </Text>
                      </View>
                      <View style={{ width: "10%" }}>
                        <Text style={styles.text}>NIL</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 2,
    margin: 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: height,
  },
  pageMainView: {
    padding: 2,
    margin: 2,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "100%",
    height: "98%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
    padding: 2,
  },
  textBold: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "TimesBold",
    textAlign: "center",
  },
  titleMain: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "Arial",
    textAlign: "center",
  },
  text: {
    fontSize: 9,
    fontFamily: "ArialItalic",
    textAlign: "center",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "center",
    padding: 2,
  },
  text3: {
    fontSize: 12,
    fontFamily: "ArialItalic",
    textAlign: "center",
    padding: 2,
  },
  text2i: {
    fontSize: 8,
    fontFamily: "ArialItalic",
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
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  tableStartBorderView2: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    width: "95%",
    height: "auto",
    flexDirection: "row",
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
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/Arial.ttf",
});
Font.register({
  family: "Times",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/times.ttf",
});
Font.register({
  family: "TimesBold",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/timesBold.ttf",
});
Font.register({
  family: "Arial",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/arial.ttf",
});
Font.register({
  family: "ArialItalic",
  src: "https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/ariali.ttf",
});
