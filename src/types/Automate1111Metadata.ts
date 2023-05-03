class Automate1111Metadata {

    prompt: string;
    steps: number;
    sampler: string;
    cfgScale: number;
    seed: number;
    size: string;
    modelHash: string;
    model: string;

    constructor(
        prompt: string,
        steps: number,
        sampler: string,
        cfgScale: number,
        seed: number,
        size: string,
        modelHash: string,
        model: string
    ) {
        this.prompt = prompt;
        this.steps = steps;
        this.sampler = sampler;
        this.cfgScale = cfgScale;
        this.seed = seed;
        this.size = size;
        this.modelHash = modelHash;
        this.model = model;
    }

    static fromPngMetadata(data: string): Automate1111Metadata {
        const regex = /^parameters\u0000+(?<prompt>.+)\nSteps:\s+(?<steps>\d+),\s+Sampler:\s+(?<sampler>.+),\s+CFG scale:\s+(?<cfgScale>\d+),\s+Seed:\s+(?<seed>\d+),\s+Size:\s+(?<size>\d+x\d+),\s+Model hash:\s+(?<modelHash>\w+),\s+Model:\s+(?<model>.+)$/gm;

        // console.log(data)
        const matches = regex.exec(data);

        if (!matches || !matches.groups) {
            throw new Error('Invalid metadata format');
        }

        return {
            prompt: matches.groups.prompt,
            steps: Number(matches.groups.steps),
            sampler: matches.groups.sampler,
            cfgScale: Number(matches.groups.cfgScale),
            seed: Number(matches.groups.seed),
            size: matches.groups.size,
            modelHash: matches.groups.modelHash,
            model: matches.groups.model,
        };
    }
}

export { Automate1111Metadata }