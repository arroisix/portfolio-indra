import Head from 'next/head';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - Page Not Found | Indra</title>
                <meta name="description" content="Oops! This page doesn't exist." />
                <link
                    href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(-45deg, #F5D547, #FFF6A2, #C3D7FF, #E0EAFF)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 15s ease infinite',
                    padding: '20px',
                }}
            >
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <h1
                        style={{
                            fontFamily: "'Libre Baskerville', Georgia, serif",
                            fontSize: 'clamp(120px, 25vw, 200px)',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            color: '#2D2D2D',
                            lineHeight: 1,
                            margin: 0,
                            letterSpacing: '-0.02em',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <span className="char" style={{ animationDelay: '0s' }}>4</span>
                        <span className="char" style={{ animationDelay: '0.1s' }}>0</span>
                        <span className="char" style={{ animationDelay: '0.2s' }}>4</span>
                    </h1>
                    <p className="subtitle">
                        Whoops! Looks like this page went on vacation without telling anyone.
                    </p>

                    {/* Neumorphic Button */}
                    <a href="/" className="btn-home">
                        <div className="btn-home-content">
                            <div className="btn-home-icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </div>
                            <p className="btn-home-text">Home</p>
                        </div>
                    </a>
                </div>
            </div>

            <style jsx global>{`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .char {
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeSlideIn 0.5s ease forwards;
                }

                .subtitle {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(18px, 4vw, 24px);
                    font-weight: 450;
                    color: #2D2D2D;
                    margin: 24px 0 40px;
                    line-height: 1.5;
                    opacity: 0;
                    animation: fadeSlideIn 0.5s ease forwards;
                    animation-delay: 0.35s;
                }

                .btn-home {
                    position: relative;
                    display: inline-block;
                    padding: 0;
                    width: 100px;
                    height: 100px;
                    border: none;
                    outline: none;
                    background-color: rgba(255, 255, 255, 0.85);
                    border-radius: 24px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                    transition: all 0.3s ease-in-out;
                    cursor: pointer;
                    text-decoration: none;
                    opacity: 0;
                    animation: fadeSlideIn 0.5s ease forwards;
                    animation-delay: 0.5s;
                }

                .btn-home:hover {
                    transform: scale(1.08);
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
                }

                .btn-home:active {
                    transform: scale(0.95);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .btn-home-content {
                    position: relative;
                    display: grid;
                    padding: 14px;
                    width: 100%;
                    height: 100%;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    grid-template-rows: 1fr 1fr;
                    box-shadow: inset 0px -3px 0px rgba(0, 0, 0, 0.05);
                    border-radius: 24px;
                    transition: 0.3s ease-in-out;
                    z-index: 1;
                }

                .btn-home-icon {
                    position: relative;
                    display: flex;
                    transform: translate3d(0px, -2px, 0px);
                    grid-column: 4;
                    align-self: start;
                    justify-self: end;
                    width: 20px;
                    height: 20px;
                    color: #888888;
                    transition: 0.3s ease-in-out;
                }

                .btn-home:hover .btn-home-icon {
                    transform: translateY(-6px);
                    color: #666666;
                }

                .btn-home-text {
                    position: relative;
                    transform: translate3d(0px, -2px, 0px);
                    margin: 0;
                    align-self: end;
                    grid-column: 1 / 5;
                    grid-row: 2;
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    color: #666666;
                    transition: 0.3s ease-in-out;
                }

                .btn-home:hover .btn-home-text {
                    transform: translateY(-4px);
                    color: #444444;
                }
            `}</style>
        </>
    );
}
