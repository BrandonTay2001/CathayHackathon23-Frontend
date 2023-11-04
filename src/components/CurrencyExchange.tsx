import Frag from "./generic/Frag";
import * as React from "react";
import {useMemo, useState} from "react";
import TextField from "@mui/material/TextField";
import useFetch from "../utils/useFetch";
import {Alert, Autocomplete} from "@mui/material";
import Button from "@mui/material/Button";
import {SwapVert} from "@mui/icons-material";
import moment from "moment";

export default function CurrencyExchange(props: {
    open: boolean,
    setOpen: (open: boolean) => void
}) {

    const {
        data,
        error
    } = useFetch<{
        date: string,
        usd: { [key: string]: number }
    } | undefined>("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json");

    const currencies = useMemo<string[] | null>(() => {
        if (!data)
            return [];
        const currencies = [
            "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN",
            "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLF",
            "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB",
            "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK",
            "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS",
            "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL",
            "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO",
            "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB",
            "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STN", "SVC", "SYP",
            "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS",
            "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
        ];
        const avail = Object.keys(data.usd);
        return currencies.filter(c => avail.includes(c.toLowerCase()));
    }, [data]);

    const [fromCur, setFromCur] = useState("HKD");
    const [fromAmt, setFromAmt] = useState(0);
    const [toCur, setToCur] = useState("JPY");
    const [toAmt, setToAmt] = useState(0);

    const calc = (fromAmt: number, fromCur: string, toCur: string) => {
        if (!data)
            return null;
        return fromAmt * (1 / data.usd[fromCur.toLowerCase()]) * data.usd[toCur.toLowerCase()];
    };

    return <Frag {...props}
                 title={"Currency Exchange Tool"}>
        <div className={"flex place-items-center gap-2"}>
            {
                data && <>
                    <div className={"w-2 h-2 rounded-full bg-green-500"}></div>
                    Latest Rates Loaded {data && `(${moment(data.date).format("D MMM YYYY")})`}
                    {/*({currencies!.length} currencies)*/}
                </>
            }
            {
                !data && <>
                    <div className={"w-2 h-2 rounded-full bg-red-500"}></div>
                    Loading Latest Rates...
                </>
            }
        </div>
        <div className={"flex gap-2"}>
            <Autocomplete
                value={fromCur}
                onChange={(e, newFromCur) => {
                    if (!newFromCur) return;
                    if (newFromCur === toCur)
                        setToCur(fromCur);
                    setFromCur(newFromCur);
                    setToAmt(calc(fromAmt, newFromCur, toCur)! || 0);
                }}
                options={currencies || []}
                className={"w-32"}
                renderInput={(params) => <TextField {...params} label="From"/>}/>
            <TextField label={"Amount"}
                       className={"flex-1"}
                       type={"number"}
                       value={fromAmt}
                       onChange={e => {
                           const n = parseFloat(e.target.value);
                           setFromAmt(n);
                           setToAmt(calc(n, fromCur, toCur)! || 0);
                       }}
                       inputProps={{inputMode: "decimal"}}/>
        </div>
        <Button variant={"outlined"}
                size={"large"}
                startIcon={<SwapVert/>}
                onClick={() => {
                    setFromCur(toCur);
                    setToCur(fromCur);
                    setToAmt(calc(fromAmt, toCur, fromCur)!);
                }}>
            Swap Currencies
        </Button>
        <div className={"flex gap-2"}>
            <Autocomplete
                value={toCur}
                onChange={(e, newToCur) => {
                    if (!newToCur) return;
                    if (newToCur === fromCur)
                        setFromCur(toCur);
                    setToCur(newToCur);
                    setToAmt(calc(fromAmt, fromCur, newToCur)! || 0);
                }}
                options={currencies || []}
                className={"w-32"}
                renderInput={(params) => <TextField {...params} label="To"/>}/>
            <TextField label={"Amount"}
                       className={"flex-1"}
                       type={"number"}
                       value={toAmt}
                       onChange={e => {
                           const n = parseFloat(e.target.value);
                           setFromAmt(calc(n, toCur, fromCur)! || 0);
                           setToAmt(n);
                       }}
                       inputProps={{inputMode: "decimal"}}/>
        </div>
        <Alert severity={"info"} className={"flex place-items-center gap-1"}>
            <div>1 {fromCur} = {calc(1, fromCur, toCur)?.toPrecision(3)} {toCur}</div>
            <div>1 {toCur} = {calc(1, toCur, fromCur)?.toPrecision(3)} {fromCur}</div>
        </Alert>
    </Frag>;
}
