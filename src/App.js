import { useState } from "react";
import axios from "axios";

function App() {
    const [lang, setLang] = useState("js");
    const [code, setCode] = useState(undefined);
    const [result, setResult] = useState(undefined);
    const [err, setErr] = useState(undefined);

    // console.log(lang, code);
    const handleRun = async () => {
        const payload = {
            language: lang,
            code: code
        };
        try {
            let res = await axios.post(
                "http://localhost:5000/code-run",
                payload
            );
            console.log(res);
            setResult(res.data.output);
            setErr(undefined);
        } catch (error) {
            console.log("error--", error.response.data.error.stderr);
            setErr(error.response.data.error.stderr);
            setResult(undefined);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", margin: 50 }}>
            <h2> basic code editor </h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 20
                }}
            >
                <select
                    style={{ width: "130px" }}
                    onChange={(e) => setLang(e.target.value)}
                >
                    <option value='js'>Javascript</option>
                    <option value='ts'>Typescript</option>
                </select>
                <textarea
                    style={{ padding: 20 }}
                    rows={30}
                    cols={10}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button style={{ width: "100px" }} onClick={handleRun}>
                    Run
                </button>
            </div>
            <h4>{result && "result-" + result}</h4>
            <h5>{err && "err-" + err}</h5>
        </div>
    );
}

export default App;
