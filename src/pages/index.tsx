import * as React from "react";
import {useEffect, useRef, useState} from "react";

export default function Index() {

    const [prompt, setPrompt] = useState<any | null>(null);
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            setPrompt(e);
        });
    }, []);

    return <div className={"w-screen h-screen relative flex flex-col bg-neutral-900 font-mono"}>
        {
            prompt && <div>Click
                <a onClick={async () => {
                    if (prompt !== null) {
                        prompt.prompt();
                        const {outcome} = await prompt.userChoice;
                        if (outcome === "accepted") {
                            setPrompt(null);
                        }
                    }
                }}
                   className={"m-4"}
                >[here]</a>
                to install the PWA.
            </div>
        }
        {
            !prompt && <div>
                Open the browser menu and click "add to home screen". (NOT add to bookmark!)
            </div>
        }
    </div>;
};
