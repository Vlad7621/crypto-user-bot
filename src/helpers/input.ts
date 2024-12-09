import { createInterface } from 'readline';


async function input(text: string): Promise<string> {
    return new Promise(resolve => {
        createInterface(process.stdin, process.stdout)
            .question(text, answer => resolve(answer));
    });
}

export { input }