import ropa from "../modules/ropa";
import React, { useEffect } from "react";
import { useGlobalContext } from "../context/Store";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  NumInWords,
  GetMonthName,
  printDate,
} from "../modules/calculatefunctions";
const PaySlipOSMS = () => {
  const { state } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state !== "admin") {
      navigate("/logout");
    }
  });
  const [searchParams] = useSearchParams();
  let details = JSON.parse(searchParams.get("details"));
  let tname,
    desig,
    school,
    disability,
    empid,
    pan,
    basic,
    mbasic,
    addl,
    da,
    hra,
    ma,
    gross,
    gpf,
    ptax,
    gsli,
    udise,
    bank,
    account,
    ifsc;

  tname = details.tname;
  desig = details.desig;
  school = details.school;
  disability = details.disability;
  empid = details.empid;
  pan = details.pan;
  basic = parseInt(details.basic);
  mbasic = parseInt(details.mbasic);
  addl = parseInt(details.addl);
  ma = parseInt(details.ma);
  gpf = parseInt(details.gpf);
  gsli = parseInt(details.gsli);
  udise = details.udise;
  bank = details.bank;
  account = details.account;
  ifsc = details.ifsc;

  let netpay;

  let basicpay;

  let today = new Date();
  let date = new Date();

  let junelast = new Date(`${date.getFullYear()}-07-31`);

  if (today >= junelast) {
    basicpay = basic;
  } else {
    basicpay = mbasic;
  }
  let level = ropa(basicpay).lv;
  let cell = ropa(basicpay).ce;
  let dapercent = 6 / 100;
  let hrapercent = 12 / 100;

  da = Math.round(basicpay * dapercent);
  hra = Math.round(basicpay * hrapercent);

  gross = basicpay + da + hra + addl + ma;

  if (gross > 40000) {
    ptax = 200;
  } else if (gross > 25000) {
    ptax = 150;
  } else if (gross > 15000) {
    ptax = 130;
  } else if (gross > 10000) {
    ptax = 110;
  } else {
    ptax = 0;
  }

  if (disability === "YES") {
    ptax = 0;
  }

  let deduction = gsli + gpf + ptax;

  netpay = gross - deduction;

  let lastmonth = GetMonthName(today.getMonth() - 1);

  useEffect(() => {
    document.title = `PAYSLIP OF ${tname.toUpperCase()} OF ${school.toUpperCase()} FOR THE MONTH OF ${lastmonth.toUpperCase()}`;

    document.querySelector(
      ".containermain"
    ).innerHTML = `<div class="main" style="zoom: 1.3;">
            <div class="top" style="
  font-size: smaller;
  
  margin: 10px auto;
  ">
                <div>
                    <img class="img2"  src="https://firebasestorage.googleapis.com/v0/b/awwbtpta.appspot.com/o/images%2Fiosms.png?alt=media&token=f21c8d21-ac4e-4f2e-b416-2064d91ffe4f" style="position: absolute;
  width: 80px;
  margin-left: -350px;" alt="OSMS LOGO" />
                </div>
                <div class="heading" style=" margin: auto;
  width: 100%;">
                    <h5 style=" text-align: center; margin-left: -54px;">GOVT. OF WEST BENGAL</h5>
                    <h5 style=" text-align: center; margin-left: -54px;">OFFICE OF THE SUB INSPECTOR OF SCHOOLS</h5>
                    <h6 style=" text-align: center; margin-left: -54px; color: #004080 !important;">AMTA WEST CIRCLE, HAORA</h6>
                    <h5  style=" text-align: center; margin-left: -54px;">PAY SLIP FOR THE MONTH OF ${lastmonth.toUpperCase()},${today.getFullYear()}</h5>
                </div>
            </div>

            <button type="button"
                class="btn  btn-primary text-white P-2 rounded noprint" 
                onclick="window.print();">Print Pay Slip</button>
                
            <div class="details" style="display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.8rem;

  margin-top: 15px;
  margin-bottom: 10px;">
                <div style="display: flex;
    flex-direction: column;
    align-items: flex-start;">
                    <p><b>EMPLOYEE NAME:&nbsp;</b>${tname}</p>
                    <p><b>SCHOOL NAME:&nbsp;</b>${school}(<b>UDISE:&nbsp;</b>${udise})</p>
                    <p><b>LEVEL:&nbsp;</b>${level}&nbsp;<b>CELL:&nbsp;</b>${cell}</p>
                </div>
                <div class="idDiv" style="display: flex;
    flex-direction: column;
    align-items: flex-end;">
                    <p><b>EMPLOYEE ID:&nbsp;</b>${empid}</p>
                    <p><b>DESIGNATION:&nbsp;</b>${desig}</p>
                    <p><b>PAN:&nbsp;</b>${pan}</p>
                </div>
            </div>

            <table class="myTable" style="border: 1px solid; font-size: 0.9rem; border-collapse: collapse;" >
                <tr>
                    <th style="border-right: 1px solid; border-bottom: 1px solid; padding: 2px 0 2px 0; text-align: center" colspan="2">
                        EARNING(Rs)
                    </th>
                    <th style="border-right: 1px solid; border-bottom: 1px solid; padding: 2px 0 2px 0; text-align: center" colspan="2">
                        DEDUCTION(Rs)
                    </th>
                    <th style="border-right: 1px solid; border-bottom: 1px solid; padding: 2px 0 2px 0; text-align: center" colspan="2">
                        RECOVERIES OF LOAN(Rs)
                    </th>
                    <th style="border-bottom: 1px solid; padding: 2px 0 2px 0; text-align: center" colspan="2">
                        OUT/ACCT.DED (Rs)
                    </th>
                </tr>
                <tr>
                    ${
                      desig === "AT"
                        ? `<th style="text-align: left; padding: 6pt;">
                        <table>
                            <tr>
                                <th>BASIC</th>
                            </tr>
                            <tr>
                                <th>DA</th>
                            </tr>
                            <tr>
                                <th>HRA</th>
                            </tr>
                            <tr>
                                <th>MA</th>
                            </tr>
                            <tr>
                                <th>CA</th>
                            </tr>
                            <tr>
                                <th>CPF</th>
                            </tr>
                            <tr>
                                <th>IR</th>
                            </tr>

                        </table>
                    </th>
                    <td style="text-align: right; border-right: 1px solid; padding: 6pt;">
                        <table style="margin-right: -30px;">
                            <tr>
                                <td>${basicpay}</td>
                            </tr>
                            <tr>
                                <td>${da}</td>
                            </tr>
                            <tr>
                                <td>${hra}</td>
                            </tr>
                            <tr>
                                <td>${ma}</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>

                        </table>
                    </td>
                    <th style="text-align: left; padding: 6pt;">
                        <table style="margin-right: 5px;">
                            <tr>
                                <th>GPF</th>
                            </tr>
                            <tr>
                                <th>PF LOAN</th>
                            </tr>
                            <tr>
                                <th>CPF DEDUCT</th>
                            </tr>
                            <tr>
                                <th>PT</th>
                            </tr>
                            <tr>
                                <th>IT</th>
                            </tr>
                            <tr>
                                <th>GSLI</th>
                            </tr>
                            <tr>
                                <th>OVERDRAWN</th>
                            </tr>

                        </table>
                    </th>
                    <td style="text-align: right; border-right: 1px solid; padding: 6pt;">
                        <table style="margin-right: 5px;">
                            <tr>
                                <td>${gpf}</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>${ptax}</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>${gsli}</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>

                        </table>
                    </td>
                    <td style="text-align: right; border-right: 1px solid;">
                        <table style="margin-right: 1px solid;">


                        </table>
                    </td>
                    `
                        : `<th style="text-align: left; padding: 6pt;">
                        <table>
                            <tr>
                                <th>BASIC</th>
                            </tr>
                            <tr>
                                <th>ADDL. REMUN.</th>
                            </tr>
                            <tr>
                                <th>DA</th>
                            </tr>
                            <tr>
                                <th>HRA</th>
                            </tr>
                            <tr>
                                <th>MA</th>
                            </tr>
                            <tr>
                                <th>CA</th>
                            </tr>
                            <tr>
                                <th>CPF</th>
                            </tr>
                            <tr>
                                <th>IR</th>
                            </tr>

                        </table>
                    </th>
                    <td style="text-align: right; border-right: 1px solid; padding: 6pt;padding-right: 33pt;">
                        <table style="margin-right: -30px;">
                            <tr>
                                <td style="text-align: right;">${basicpay}</td>
                            </tr>
                            <tr>
                                <td style="text-align: right;">${addl}</td>
                            </tr>
                            <tr>
                                <td style="text-align: right;">${da}</td>
                            </tr>
                            <tr>
                                <td style="text-align: right;">${hra}</td>
                            </tr>
                            <tr>
                                <td style="text-align: right;">${ma}</td>
                            </tr>
                            <tr>
                                <td style="text-align: right;">0</td>
                            </tr>
                            <tr>
                                <td style="text-align: right;">0</td>
                            </tr>
                            <tr>
                                <td style="text-align: right;">0</td>
                            </tr>

                        </table>
                    </td>
                    <th style="text-align: left; padding: 6pt; padding-top: 30px; ">
                        <table style="margin-right: 5px;">
                            <tr>
                                <th>GPF</th>
                            </tr>
                            <tr>
                                <th>PF LOAN</th>
                            </tr>
                            <tr>
                                <th>CPF DEDUCT</th>
                            </tr>
                            <tr>
                                <th>PT</th>
                            </tr>
                            <tr>
                                <th>IT</th>
                            </tr>
                            <tr>
                                <th>GSLI</th>
                            </tr>
                            <tr>
                                <th>OVERDRAWN</th>
                            </tr>

                        </table>
                    </th>
<td style="text-align: right; border-right: 1px solid; padding: 6pt; padding-top: 30px;">
                        <table style="margin-right: 5px;">
                            <tr>
                                <td>${gpf}</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>${ptax}</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>${gsli}</td>
                            </tr>
                            <tr>
                                <td>0</td>
                            </tr>

                        </table>
                    </td>
                    <td style="text-align: right; border-right: 1px solid;">
                        <table style="margin-right: 1px solid;">


                        </table>
                    </td>

                    `
                    }
                    
                    


                </tr>
                <tr>
                    <th colspan="2" style="border-top: 1px solid; padding-right:15pt">
                        <table>
                            <tr>
                                <th style="text-align: left;">Total:</th>
                                <th style="text-align: right; padding-left: 100pt;">${gross}</th>
                            </tr>
                        </table>
                    </th>

                    <th colspan="2" style="text-align: right; border-top: 1px solid; padding-right: 12pt;">${deduction}</th>


                    <th colspan="2" style="border-top: 1px solid;">

                    </th>
                    <th colspan="2" style="border-top: 1px solid;">

                    </th>
                </tr>
                <tr>
                    <td colspan="8" style="border-top: 1px solid;">
                        <table>
                            <tr>
                                <th style="text-align: left; width: 100px;">GROSS PAY:</th>
                                <th style="text-align: left;">${gross}</th>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="8" style="border-top: 1px solid;">
                        <table>
                            <tr>
                                <th style="text-align: left; width: 100px;">NET PAY:</th>
                                <th style="text-align: left;">${netpay} (${NumInWords(
      netpay
    )})</th>
                            </tr>

                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="8">
                        <table>
                            <tr>
                                <th>
                                    Transferred to ${bank} Account no ${account} &emsp; IFS Code ${ifsc}
                                </th>
                            </tr>

                        </table>
                    </td>
                </tr>

            </table>
        </div>
        <div class="disclaimer" style="margin: 50px auto 500px 2px;

  text-align: left;">
            <p>GP: Grade Pay, DA: Dearness Allowance, HRA: House Rent Allowance, MA: Medical Allowance, CA: Conveyance
                Allowance,</p>
            <p style=" margin: 10px;">CPF: Contributory Provident Fund, GPF: General Provident Fund, PT: Professional Tax, IT: Income Tax,</p>
            <p style=" margin: 10px;">GSLI: Group Savings Linked Insurance, IR: Interim Relief.</p>
        </div>
        <div class="disclaimer2" style="margin: 20px auto 10px 10px;

  text-align: left;">
            <p>Disclaimer: This is a computer generated Pay Slip and hence does not require any signature.</p>
        </div>
        <div class="hr" style=" height: 2px;
  border-top: 0.5px solid;
  width: 100%;
  margin: auto;"></div>
        <div class="footer" style="margin: auto;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;">
            <div>
                <p><b><i>osms.wbsed.gov.in</i></b></p>
            </div>
            <div>
                <p><b><i>Page-1</i></b></p>
            </div>
            <div>
                <p><b><i>Date of Generation: ${printDate()}</i></b></p>
            </div>
        </div>`;
  });
  return (
    <div>
      <div
        className="containermain"
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "Times",
          maxWidth: "960px",
          zoom: 0.9,
          whiteSpace: "nowrap",
          color: "#000",
        }}
      ></div>
      <div className="mx-auto my-3 noprint">
        <button
          type="button"
          className="btn btn-info text-white font-weight-bold p-2 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaySlipOSMS;
