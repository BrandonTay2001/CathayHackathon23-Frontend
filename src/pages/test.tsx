import {useWhisper} from "@chengsokdara/use-whisper";
import Orb from "../components/effects/Orb";

export default function Test() {
    // return <div className={"w-screen h-screen"}>
    //     <Orb/>
    // </div>;

    const {
        recording,
        speaking,
        transcribing,
        transcript,
        pauseRecording,
        startRecording,
        stopRecording,
    } = useWhisper({
        apiKey: process.env.OPENAI_API_TOKEN, // YOUR_OPEN_AI_TOKEN
    });

    return <div>
        <p>Recording: {recording}</p>
        <p>Speaking: {speaking}</p>
        <p>Transcribing: {transcribing}</p>
        <p>Transcribed Text: {transcript.text}</p>
        <button onClick={() => startRecording()}>Start</button>
        <button onClick={() => pauseRecording()}>Pause</button>
        <button onClick={() => stopRecording()}>Stop</button>
    </div>;
}
