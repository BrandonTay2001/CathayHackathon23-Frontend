import * as React from "react";
import {useState} from "react";
import {AppBar, CardActionArea, Toolbar} from "@mui/material";
import Footer from "../components/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CurrencyExchange from "../components/CurrencyExchange";

export default function Toolbox() {

    const [page, setPage] = useState<"Home" | "CurrencyExchange">("Home");

    return <div className={"w-screen h-screen relative flex flex-col bg-neutral-900"}>
        <CurrencyExchange open={page === "CurrencyExchange"}
                          setOpen={(open: boolean) => setPage(open ? "CurrencyExchange" : "Home")}/>
        <AppBar position="static">
            <Toolbar className={"pr-2"}>
                <div className={"text-xl font-bold flex-1"}>
                    Toolbox
                </div>
            </Toolbar>
        </AppBar>
        <div className={"w-full flex-1 flex flex-col p-4 gap-4"}>
            <Card>
                <CardActionArea onClick={() => setPage("CurrencyExchange")}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Currency Exchange Tool
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Instantly converts the foreign currency to your local currency during your travel
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card>
                <CardActionArea onClick={() => setPage("CurrencyExchange")}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Translator
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Instantly translates words, phrases, and web pages between English and over 100 other languages
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
        <Footer/>
    </div>;
}
