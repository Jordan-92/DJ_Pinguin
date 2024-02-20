import Field from "../components/Field";
import NaviguationBar from "../components/NaviguationBar";

export default function Home() {
    return (
        <div>
            <p>
                <h1>DJ Pinguin</h1>
            </p>
            <p>
                <h1>Music Downloader</h1>
                <p>
                    <Field label="Title" value={""} />
                </p>
                <p>
                    <Field label="Artist" value={""} />
                </p>
                <p>
                    <span style={{ marginLeft: "50px" }}>
                        <button>Stream</button>
                    </span>
                    <span style={{ marginLeft: "50px" }}>
                        <button>Download</button>
                    </span>
                </p>
            </p>
            <NaviguationBar />
        </div>
    );
}
