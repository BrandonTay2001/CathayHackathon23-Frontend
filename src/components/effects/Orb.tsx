export default function Orb() {
    return <div className="wrap">
        {
            [...Array(300)].map((o, i) => <div key={i} className="particle"></div>)
        }
    </div>;
}
