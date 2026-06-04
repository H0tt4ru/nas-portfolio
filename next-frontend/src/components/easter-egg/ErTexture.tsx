'use client';

// Elden Ring atmosphere: vignette + golden top bleed (grain is applied per-section via CSS)
export default function ErTexture() {

    return (
        <>
            {/* Vignette — darkens edges like a torch-lit hall */}
            <div
                className="pointer-events-none fixed inset-0 z-[9995]"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)',
                    animation: 'er-fade-in 1s ease forwards',
                }}
            />

            {/* Golden top bleed — like light from the Erdtree */}
            <div
                className="pointer-events-none fixed inset-0 z-[9995]"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(200,164,74,0.12) 0%, transparent 35%)',
                    animation: 'er-fade-in 1.2s ease forwards',
                }}
            />

            {/* Subtle horizontal scanlines for aged-parchment feel */}
            <div
                className="pointer-events-none fixed inset-0 z-[9995]"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
                    animation: 'er-fade-in 1s ease forwards',
                }}
            />
        </>
    );
}
