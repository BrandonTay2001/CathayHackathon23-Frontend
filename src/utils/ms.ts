export default async function ms(ms: number) {
    await new Promise<void>(r => setInterval(r, ms));
}
